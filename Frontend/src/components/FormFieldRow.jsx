import React from 'react';
import { Check } from 'lucide-react';

const FormFieldRow = ({ field, id }) => {
  const isFilled = field.filled;
  // field = object containing label, value, filled
  // if filled = true => field is filled // 
  // ex: {label: "Name", value: "Yogesh", filled: true}

  // Two different components
  // 1. Filled
  // 2. Not Filled
  
  if (!isFilled) {
    // Not Filled = use dashed border
    return (
      <div id={id} className="border-2 border-dashed border-zinc-600 bg-zinc-900/50 rounded-lg p-4 flex items-center">
        <span className="text-zinc-400 text-[11px] uppercase tracking-widest font-bold">{field.label}</span>
      </div>
    );
  } else {
    // Filled = use solid border and checkmark // bg-white
    return (
      <div id={id} className="bg-white border-2 border-white rounded-lg p-2.5 flex items-center justify-between shadow-md">
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">{field.label}</span>
          <span className="text-base text-black font-extrabold tracking-tight">{field.value}</span>
        </div>
        <div className="w-7 h-7 rounded-full bg-black flex items-center justify-center">
          <Check className="text-white" size={14} strokeWidth={3.5} />
        </div>
      </div>
    );
  }
};

export default FormFieldRow;
