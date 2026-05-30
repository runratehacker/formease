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
            fields[key] = field.type === 'checkbox' ? field.filled : field.value;
        })



        // 1. Read the PDF from the server's file system (instead of using fetch)
        const templatePath = path.join(__dirname, '../sbi-template.pdf');
        // stores the filepath of the template
        const formPdfBytes = fs.readFileSync(templatePath);

        // 2. Load the document
        const pdfDoc = await PDFDocument.load(formPdfBytes);
        const form = pdfDoc.getForm();

        // 3. Fill the fields
        // 4. Fill Checkboxes using .check()
        form.getTextField('Date').setText(fields.Field1);
        form.getTextField('BranchName').setText(fields.Field2);
        form.getTextField('BranchCode').setText(fields.Field3);
        form.getTextField('CustomerID').setText(fields.Field4);

        fields.Field5 && form.getCheckBox('AppTypeNew').check();
        fields.Field6 && form.getCheckBox('AppTypeUpdate').check();

        form.getTextField('AccountNo').setText(fields.Field7);
        form.getTextField('CKYCNo').setText(fields.Field8);

        fields.Field9 && form.getCheckBox('AccNormal').check();
        fields.Field10 && form.getCheckBox('AccSmall').check();
        fields.Field11 && form.getCheckBox('AccMinor').check();

        form.getTextField('Title').setText(fields.Field12);
        form.getTextField('FirstName').setText(fields.Field13);
        form.getTextField('MiddleName').setText(fields.Field14);
        form.getTextField('LastName').setText(fields.Field15);
        form.getTextField('DOB').setText(fields.Field16);

        fields.Field17 && form.getCheckBox('GenderM').check();
        fields.Field18 && form.getCheckBox('GenderF').check();

        fields.Field19 && form.getCheckBox('MaritalMarried').check();
        fields.Field20 && form.getCheckBox('MaritalUnmarried').check();

        fields.Field21 && form.getCheckBox('GuardianFather').check();
        fields.Field22 && form.getCheckBox('GuardianMother').check();
        fields.Field23 && form.getCheckBox('GuardianSpouse').check();


        form.getTextField('GuardianFirstName').setText(fields.Field24);
        form.getTextField('GuardianMiddleName').setText(fields.Field25);
        form.getTextField('GuardianLastName').setText(fields.Field26);

        fields.Field27 && form.getCheckBox('NatIndian').check();
        fields.Field28 && form.getCheckBox('NatOther').check();

        form.getTextField('CountryName').setText(fields.Field29);


        // form.getCheckBox('AppTypeNew').check();       // Application Type: New
        // form.getCheckBox('AccNormal').check();        // Account Type: Normal
        // form.getCheckBox('GenderM').check();          // Gender: Male
        // form.getCheckBox('MaritalUnmarried').check(); // Marital Status: Unmarried
        // form.getCheckBox('GuardianFather').check();   // Guardian: Father
        // form.getCheckBox('NatIndian').check();        // Nationality: Indian

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