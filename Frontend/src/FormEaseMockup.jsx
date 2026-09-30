import React, { useState, useEffect } from 'react';
import VoicePanel from './components/VoicePanel';
import Header from './components/Header';
import FormReviewPanel from './components/FormReviewPanel';
import Grainient from './components/Gradient';
import { useParams } from 'react-router-dom';
import { useFormFields } from './hooks/useFormFields';

const FormEaseMockup = () => {

  const { formid } = useParams();
  const { formFields, onFieldFilled } = useFormFields(formid);
  const [isEntering, setIsEntering] = useState(false);

  useEffect(() => {
    // Trigger the entrance animation shortly after mount to ensure the DOM is ready
    const timer = requestAnimationFrame(() => {
      setIsEntering(true);
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  //  formFields = object containing formFields
  // onFieldFilled = function to update formFields
  // both are obtained from the useFormFields hook

  return (

    <div className="h-screen overflow-hidden bg-black text-zinc-50 font-sans flex flex-col p-6 selection:bg-white selection:text-black" style={{ position: 'relative' }}>

      {/* Grainient background overlay */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        opacity: 1,
        pointerEvents: 'none'
      }}>
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

      {/* Page content sits above the background and fades in cinematically */}
      <div
        style={{ position: 'relative', zIndex: 1, willChange: 'transform, opacity, filter' }}
        className={`flex flex-col flex-1 min-h-0 h-full transition-all duration-1200 ease-in-out ${isEntering ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-95 blur-sm'
          }`}
      >

        <Header formFields={formFields} />

        <main className="flex-1 min-h-0 h-full grid grid-cols-2 gap-6 pt-8 max-w-300 mx-auto w-full">
          {/* LEFT PANEL: Voice Interaction */}
          <VoicePanel onFieldFilled={onFieldFilled} formFields={formFields} />
          {/* onFieldFilled function sent through props to VoicePanel */}

          {/* RIGHT PANEL: Form Interface */}
          <FormReviewPanel formFields={formFields} />

          {/* Form fields sent through props to FormReviewPanel */}

        </main>

      </div>
    </div>
  );
};

export default FormEaseMockup;