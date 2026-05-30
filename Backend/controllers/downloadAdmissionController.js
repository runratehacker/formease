import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PDFDocument } from 'pdf-lib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Stores the current directory path

const fillForm = async (req, res) => {
    try {

        const { formFields } = req.body;

        let fields = {};


        formFields && Object.keys(formFields).map((key, index) => {
            const field = formFields[key];
            fields[key] = field.value;
        })





        // 1. Read the PDF from the server's file system (instead of using fetch)
        const templatePath = path.join(__dirname, '../admission-template.pdf');
        // stores the filepath of the template
        const formPdfBytes = fs.readFileSync(templatePath);

        // 2. Load the document
        const pdfDoc = await PDFDocument.load(formPdfBytes);
        const form = pdfDoc.getForm();

        // 3. Fill the fields
        const nameField = form.getTextField('StudentName');
        const fatherNameField = form.getTextField('FatherName');
        const casteField = form.getTextField('Caste');
        const occupationField = form.getTextField('Occupation');
        const qualificationField = form.getTextField('Qualification');
        const incomeField = form.getTextField('Income');
        const dobField = form.getTextField('DOB');
        const classForAdmissionField = form.getTextField('ClassForAdmission');
        const admissionFeeField = form.getTextField('AdmissionFee');
        const tuitionFeeField = form.getTextField('TuitionFee');
        const signatureField = form.getTextField('Signature');
        const tempAddressField = form.getTextField('TempAddress');
        const permAddressField = form.getTextField('PermAddress');

        nameField.setText(fields.Field1);
        fatherNameField.setText(fields.Field2);
        casteField.setText( fields.Field3);
        occupationField.setText(fields.Field4);
        qualificationField.setText(fields.Field5);
        incomeField.setText(fields.Field6);
        dobField.setText(fields.Field7);
        classForAdmissionField.setText(fields.Field8);
        admissionFeeField.setText(fields.Field9);
        tuitionFeeField.setText(fields.Field10);
        signatureField.setText(fields.Field11);
        tempAddressField.setText(fields.Field12);
        permAddressField.setText(fields.Field13);

        // 4. Serialize the PDF to bytes
        const pdfBytes = await pdfDoc.save();

        // 5. Send the PDF directly to the frontend as a downloadable file
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="filled_admission.pdf"');
        res.status(200).send(Buffer.from(pdfBytes));

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to generate PDF" });
    }
}

export { fillForm }