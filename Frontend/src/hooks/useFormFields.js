import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const useFormFields = (formid) => {
  // intilized formFields as an empty object
  const [formFields, setFormFields] = useState({});
  // Form fields obtained from the backend is stored in this 
  // state variable

  // Getting response from the Backend 

  const getFields = async () => {
    try {      

      // sends a res // res = object containing formFields
      const response = await axios.get(`http://localhost:8044/api/fields/${formid}`);
      console.log(response.data);
      // formFields = res.data
      setFormFields(response.data);

    } catch (error) {
      // if there is an error
      console.log(error.message);
      return [];
    }
  };


  // Function to update formFields

  // label - Student's Name // value - Yogesh
  // filled - true // and sets value to Yogesh
  const onFieldFilled = (label, value) => {
    // take the previous filled details upadted in 
    // formFields (state variable) and pass it on 
    setFormFields((prev) => {
      // make a copy of prev (formFields)
      const next = { ...prev };

      // goes through each key and checks if the label matches
      for (const key of Object.keys(next)) {
        if (next[key]?.label === label) {
          // if the label matches
          // ...next[key] // keep the previous values 

          // Logic for checkbox --- Gemini sends true or false 
          // based on that but a checkmark if filled : true
          if (next[key].type === 'checkbox') {
            if (String(value).toLowerCase() === 'true') {
              next[key] = { ...next[key], filled: true };
            }
            else if (String(value).toLowerCase() === 'false') {
              next[key] = { ...next[key], filled: false };
            }
          }
          else {
            next[key] = { ...next[key], filled: true, value };
          }
          // mark filled true and set value as Yogesh
          break;
        }
      }

      return next;
      // return the updated formFields 
      // setFormFields(next);
    });
  };


  useEffect(() => {
    if (formid) {
      getFields();
    }
  }, [formid]);
  // when the hook is runned for the first time run the getFields function
  // to get the formFields from the backend

  return { formFields, onFieldFilled };
  // return the formFields and onFieldFilled function
  // onFieldFilled function is used to update the formFields
  // this function is used in useGeminiLive.js to update the formFields
};


