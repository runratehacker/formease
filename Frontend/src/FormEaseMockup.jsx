import React from 'react';
import VoicePanel from './components/VoicePanel';
import Header from './components/Header';
import FormReviewPanel from './components/FormReviewPanel';
import { useFormFields } from './hooks/useFormFields';
import Grainient from './components/Gradient';
import { useParams } from 'react-router-dom';

const FormEaseMockup = () => {

  const {formid} = useParams();
  const { formFields, onFieldFilled } = useFormFields(formid);
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
          // timeSpeed={0.15}
          warpStrength={1.2}
          contrast={1.3}
          saturation={1.2}
        />
      </div>

      {/* Page content sits above the background */}
      <div style={{ position: 'relative', zIndex: 1 }} className="flex flex-col flex-1 min-h-0 h-full">
      
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