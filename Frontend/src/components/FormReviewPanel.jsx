import React, { useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';
import FormFieldRow from './FormFieldRow';
import CheckboxGroupRow from './CheckboxGroupRow';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const FormReviewPanel = ({ formFields }) => {

  const prevFormFieldsRef = useRef();

  // Helper to get group name
  const getGroupInfo = (label) => {

    const prefixesObj = formFields.CheckBox;
    const prefixes = prefixesObj ? Object.values(prefixesObj) : [];

    for (const prefix of prefixes) {
      if (label.startsWith(prefix)) {
        return {
          groupName: prefix,
          shortLabel: label.slice(prefix.length) || prefix
        };
      }
    }
    return { groupName: 'Other', shortLabel: label };
  };

  useEffect(() => {
    if (formFields && prevFormFieldsRef.current) {
      const prev = prevFormFieldsRef.current;
      let changedKey = null;

      for (const key of Object.keys(formFields)) {
        if (
          !prev[key] ||
          formFields[key].value !== prev[key].value ||
          formFields[key].filled !== prev[key].filled
        ) {
          changedKey = key;
          break;
        }
      }

      if (changedKey) {
        const field = formFields[changedKey];
        let elementId = `field-${changedKey}`;
        if (field.type === 'checkbox') {
          const { groupName } = getGroupInfo(field.label);
          elementId = `group-${groupName}`;
        }

        const element = document.getElementById(elementId);
        if (element) {
          // Scroll the specific element into the center of the panel
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }
    prevFormFieldsRef.current = formFields;
  }, [formFields]);

  const { formid } = useParams();

  const fillForm = async () => {

    try {
      // 1. Send a POST request to the backend

      // Make sure to tell axios we are expecting a binary blob back
      const response = await axios.post(`http://localhost:8044/api/download/${formid}`, { formFields }, {
        responseType: 'blob'
      });

      // 2. With axios, the actual Blob is stored in response.data
      const blob = response.data;

      // 3. Create a temporary URL for the Blob
      const blobUrl = URL.createObjectURL(blob);

      // 4. Create an invisible <a> tag and click it to trigger the download
      const downloadLink = document.createElement('a');
      downloadLink.href = blobUrl;
      downloadLink.download = 'filled_admission.pdf'; // The filename


      document.body.appendChild(downloadLink);
      downloadLink.click();

      // 5. Clean up
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(blobUrl);



    } catch (error) {

      console.error("Error downloading PDF:", error);

    }

  };


  return (
    <div className="bg-[#0a0a0a] border border-zinc-600 rounded-2xl p-8 flex flex-col h-full shadow-[0_0_30px_rgba(255,255,255,0.03)] relative overflow-hidden">

      <div className="mb-8">
        <h1 className="text-xl font-semibold tracking-tight mb-1.5 text-white">REVIEW EXTRACTED DETAILS</h1>
      </div>

      <div className="flex flex-col gap-4 flex-1 overflow-y-auto min-h-0 pr-2 pb-4">
        {(() => {
          if (!formFields) return null;

          const parsedFields = [];
          const checkboxGroups = {};

          Object.keys(formFields).forEach(key => {
            if (key === 'CheckBox') return; // Skip metadata key

            if(key === 'Instruction') return
            
            const field = formFields[key];
            if (field.type === 'checkbox') {
              const { groupName, shortLabel } = getGroupInfo(field.label);
              if (!checkboxGroups[groupName]) {
                checkboxGroups[groupName] = {
                  id: `group-${groupName}`,
                  groupName,
                  fields: []
                };
                parsedFields.push({ type: 'group', data: checkboxGroups[groupName] });
              }
              checkboxGroups[groupName].fields.push({
                originalKey: key,
                ...field,
                shortLabel
              });
            } else {
              parsedFields.push({ type: 'text', key, field });
            }
          });

          return parsedFields.map((item) => {
            if (item.type === 'text') {
              return <FormFieldRow key={item.key} id={`field-${item.key}`} field={item.field} />;
            } else {
              return <CheckboxGroupRow key={item.data.id} id={item.data.id} groupName={item.data.groupName} fields={item.data.fields} />;
            }
          });
        })()}
      </div>

      <div className="mt-8 pt-6 border-t border-zinc-700 flex flex-col gap-5">
        <button onClick={fillForm} className="w-full bg-zinc-900 border border-zinc-500 text-white py-3.5 rounded-md text-[11px] uppercase tracking-wider font-bold hover:bg-white hover:text-black hover:border-white transition-colors duration-300 cursor-pointer">
          Download Filled Form
        </button>
      </div>

      <div className="absolute bottom-5 right-5 text-zinc-500">
        <Sparkles size={22} strokeWidth={1.5} />
      </div>
    </div>
  );
};

export default FormReviewPanel;
