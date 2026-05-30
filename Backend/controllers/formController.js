import forms from "../models/generate-admission.js";

const getFormFields = async (req, res) => {
    try {
        const { formid } = req.params;
        
        // Find the form object in the exported array where id matches the requested formid
        const selectedForm = forms.find(form => form.id === formid);
        
        if (!selectedForm) {
            return res.status(404).json({ message: "Form not found" });
        }
        
        // Return only the formFields object inside the matched form
        res.status(200).json(selectedForm.formFields);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Server error" });
    }
}

export default { getFormFields }