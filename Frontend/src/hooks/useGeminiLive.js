// Handles the two-way between the React app and Gemini
// Uses WebSockets for bidirectional communication
// Directs gemini what to do ==

import { useState, useRef, useCallback, useEffect } from 'react';
import axios from 'axios';

export const useGeminiLive = ({ onFieldFilled, onAudioReceived, formFields }) => {
  const [wsState, setWsState] = useState("idle"); // "idle" | "connecting" | "connected" | "ready" | "error"
  const [messages, setMessages] = useState([]);

  const liveWsRef = useRef(null);
  const liveTokenRef = useRef(null);
  const isLiveReadyRef = useRef(false);
  const sessionHandleRef = useRef(null);

  // Function 1 
  // contains 4 functon inside // estabilish a websocket connection
  const connect = useCallback(() => {
    // Return a Promise that resolves only when Gemini says setupComplete
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.get("http://localhost:8044/api/live/token");
        if (!data?.token) throw new Error("Ephemeral token missing from backend response");
        liveTokenRef.current = data.token;
        // before Google lets you talk to Gemini 
        // a token (VIP pass) is generated in the backend and is needed to 
        // to talk to Gemini

        const wsUrl =
          "wss://generativelanguage.googleapis.com/ws/" +
          "google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContentConstrained" +
          `?access_token=${encodeURIComponent(liveTokenRef.current)}`;

        liveWsRef.current = new WebSocket(wsUrl);
        // Boilerplate code to establish WebSocket connection with Gemini
        // Dailing the Phone to Gemini
        setWsState("connecting");

        // Once the WebSocket connection is established
        // i.e Gemini picks up the phone call

        // as soon as Gemini picks up the call a instruction manual is sent
        // on what to do 

        // Custom part that can be done is to send the instruction manual
        // rest everything is a boilerplate code // refer API docs for details
        liveWsRef.current.onopen = () => {
          setWsState("connected");
          console.log("Live WS connected");

          // Setup message // instruction manual
          const setupMessage = {
            setup: {
              // Which model to use
              model: "models/gemini-3.1-flash-live-preview",
              systemInstruction: {
                parts: [
                  {
                    text: `
                  You are a voice assistant for FormEase.
                  Your job: ask the user for missing fields and fill them.

                  CRITICAL RULES FOR INTERACTION:
                  1. You MUST ask the user for ONLY ONE empty field at a time. Do NOT ask for multiple details in a single sentence.
                  2. Wait for the user to provide the answer for the current field.
                  3. Fill the current field using the "fill_form_field" tool.
                  4. ONLY AFTER the user has given the details and the field is filled, move on to asking for the next empty field.
                  5. If USER skips a field then set value for that field as NULL and proceed to next field

                  You MUST fill fields only using the tool "fill_form_field".
                  CHECKBOX INSTRUCTIONS:
                  - The 'CheckBox' key in the form fields object contains metadata for grouping checkboxes (e.g., "Gender", "Marital").
                  - Do NOT attempt to fill the 'CheckBox' metadata key itself. It is not a form field.
                  - Checkboxes that share the same prefix (e.g. "GenderM" and "GenderF") belong to the same group.
                  - For each group, ONLY ONE checkbox should be checked (e.g. if the user says male, set GenderM to "true").

                  FORM SPECIFIC INSTRUCTIONS:
                  ${formFields?.Instruction ? Object.values(formFields.Instruction).map((inst, i) => `${i + 1}. ${inst}`).
                        join('\n                  ') : "None"}

                  FORM FIELDS TO FILL:
                  ${formFields ? Object.keys(formFields).map((key, index) => {
                          if (key === 'CheckBox' || key === 'Instruction') return null; // Skip metadata keys
                          const field = formFields[key];
                          const status = field.filled ? `(Filled: ${field.value})` : "(Empty)";
                          if (field.type === 'checkbox') {
                            return `${index + 1}. ${field.label} ${status} 
                        (Instruction: Return string "true" if user agrees, "false" if not)`;
                          }
                          return `${index + 1}. ${field.label} ${status}`;
                        }).filter(Boolean).join('\n                  ') : ""}

                  
                    `.trim(),
                    // Giving Gemini the context of all the form fields and 
                    // also the status of whether it is filled or not with the value

                    // So when the user asks gemini what value has been filled for 
                    // a particular field name // Gemini has the context to answer the 
                    // question 
                  },
                ],
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
                      name: "fill_form_field",
                      description: "Fill exactly one form field by label.",
                      parameters: {
                        type: "object",
                        properties: {
                          label: { type: "string", description: "Exact field label" },
                          value: { type: "string", description: "User provided value" },
                        },
                        required: ["label", "value"],
                      },
                    },
                  ],
                },
              ],
            },
          };
          liveWsRef.current.send(JSON.stringify(setupMessage));
        };

        // everytime Gemini sends a message what to do
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
            sessionHandleRef.current = msg.sessionResumptionUpdate.newHandle;
            console.log("Saved session handle:", sessionHandleRef.current);
            return;
          }

          // CUSTOM PART

          // 1) Setup complete — NOW it is safe for audio to start
          // (setup - Gemini reading the instruction manual )
          if (msg.setupComplete) {
            isLiveReadyRef.current = true;
            setWsState("ready");
            resolve(); // ← Unblock VoicePanel's await connect()
            // First Gemini should read the intruction maunual 
            // and after that only it can start taking user input            
            return;
          }

          // After the gemini takes the user input it sends the response
          // in the following format
          // 1. Text // 2. Audio 

          // THe text part is filtered out to display on the UI
          // The audio part is played to the user
          // Managed by useAudioPlayback

          // 2) Model text + audio
          const parts = msg?.serverContent?.modelTurn?.parts;
          if (Array.isArray(parts)) {
            const textParts = parts
              .map((p) => p?.text)
              .filter(Boolean)
              .join("");

            if (textParts) {
              setMessages((prev) => [...prev, { role: "AI", text: textParts }]);
            }

            const audioParts = parts.filter((p) => p?.inlineData);
            for (const p of audioParts) {
              const mime = p.inlineData?.mimeType || "";
              const data = p.inlineData?.data;
              if (data && mime.startsWith("audio/pcm")) {
                if (onAudioReceived) {
                  onAudioReceived(data);
                }
              }
            }

            if (textParts || audioParts.length > 0) return;
          }

          // 3) Tool / function call

          // Main part of the code
          // If the user tells a value to fill for a form field
          // detect that and fill the form field by calling a function which 
          // fills the form  - instead of replying back to the user

          // Logic to detect wheather user has given a value to fill a form field


          const functionCalls = msg?.toolCall?.functionCalls;
          if (Array.isArray(functionCalls) && functionCalls.length > 0) {
            const toolResponses = [];

            for (const call of functionCalls) {
              if (call?.name === "fill_form_field") {
                const args = call?.args || {};
                const label = args.label;
                const value = args.value;

                if (typeof onFieldFilled === "function") {
                  onFieldFilled(label, value);
                  // when you find which form field to fill, call the function
                  // onFieldFilled(label, value); 
                  // passing the label and value
                }


                setMessages((prev) => [
                  ...prev,
                  { role: "SYS", text: `Filled: ${label} = ${value}` },
                ]);

                toolResponses.push({
                  id: call.id,
                  name: call.name,
                  response: { output: `Successfully filled "${label}" with "${value}"` },
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

          console.log("Unhandled Live message:", msg);
        };

        // On error what to do 
        liveWsRef.current.onerror = (e) => {
          setWsState("error");
          console.log("Live WS error", e);
          reject(e);
        };

        // On close // if the websocket connection is closed
        liveWsRef.current.onclose = (e) => {
          setWsState("idle");
          console.log("Live WS closed", e.code, e.reason);
        };

      } catch (err) {
        console.error("Gemini connection error:", err);
        setWsState("error");
        reject(err);
      }
    });
  }, [onFieldFilled, onAudioReceived]);

  // Function 2 
  // breaks the websocket connection // stop taking user input
  const disconnect = useCallback(() => {
    if (liveWsRef.current && liveWsRef.current.readyState === WebSocket.OPEN) {
      try {
        liveWsRef.current.send(JSON.stringify({ realtimeInput: { audioStreamEnd: true } }));
      } catch { }
    }

    isLiveReadyRef.current = false;
    // the phone call is disconnected

    if (liveWsRef.current && (liveWsRef.current.readyState === WebSocket.OPEN || liveWsRef.current.readyState === WebSocket.CONNECTING)) {
      liveWsRef.current.close(1000, "User stopped");
    }
    liveWsRef.current = null;
    setWsState("idle");
  }, []);

  // Function 3
  // sends the audio chunk to the gemini
  // Function called every time the user speaks // 

  // Standard format in which gemini expects audio
  // base64PCM16 is the audio chunk passes on to gemini
  const sendAudioChunk = useCallback((base64Pcm16) => {
    if (!isLiveReadyRef.current) return;
    if (!liveWsRef.current || liveWsRef.current.readyState !== WebSocket.OPEN) return;

    const msg = {
      realtimeInput: {
        audio: {
          mimeType: "audio/pcm",
          data: base64Pcm16,
        },
      },
    };

    liveWsRef.current.send(JSON.stringify(msg));
  }, []);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return { connect, disconnect, sendAudioChunk, messages, wsState };
};


//                   1. Student's Name
// 2. Father's Name
// 3. Caste
// 4. Occupation
// 5. Qualification
// 6. Income
// 7. Date of Birth
// 8. Class for admission
// 9. Admission fee
// 10. Tuition fee
// 11. Signature of father or Guardian
// 12. Temporary Address
// 13. Permanent Address