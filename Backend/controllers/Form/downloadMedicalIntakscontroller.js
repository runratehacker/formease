import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PDFDocument } from 'pdf-lib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fillForm = async (req, res) => {
    try {
        const { formFields } = req.body;
        let fields = {};

        // Parse incoming fields (handles both text values and boolean checkbox states)
        formFields && Object.keys(formFields).map((key) => {
            const field = formFields[key];
            fields[key] = field.type === 'checkbox' ? field.filled : field.value;
        });

        // 1. Read the template
        const templatePath = path.join(__dirname, '../../template/templatePDFs/medical-intake-template.pdf');
        const formPdfBytes = fs.readFileSync(templatePath);

        // 2. Load the document
        const pdfDoc = await PDFDocument.load(formPdfBytes);
        const form = pdfDoc.getForm();

        // 3. Helper to safely fill text fields (avoids errors if field is missing from request)
        const safelySetText = (fieldName, value) => {
            if (value) form.getTextField(fieldName).setText(value);
        };

        // 4. Fill Page 1: General Information
        safelySetText('TodaysDate', fields.TodaysDate);
        safelySetText('FirstName', fields.FirstName);
        safelySetText('MiddleName', fields.MiddleName);
        safelySetText('LastName', fields.LastName);
        safelySetText('DOB', fields.DOB);
        safelySetText('Age', fields.Age);
        safelySetText('Height', fields.Height);
        safelySetText('Weight', fields.Weight);

        fields.GenderMale && form.getCheckBox('GenderMale').check();
        fields.GenderFemale && form.getCheckBox('GenderFemale').check();

        safelySetText('PrimaryLang', fields.PrimaryLang);
        safelySetText('SecondaryLang', fields.SecondaryLang);
        safelySetText('AddressLine1', fields.AddressLine1);
        safelySetText('AddressLine2', fields.AddressLine2);
        safelySetText('City', fields.City);
        safelySetText('State', fields.State);
        safelySetText('PinCode', fields.PinCode);
        safelySetText('Phone', fields.Phone);
        safelySetText('Email', fields.Email);

        safelySetText('EmergencyName', fields.EmergencyName);
        safelySetText('EmergencyPhone', fields.EmergencyPhone);
        safelySetText('Occupation', fields.Occupation);

        fields.EduHighSchool && form.getCheckBox('EduHighSchool').check();
        fields.EduGraduate && form.getCheckBox('EduGraduate').check();
        fields.EduPostGrad && form.getCheckBox('EduPostGrad').check();

        safelySetText('PhysicianName', fields.PhysicianName);
        safelySetText('PhysicianPhone', fields.PhysicianPhone);
        safelySetText('ReferredBy', fields.ReferredBy);

        // 5. Fill Page 2: Medical Questionnaire
        safelySetText('HealthConcernsQ1', fields.HealthConcernsQ1);
        safelySetText('HealthConcernsQ2', fields.HealthConcernsQ2);
        safelySetText('HealthConcernsQ3', fields.HealthConcernsQ3);
        safelySetText('HealthConcernsQ4', fields.HealthConcernsQ4);

        for (let i = 1; i <= 5; i++) {
            safelySetText(`Problem${i}Desc`, fields[`Problem${i}Desc`]);
            fields[`Prob${i}Mild`] && form.getCheckBox(`Prob${i}Mild`).check();
            fields[`Prob${i}Mod`] && form.getCheckBox(`Prob${i}Mod`).check();
            fields[`Prob${i}Sev`] && form.getCheckBox(`Prob${i}Sev`).check();

            safelySetText(`Treatment${i}Desc`, fields[`Treatment${i}Desc`]);
            fields[`Treat${i}Success`] && form.getCheckBox(`Treat${i}Success`).check();
        }

        // 6. Fill Page 3: Allergies & Injuries
        for (let i = 1; i <= 4; i++) {
            safelySetText(`AllergyItem${i}`, fields[`AllergyItem${i}`]);
            safelySetText(`AllergyReaction${i}`, fields[`AllergyReaction${i}`]);

            safelySetText(`DateHospitalized${i}`, fields[`DateHospitalized${i}`]);
            safelySetText(`ReasonHospitalized${i}`, fields[`ReasonHospitalized${i}`]);
        }

        fields.InjBack && form.getCheckBox('InjBack').check();
        fields.InjHead && form.getCheckBox('InjHead').check();
        fields.InjNeck && form.getCheckBox('InjNeck').check();
        fields.InjBroken && form.getCheckBox('InjBroken').check();
        fields.InjOther && form.getCheckBox('InjOther').check();
        safelySetText('InjOtherDesc', fields.InjOtherDesc);

        fields.ImplantsYes && form.getCheckBox('ImplantsYes').check();
        fields.ImplantsNo && form.getCheckBox('ImplantsNo').check();

        // 7. Serialize and send
        const pdfBytes = await pdfDoc.save();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="filled_medical-intake-form.pdf"');
        res.status(200).send(Buffer.from(pdfBytes));

    } catch (error) {
        console.error("PDF Generation Error:", error);
        res.status(500).json({ error: "Failed to generate PDF" });
    }
}

export default fillForm