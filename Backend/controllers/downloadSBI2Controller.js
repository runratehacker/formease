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

        // 1. Read the updated 2-page template
        const templatePath = path.join(__dirname, '../sbi-template-spacious.pdf');
        const formPdfBytes = fs.readFileSync(templatePath);

        // 2. Load the document
        const pdfDoc = await PDFDocument.load(formPdfBytes);
        const form = pdfDoc.getForm();

        // 3. Helper to safely fill text fields (avoids errors if field is missing from request)
        const safelySetText = (fieldName, value) => {
            if (value) form.getTextField(fieldName).setText(value);
        };

        // 4. Fill Header & Branch Info
        safelySetText('Date', fields.Date);
        safelySetText('BranchName', fields.BranchName);
        safelySetText('BranchCode', fields.BranchCode);
        safelySetText('CustomerID', fields.CustomerID);
        safelySetText('AccountNo', fields.AccountNo);
        safelySetText('CKYCNo', fields.CKYCNo);

        fields.AppTypeNew && form.getCheckBox('AppTypeNew').check();
        fields.AppTypeUpdate && form.getCheckBox('AppTypeUpdate').check();
        
        fields.AccNormal && form.getCheckBox('AccNormal').check();
        fields.AccSmall && form.getCheckBox('AccSmall').check();
        fields.AccMinor && form.getCheckBox('AccMinor').check();
        fields.AccStaff && form.getCheckBox('AccStaff').check();

        // 5. Fill Section A: Personal Details
        safelySetText('NamePrefix', fields.NamePrefix);
        safelySetText('FirstName', fields.FirstName);
        safelySetText('MiddleName', fields.MiddleName);
        safelySetText('LastName', fields.LastName);
        safelySetText('DOB', fields.DOB);
        safelySetText('Dependents', fields.Dependents);

        fields.GenderM && form.getCheckBox('GenderM').check();
        fields.GenderF && form.getCheckBox('GenderF').check();
        fields.GenderT && form.getCheckBox('GenderT').check();

        fields.MaritalMarried && form.getCheckBox('MaritalMarried').check();
        fields.MaritalUnmarried && form.getCheckBox('MaritalUnmarried').check();
        fields.MaritalOther && form.getCheckBox('MaritalOther').check();

        fields.GuardTypeFather && form.getCheckBox('GuardTypeFather').check();
        fields.GuardTypeMother && form.getCheckBox('GuardTypeMother').check();
        fields.GuardTypeSpouse && form.getCheckBox('GuardTypeSpouse').check();

        safelySetText('GuardFirstName', fields.GuardFirstName);
        safelySetText('GuardMiddleName', fields.GuardMiddleName);
        safelySetText('GuardianLastName', fields.GuardLastName);


        fields.NatIndian && form.getCheckBox('NatIndian').check();
        fields.NatOther && form.getCheckBox('NatOther').check();
        
        safelySetText('CountryName', fields.CountryName);
        safelySetText('Citizenship', fields.Citizenship);

        // Occupation
        fields.OccStateGovt && form.getCheckBox('OccStateGovt').check();
        fields.OccCentralGovt && form.getCheckBox('OccCentralGovt').check();
        fields.OccPSU && form.getCheckBox('OccPSU').check();
        fields.OccPvt && form.getCheckBox('OccPvt').check();
        fields.OccIndus && form.getCheckBox('OccIndus').check();
        fields.OccTrade && form.getCheckBox('OccTrade').check();
        fields.OccServ && form.getCheckBox('OccServ').check();
        fields.OccContract && form.getCheckBox('OccContract').check();
        fields.OccMedical && form.getCheckBox('OccMedical').check();
        fields.OccLegal && form.getCheckBox('OccLegal').check();
        fields.OccHousewife && form.getCheckBox('OccHousewife').check();
        fields.OccStudent && form.getCheckBox('OccStudent').check();
        fields.OccRetired && form.getCheckBox('OccRetired').check();
        safelySetText('OccSpecify', fields.OccSpecify);

        // 6. Fill Page 2 Details
        safelySetText('OrgName', fields.OrgName);
        safelySetText('Designation', fields.Designation);
        safelySetText('AnnualIncome', fields.AnnualIncome);
        safelySetText('NetWorth', fields.NetWorth);

        fields.FundSalary && form.getCheckBox('FundSalary').check();
        fields.FundBusiness && form.getCheckBox('FundBusiness').check();
        fields.FundAgri && form.getCheckBox('FundAgri').check();
        fields.FundPension && form.getCheckBox('FundPension').check();

        fields.RelHindu && form.getCheckBox('RelHindu').check();
        fields.RelMuslim && form.getCheckBox('RelMuslim').check();
        fields.RelChristian && form.getCheckBox('RelChristian').check();
        fields.RelSikh && form.getCheckBox('RelSikh').check();
        fields.RelOther && form.getCheckBox('RelOther').check();

        fields.CatGen && form.getCheckBox('CatGen').check();
        fields.CatOBC && form.getCheckBox('CatOBC').check();
        fields.CatSC && form.getCheckBox('CatSC').check();
        fields.CatST && form.getCheckBox('CatST').check();

        fields.PWDYes && form.getCheckBox('PWDYes').check();
        fields.PWDNo && form.getCheckBox('PWDNo').check();
        fields.PWDVisual && form.getCheckBox('PWDVisual').check();
        fields.PWDDiff && form.getCheckBox('PWDDiff').check();

        fields.Edu9th && form.getCheckBox('Edu9th').check();
        fields.Edu10th && form.getCheckBox('Edu10th').check();
        fields.EduGrad && form.getCheckBox('EduGrad').check();
        fields.EduPG && form.getCheckBox('EduPG').check();

        fields.PEPYes && form.getCheckBox('PEPYes').check();
        fields.PEPRelated && form.getCheckBox('PEPRelated').check();
        fields.PEPNone && form.getCheckBox('PEPNone').check();

        fields.TaxResYes && form.getCheckBox('TaxResYes').check();
        fields.TaxResNo && form.getCheckBox('TaxResNo').check();

        safelySetText('PAN', fields.PAN);
        safelySetText('MobileNo', fields.MobileNo);
        safelySetText('EmailID', fields.EmailID);
        safelySetText('TelOff', fields.TelOff);
        safelySetText('TelRes', fields.TelRes);

        // 7. Serialize and send
        const pdfBytes = await pdfDoc.save();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="filled_sbi_form.pdf"');
        res.status(200).send(Buffer.from(pdfBytes));

    } catch (error) {
        console.error("PDF Generation Error:", error);
        res.status(500).json({ error: "Failed to generate PDF" });
    }
}

export { fillForm }