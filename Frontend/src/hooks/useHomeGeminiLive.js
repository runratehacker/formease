import { useState, useRef, useCallback, useEffect } from 'react';
import axios from 'axios';



export const useHomeGeminiLive = ({ forms, onFormSelected, onAudioReceived }) => {
  const [wsState, setWsState] = useState('idle'); // 'idle'|'connecting'|'connected'|'ready'|'error'
  const [messages, setMessages] = useState([]);

 
  const onFormSelectedRef = useRef(onFormSelected);
  const onAudioReceivedRef = useRef(onAudioReceived);
  useEffect(() => { onFormSelectedRef.current = onFormSelected; }, [onFormSelected]);
  useEffect(() => { onAudioReceivedRef.current = onAudioReceived; }, [onAudioReceived]);

  const liveWsRef = useRef(null);
  const liveTokenRef = useRef(null);
  const isLiveReadyRef = useRef(false);



 
  const disconnect = useCallback(() => {
    if (liveWsRef.current?.readyState === WebSocket.OPEN) {
      try {
        liveWsRef.current.send(JSON.stringify({ realtimeInput: { audioStreamEnd: true } }));
      } catch { }
      liveWsRef.current.close(1000, 'User stopped');
    }
    liveWsRef.current = null;
    isLiveReadyRef.current = false;
    setWsState('idle');
  }, []);

  const connect = useCallback(() => {

    if (liveWsRef.current) {
      disconnect();
    }

    return new Promise(async (resolve, reject) => {
      try {
        // Fetch ephemeral token from your existing backend endpoint
        const { data } = await axios.get('http://localhost:8044/api/live/token');
        if (!data?.token) throw new Error('Ephemeral token missing');
        liveTokenRef.current = data.token;

        const wsUrl =
          'wss://generativelanguage.googleapis.com/ws/' +
          'google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContentConstrained' +
          `?access_token=${encodeURIComponent(liveTokenRef.current)}`;

        liveWsRef.current = new WebSocket(wsUrl);
        setWsState('connecting');

        // System Prompt 
        const SYSTEM_PROMPT = `
          You are a friendly voice assistant for FormEase, a smart form-filling application.
          Your ONLY job on this screen is to greet the user and help them choose which form they want to fill.

          AVAILABLE FORMS:
          ${forms.map((f, i) => `ID: "${f.id}" | Name: ${f.name} | Description: ${f.description}`).join('\n')}

          CORE WORKFLOW:
          1. GREETING: As soon as the conversation starts, YOU must speak first. Greet the user warmly and ask: "Which form would you like to fill today? Please go through the available forms on the screen and select one." (Do NOT list the forms yourself).
          2. LISTENING: Wait for the user to answer. 
          3. SELECTION: When the user mentions a form (e.g., "medical form", "SBI", "admission"), acknowledge their choice by saying: "Great, I will load the [Form Name] for you." 
          4. EXECUTE: Immediately after acknowledging, you MUST call the "select_form" tool and pass the exact string ID corresponding to their choice as the "formId" (e.g., "1", "2", "3").

          CRITICAL RULES:
          - Do NOT discuss form fields, and do NOT attempt to fill anything. That happens on the next screen.
          - If the user's choice is unclear, gently ask them to clarify which form they want.
          - Keep all responses concise and conversational.
          `.trim();

        //  WebSocket open 
        liveWsRef.current.onopen = () => {
          setWsState('connected');

          const setupMessage = {
            setup: {
              model: 'models/gemini-3.1-flash-live-preview',
              systemInstruction: {
                parts: [{ text: SYSTEM_PROMPT }],
              },
              generationConfig: {
                responseModalities: ["AUDIO"],
                speechConfig: {
                  voiceConfig: { prebuiltVoiceConfig: { voiceName: "Aoede" } },
                },
                temperature: 0.2,
                maxOutputTokens: 300,
              },
              tools: [
                {
                  functionDeclarations: [
                    {
                      name: 'select_form',
                      description: 'Called when the user has chosen a form to fill.',
                      parameters: {
                        type: 'object',
                        properties: {
                          formId: {
                            type: 'string',
                            description: 'The exact string ID of the selected form (e.g. "1", "2", "3")',
                            enum: forms.map(f => f.id),
                          },
                        },
                        required: ['formId'],
                      },
                    },
                  ],
                },
              ],
            },
          };

          liveWsRef.current.send(JSON.stringify(setupMessage));
        };

        //  WebSocket message 
        liveWsRef.current.onmessage = async (event) => {
          let raw = event.data;
          let msg;

          try {
            if (raw instanceof Blob) {
              raw = await raw.text();
            } else if (raw instanceof ArrayBuffer) {
              raw = new TextDecoder().decode(raw);
            }
            msg = JSON.parse(raw);
          } catch (e) {
            console.log("WS message parse failed:", event.data);
            return;
          }

          if (msg.sessionResumptionUpdate?.newHandle) {
            console.log("Saved session handle:", msg.sessionResumptionUpdate.newHandle);
            return;
          }

          // 1. Setup complete
          if (msg.setupComplete) {
            isLiveReadyRef.current = true;
            setWsState('ready');
            resolve();

            // Force Gemini to speak first by sending an initial prompt
            liveWsRef.current.send(JSON.stringify({
              clientContent: {
                turns: [
                  {
                    role: 'user',
                    parts: [{ text: 'Hello! Please start the conversation by greeting me and asking which form I want to fill.' }]
                  }
                ],
                turnComplete: true
              }
            }));

            return;
          }

          // 2. Model text + audio
          const parts = msg?.serverContent?.modelTurn?.parts;
          if (Array.isArray(parts)) {
            const textParts = parts
              .map((p) => p?.text)
              .filter(Boolean)
              .join("");

            if (textParts) {
              setMessages(prev => [...prev, { role: 'AI', text: textParts }]);
            }

            const audioParts = parts.filter((p) => p?.inlineData);
            for (const p of audioParts) {
              const mime = p.inlineData?.mimeType || "";
              const data = p.inlineData?.data;
              if (data && mime.startsWith("audio/pcm")) {
                onAudioReceivedRef.current?.(data);
              }
            }

            if (textParts || audioParts.length > 0) return;
          }

          // 3. Tool call — select_form
          const functionCalls = msg?.toolCall?.functionCalls;
          if (Array.isArray(functionCalls) && functionCalls.length > 0) {
            const toolResponses = [];

            for (const call of functionCalls) {
              if (call?.name === 'select_form') {
                const formId = call?.args?.formId;

                if (formId) {
                  // Wait so Gemini's acknowledgement audio can finish playing
                  // before we navigate away (which unmounts and kills the audio context)
                  setTimeout(() => {
                    onFormSelectedRef.current?.(formId);
                  }, 4000);
                }

                setMessages(prev => [
                  ...prev,
                  { role: 'SYS', text: `Selected form: ${formId}` },
                ]);

                toolResponses.push({
                  id: call.id,
                  name: call.name,
                  response: { output: `Navigating to ${formId} form.` },
                });
              }
            }

            if (toolResponses.length > 0 && liveWsRef.current?.readyState === WebSocket.OPEN) {
              liveWsRef.current.send(JSON.stringify({
                toolResponse: { functionResponses: toolResponses },
              }));
            }
            return;
          }
        };

        //  WebSocket error / close 
        liveWsRef.current.onerror = (e) => {
          setWsState('error');
          reject(e);
        };

        liveWsRef.current.onclose = () => {
          setWsState('idle');
          isLiveReadyRef.current = false;
        };

      } catch (err) {
        setWsState('error');
        reject(err);
      }
    });
  }, [forms, disconnect]);

  // Send audio chunk 
  const sendAudioChunk = useCallback((base64Pcm16) => {
    if (!isLiveReadyRef.current) return;
    if (liveWsRef.current?.readyState !== WebSocket.OPEN) return;

    liveWsRef.current.send(JSON.stringify({
      realtimeInput: {
        audio: { mimeType: 'audio/pcm', data: base64Pcm16 },
      },
    }));
  }, []);

 
  useEffect(() => () => disconnect(), [disconnect]);

  return { connect, disconnect, sendAudioChunk, messages, wsState };
};
