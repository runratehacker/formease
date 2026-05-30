import React, { useEffect, useRef } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { useAudioPlayback } from '../hooks/useAudioPlayback';
import { useGeminiLive } from '../hooks/useGeminiLive';
import { useAudioRecorder } from '../hooks/useAudioRecorder';
import { LiveWaveform } from './LiveWaveform';

const VoicePanel = ({ onFieldFilled, formFields }) => {

  // React component VoicePanel
  const messagesEndRef = useRef(null);

  // Exporting functions from the hooks 

  const { enqueueAudio, stopPlayback } = useAudioPlayback();

  const { messages, wsState, connect, disconnect, sendAudioChunk } = useGeminiLive({
    onFieldFilled,
    onAudioReceived: enqueueAudio, formFields
  });

  const { isRecording, waveHeights, startRecording, stopRecording } = useAudioRecorder({
    onAudioData: sendAudioChunk
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Automatically disable the mic if the WebSocket connection drops or fails
  useEffect(() => {
    if ((wsState === 'idle' || wsState === 'error') && isRecording) {
      stopRecording();
      stopPlayback();
    }
  }, [wsState, isRecording, stopRecording, stopPlayback]);

  // When the user clicks on the Mic button
  const toggleMicrophone = async () => {
    // isRecording = true => stop recording 
    // when you click on the button to disable the microphone

    if (isRecording) {
      stopRecording();
      // stop generating the waveform // stop taking user input
      disconnect();
      // break the websocket connection
      stopPlayback();
      // stop the audio playback (AI response audio)

    } else {
      // isRecording = false => start recording
      // when you click on the button to enable the microphone      

      try {

        await connect();
        // start the websocket connection
        await startRecording();
        // start generating the waveform // start taking user input
      } catch (e) {
        // Any error while starting the voice interface
        console.error("Failed to start voice interface", e);
      }
    }
  };

  // based onReacording state, show Mic or MicOff icon
  // other rendering part using this state
  return (
    <div className="bg-[#0a0a0a] border border-zinc-600 rounded-2xl p-6 flex flex-col gap-6 shadow-[0_0_30px_rgba(255,255,255,0.03)] relative h-full min-h-0 overflow-hidden">
      {/* LEFT PANEL: Voice Interaction */}
      <div className="flex flex-col h-full min-h-0">

        {/* Listening Status */}
        <div className="flex justify-center items-center gap-2.5 bg-zinc-900 border border-zinc-600 w-fit mx-auto px-5 py-2 rounded-full shadow-sm mb-3 shrink-0">
          <div
            className={`w-2 h-2 rounded-full ${isRecording ? 'bg-white animate-pulse shadow-[0_0_12px_rgba(255,255,255,1)]' : 'bg-zinc-500'}`}
          ></div>
          <span className={`text-[11px] uppercase tracking-widest font-bold ${isRecording ? 'text-white' : 'text-zinc-400'}`}>
            {isRecording ? 'Active Interface' : 'Standby Mode'}
          </span>
        </div>

        {/* Real-time Audio Waveform */}
        <div className="bg-zinc-900 border border-zinc-600 rounded-xl h-40 flex items-center justify-center gap-1 overflow-hidden px-6 relative mb-5 shrink-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-size-[24px_24px]"></div>

          {isRecording ? <LiveWaveform active={true} mode="static" height="100%" sensitivity={1.2} /> : <LiveWaveform active={false} mode="dynamic" height="100%" sensitivity={1.2} />}

        </div>




        {/* Messages List */}
        <div className="flex-1 overflow-y-auto min-h-0 flex flex-col gap-3 pr-2 mb-4">
          {messages.length === 0 && (
            <div className="text-xs text-zinc-500 text-center py-6">
              No messages yet.
            </div>
          )}

          {messages.map((m, idx) => {
            const isUser = m.role === "USR";

            return (
              <div
                key={idx}
                className={
                  isUser
                    ? "bg-zinc-800 border border-zinc-500 rounded-xl p-4 flex flex-col gap-1 shadow-md w-fit max-w-[85%] self-end"
                    : "bg-zinc-900 border border-zinc-600 rounded-xl p-4 flex flex-col gap-1 shadow-sm w-fit max-w-[85%] self-start"
                }
              >
                <p className={isUser ? "text-sm text-white leading-relaxed" : "text-sm text-zinc-200 leading-relaxed"}>
                  <span
                    className={
                      isUser
                        ? "text-zinc-300 font-bold mr-2 bg-zinc-950 px-2 py-0.5 rounded text-xs"
                        : "text-white font-bold mr-2 bg-zinc-700 px-2 py-0.5 rounded text-xs"
                    }
                  >
                    {m.role}
                  </span>
                  {m.text}
                </p>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Left Panel Controls */}
        <div className="flex gap-3 mt-auto pt-4 border-t border-zinc-800 shrink-0">
          <button
            onClick={toggleMicrophone}
            className={`flex-1.25 flex items-center justify-center gap-2 py-3.5 rounded-md text-[11px] uppercase tracking-wider font-bold transition-all duration-300 border w-full cursor-pointer ${isRecording
              ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.4)]'
              : 'bg-zinc-900 text-white border-zinc-500 hover:bg-zinc-800'
              }`}
          >
            {isRecording ? <Mic size={16} strokeWidth={2.5} /> : <MicOff size={16} strokeWidth={2.5} />}
            {isRecording ? 'Disable Mic' : 'Enable Mic'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoicePanel;
