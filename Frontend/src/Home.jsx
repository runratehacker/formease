import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileText, Sparkles, X, Mic, MicOff, ArrowDown } from 'lucide-react'
import Grainient from './components/Gradient'
import { LiveWaveform } from './components/Livewaveform'
import ShinyText from './components/ShinyText'
import { useHomeGeminiLive } from './hooks/useHomeGeminiLive'
import { useAudioRecorder } from './hooks/useAudioRecorder'
import { useAudioPlayback } from './hooks/useAudioPlayback'
import { useForm } from './hooks/useForm';


const Home = () => {

  // used to navigate to a different page // 
  const navigate = useNavigate()

  // For browse forms
  const [drawerOpen, setDrawerOpen] = useState(false)
  const drawerRef = useRef(null)

  // Exporting forms from the backend using useForm custom hook
  const { forms } = useForm();

  const [isExiting, setIsExiting] = useState(false)
  const [isEntering, setIsEntering] = useState(false)

  useEffect(() => {
    // Trigger the entrance animation shortly after mount
    const timer = requestAnimationFrame(() => {
      setIsEntering(true)
    })
    return () => cancelAnimationFrame(timer)
  }, [])

  // RequestAnimationFrame - inbuilt function to request for an animation frame

  //  Audio playback (AI voice responses) 
  const { enqueueAudio, stopPlayback } = useAudioPlayback()

  // Gemini Live-  form selection only 
  const onFormSelected = useCallback((formId) => {
    // Trigger the exit animation
    setIsExiting(true)

    // Wait for the 1200ms fade out animation to finish entirely before navigating
    // Using 1300ms to ensure the browser has fully finished the transition frame
    setTimeout(() => {
      navigate(`/fillform/${formId}`)
    }, 1300)
  }, [navigate])

  const { connect, disconnect, sendAudioChunk, wsState } = useHomeGeminiLive({
    forms,
    onFormSelected,
    onAudioReceived: enqueueAudio,
  })

  // Mic recording — feeds audio chunks to Gemini 
  const { isRecording, startRecording, stopRecording } = useAudioRecorder({
    onAudioData: sendAudioChunk,
  })

  //  Auto-connect + auto-start recording when forms load 
  const hasInitialized = useRef(false)

  useEffect(() => {
    // Wait until forms are fetched from the backend before connecting
    if (forms.length === 0 || hasInitialized.current) return;

    hasInitialized.current = true;
    let cancelled = false;

    const init = async () => {
      try {
        await connect()
        if (!cancelled) await startRecording()
      } catch (e) {
        console.warn('Home Gemini init failed:', e)
      }
    }

    // Small delay so page renders first
    const timer = setTimeout(init, 600)

    return () => {
      cancelled = true
      clearTimeout(timer)
      stopRecording()
      stopPlayback()
      disconnect()
      hasInitialized.current = false
    }
  }, [forms.length, connect, disconnect, startRecording, stopRecording, stopPlayback])

  //  Manual mic toggle 
  const toggleMic = async () => {
    if (isRecording) {
      stopRecording()
      disconnect()
      stopPlayback()
    } else {
      try {
        await connect()
        await startRecording()
      } catch (e) {
        console.error('Failed to start voice interface:', e)
      }
    }
  }

  //  Close drawer on outside click 
  useEffect(() => {
    const handler = (e) => {
      if (drawerOpen && drawerRef.current && !drawerRef.current.contains(e.target)) {
        setDrawerOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [drawerOpen])

  //  Status label 
  const statusLabel = wsState === 'connecting' ? 'Connecting…'
    : wsState === 'connected' ? 'Setting up…'
      : isRecording ? 'Listening…'
        : wsState === 'error' ? 'Error — tap mic to retry'
          : 'Tap mic to start'

  return (
    <div
      className="h-screen overflow-hidden bg-black text-zinc-50 font-sans selection:bg-white selection:text-black"
      style={{ position: 'relative' }}
    >

      {/*  Grainient background */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <Grainient
          color1="#4b464b"
          color2="#000000"
          color3="#877e8f"
          timeSpeed={0.4}
          grainAmount={0.08}
          grainAnimated={true}
          warpStrength={1.2}
          contrast={1.3}
          saturation={1.2}
        />
      </div>

      {/* Page content */}
      <div
        style={{ position: 'relative', zIndex: 1, willChange: 'transform, opacity, filter' }}
        className={`flex flex-col h-full transition-all duration-1200 ease-in-out ${isExiting
          ? 'scale-95 opacity-0 blur-sm'
          : isEntering
            ? 'scale-100 opacity-100 blur-0'
            : 'scale-95 opacity-0 blur-sm'
          }`}
      >
        {/*  Header Logo  */}
        <div className="w-full flex items-center p-8 absolute top-0 left-0">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-white">
              <path d="M4 4h16M4 4v16M4 12h10" />
            </svg>
            <span className="text-lg font-bold tracking-tight uppercase">FormEase</span>
          </div>
        </div>

        {/*  Centre zone */}
        <div className="flex-1 flex flex-col items-center justify-center px-8">

          {/* Question text */}
          {!drawerOpen && (
            <p
              className="text-center font-light text-white/90 leading-relaxed mb-14"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                letterSpacing: '0.01em',
                textShadow: '0 2px 32px rgba(255,255,255,0.08)',
                fontWeight: "550"
              }}
            >
              <ShinyText
                text="WHICH FORM WOULD YOU LIKE TO FILL?"
                speed={2}
                delay={0}
                color="#b5b5b5"
                shineColor="#ffffff"
                spread={100}
                direction="left"
                yoyo
                pauseOnHover={false}
                disabled={false}
              />
            </p>
          )}

          {/* Browse Forms button */}
          <button
            id="open-forms-btn"
            onClick={() => setDrawerOpen(v => !v)}
            className="bg-zinc-900 border border-zinc-500 text-white py-3.5 px-8 rounded-md text-[11px] uppercase tracking-wider font-bold hover:bg-white hover:text-black hover:border-white transition-colors duration-300 cursor-pointer flex items-center gap-2"
          >
            <FileText size={13} strokeWidth={2.5} />
            Browse Forms
            {drawerOpen && <ArrowDown size={13} strokeWidth={2.5} />}
          </button>

          {/* Form panel */}
          {drawerOpen && (
            <div
              ref={drawerRef}
              className="mt-6 w-full max-w-md bg-[#0a0a0a] border border-zinc-600 rounded-2xl p-8 flex flex-col shadow-[0_0_30px_rgba(255,255,255,0.03)] relative overflow-hidden"
            >
              <div className="mb-8 flex items-start justify-between">
                <h1 className="text-xl font-semibold tracking-tight text-white">
                  AVAILABLE FORMS
                </h1>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="text-zinc-500 hover:text-white transition-colors cursor-pointer mt-0.5"
                  aria-label="Close"
                >
                  <X size={16} strokeWidth={2} />
                </button>
              </div>

              <div className="flex flex-col gap-4 overflow-y-auto max-h-56 pr-2 pb-4">
                {forms.map((form) => (
                  <button
                    key={form.id}
                    id={`form-item-${form.id}`}
                    onClick={() => {
                      setDrawerOpen(false)
                      onFormSelected(form.id)
                    }}
                    className="w-full text-left border-2 border-dashed border-zinc-600 bg-zinc-900/50 rounded-lg p-4 flex items-center justify-between hover:bg-zinc-800/60 hover:border-zinc-500 transition-colors duration-200 cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <FileText
                        size={14}
                        strokeWidth={2}
                        className="text-zinc-400 group-hover:text-white transition-colors shrink-0"
                      />
                      <div>
                        <span className="text-zinc-400 text-[11px] uppercase tracking-widest font-bold group-hover:text-white transition-colors block">
                          {form.name}
                        </span>
                        <span className="text-zinc-600 text-[10px] tracking-wide mt-0.5 block group-hover:text-zinc-400 transition-colors">
                          {form.description}
                        </span>
                      </div>
                    </div>
                    <span className="shrink-0 text-[10px] uppercase tracking-wider font-bold text-zinc-500 border border-zinc-700 px-2 py-0.5 rounded-full ml-3">
                      {form.tag}
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-700" />
              <div className="absolute bottom-5 right-5 text-zinc-500">
                <Sparkles size={22} strokeWidth={1.5} />
              </div>
            </div>
          )}
        </div>

        {/*  Bottom: status + mic button + waveform */}
        <div className="flex flex-col items-center pb-14 gap-4">

          {/* Status chip and Mic toggle — hide when drawer is open */}
          {!drawerOpen && (
            <>
              {/* Status chip — VoicePanel style */}
              <div className="flex justify-center items-center gap-2.5 bg-zinc-900 border border-zinc-600 w-fit px-5 py-2 rounded-full shadow-sm">
                <div
                  className={`w-2 h-2 rounded-full ${isRecording
                    ? 'bg-white animate-pulse shadow-[0_0_12px_rgba(255,255,255,1)]'
                    : 'bg-zinc-500'
                    }`}
                />
                <span className={`text-[11px] uppercase tracking-widest font-bold ${isRecording ? 'text-white' : 'text-zinc-400'
                  }`}>
                  {statusLabel}
                </span>
              </div>

              {/* Mic toggle button */}
              <button
                id="home-mic-btn"
                onClick={toggleMic}
                className={`flex items-center justify-center gap-2 py-3.5 px-6 rounded-md text-[11px] uppercase tracking-wider font-bold transition-all duration-300 border cursor-pointer ${isRecording
                  ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.4)]'
                  : 'bg-zinc-900 text-white border-zinc-500 hover:bg-zinc-800'
                  }`}
              >
                {isRecording
                  ? <><Mic size={14} strokeWidth={2.5} /> Disable Mic</>
                  : <><MicOff size={14} strokeWidth={2.5} /> Enable Mic</>
                }
              </button>
            </>
          )}

          {/* Live waveform — driven by actual mic state */}
          <div className="w-full max-w-137.5 mx-auto flex justify-center items-cente mt-3">
            <LiveWaveform
              active={isRecording}
              mode="static"
              height={130}
              barWidth={3}
              barGap={2}
              barRadius={15}
              barColor="rgba(255,255,255,0.85)"
              sensitivity={1.4}
              fadeEdges={true}
              fadeWidth={60}
              smoothingTimeConstant={0.82}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
