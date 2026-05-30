import React from 'react';

const Header = ({ formFields }) => {
  const keys = Object.keys(formFields || {}).filter(key => key !== 'CheckBox');
  
  // 1. Text fields progress
  const textFields = keys.filter(key => formFields[key].type !== 'checkbox');
  const filledTextCount = textFields.filter(key => formFields[key].filled).length;

  // 2. Checkbox groups progress (A group is filled if at least 1 checkbox inside it is checked)
  const checkboxKeys = keys.filter(key => formFields[key].type === 'checkbox');
  const prefixes = formFields.CheckBox ? Object.values(formFields.CheckBox) : [];
  
  const filledGroups = new Set();
  checkboxKeys.forEach(key => {
    if (formFields[key].filled) {
      const label = formFields[key].label;
      const prefix = prefixes.find(p => label.startsWith(p)) || 'Other';
      filledGroups.add(prefix);
    }
  });

  const totalGroupsCount = prefixes.length;
  
  // 3. Final calculations
  const totalItems = textFields.length + totalGroupsCount;
  const filledItems = filledTextCount + filledGroups.size;
  const progressPercent = totalItems > 0 ? (filledItems / totalItems) * 100 : 0;

  return (
    <header className="flex items-center justify-between pb-6 border-b border-zinc-700 max-w-300 mx-auto w-full">
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-white">
            <path d="M4 4h16M4 4v16M4 12h10" />
          </svg>
          <span className="text-lg font-bold tracking-tight uppercase">FormEase</span>
        </div>
        <span className="text-[11px] font-medium uppercase tracking-widest text-zinc-300 border-l border-zinc-600 pl-5 py-1">
          FORM FILLING
        </span>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex flex-col gap-1.5 w-40">
          <div className="flex justify-between items-center">
            <span className="text-[9px] uppercase tracking-widest text-zinc-300 font-bold">Progress</span>
            <span className="text-[9px] uppercase tracking-widest text-white font-bold">{filledItems}/{totalItems || 21}</span>
          </div>
          <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden border border-zinc-600">
            <div 
              className="h-full bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-500 ease-out" 
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-1.5 bg-white text-black text-[11px] uppercase tracking-wider font-bold rounded-sm hover:bg-zinc-200 transition-colors">
            Save
          </button>

          <button className="px-4 py-1.5 bg-zinc-900 border border-zinc-600 text-white text-[11px] uppercase tracking-wider font-bold rounded-sm hover:bg-zinc-800 transition-colors">
            Exit
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
