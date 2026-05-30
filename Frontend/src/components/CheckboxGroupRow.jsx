import React from 'react';
import { Check } from 'lucide-react';

const CheckboxGroupRow = ({ groupName, fields, id }) => {
  // fields is an array of { originalKey, label, value, filled, shortLabel }
  // A group is considered filled if at least one of its checkboxes is filled
  const isAnyFilled = fields.some(f => f.filled);

  if (!isAnyFilled) {
    return (
      <div id={id} className="border-2 border-dashed border-zinc-600 bg-zinc-900/50 rounded-lg p-4 flex flex-col gap-3 transition-all duration-500">
        <span className="text-zinc-400 text-[11px] uppercase tracking-widest font-bold">{groupName}</span>
        <div className="flex gap-2 flex-wrap">
          {fields.map(f => (
            <div key={f.originalKey} className="px-3 py-1.5 rounded border border-zinc-700 bg-zinc-800/50 text-zinc-500 text-[10px] uppercase font-bold tracking-wider">
              {f.shortLabel}
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div id={id} className="bg-white border-2 border-white rounded-lg p-2.5 flex items-center justify-between shadow-md transition-all duration-500">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">{groupName}</span>
          <div className="flex gap-2 flex-wrap">
            {fields.map(f => {
              const isChecked = f.filled;
              return (
                <div 
                  key={f.originalKey} 
                  className={`px-3 py-1.5 rounded flex items-center gap-2 border text-[10px] uppercase font-bold tracking-wider transition-all duration-300 ${
                    isChecked 
                      ? 'bg-black text-white border-black shadow-sm' 
                      : 'bg-zinc-100 text-zinc-400 border-zinc-200'
                  }`}
                >
                  {f.shortLabel}
                </div>
              )
            })}
          </div>
        </div>
        <div className="w-7 h-7 rounded-full bg-black flex items-center justify-center">
          <Check className="text-white" size={14} strokeWidth={3.5} />
        </div>
      </div>
    );
  }
};

export default CheckboxGroupRow;
