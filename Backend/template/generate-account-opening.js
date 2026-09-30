import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';

async function createFinalSBIForm() {
  try {
    const pdfDoc = await PDFDocument.create();
    const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const form = pdfDoc.getForm();

    // ==========================================
    // HELPER FUNCTIONS 
    // ==========================================
    const drawLabel = (page, text, x, y, size = 11, font = helvetica, color = rgb(0, 0, 0)) => {
      page.drawText(text, { x, y, size, font, color });
    };

    const createField = (page, name, x, y, width, height = 20) => {
      const field = form.createTextField(name);
      field.addToPage(page, {
        x, y, width, height,
        borderColor: rgb(0, 0, 0), borderWidth: 0.5,
        backgroundColor: rgb(0.98, 0.98, 0.98)
      });
    };

    const createCheckbox = (page, name, label, x, y) => {
      const cb = form.createCheckBox(name);
      cb.addToPage(page, { x, y, width: 14, height: 14, borderColor: rgb(0, 0, 0), borderWidth: 1 });
      page.drawText(label, { x: x + 18, y: y + 3, size: 10, font: helvetica });
    };

    const drawSectionHeader = (page, text, y) => {
      page.drawRectangle({ x: 30, y: y - 6, width: 535, height: 24, color: rgb(0.4, 0.2, 0.6) });
      page.drawText(text, { x: 40, y: y, size: 12, font: helveticaBold, color: rgb(1, 1, 1) });
    };

    // ==========================================
    // PAGE 1
    // ==========================================
    const page1 = pdfDoc.addPage([595, 842]);
    let y1 = 800;


    // Headers
    drawLabel(page1, 'ACCOUNT OPENING FORM FOR RESIDENT INDIVIDUAL', 160, y1, 11, helveticaBold, rgb(0.2, 0.2, 0.5));
    drawLabel(page1, 'CUSTOMER INFORMATION SHEET', 200, y1 - 15, 11, helveticaBold, rgb(0.2, 0.2, 0.5));

    y1 -= 80;
    drawLabel(page1, 'Date (DD/MM/YYYY):', 330, y1 + 4);
    createField(page1, 'Date', 450, y1, 115);

    y1 -= 35;
    drawLabel(page1, 'Branch Name:', 30, y1 + 4);
    createField(page1, 'BranchName', 120, y1, 150);
    drawLabel(page1, 'Branch Code:', 290, y1 + 4);
    createField(page1, 'BranchCode', 370, y1, 80);

    y1 -= 35;
    drawLabel(page1, 'Customer ID:', 30, y1 + 4);
    createField(page1, 'CustomerID', 120, y1, 150);
    drawLabel(page1, 'Application Type:', 290, y1 + 4);
    createCheckbox(page1, 'AppTypeNew', 'New', 400, y1);
    createCheckbox(page1, 'AppTypeUpdate', 'Update', 460, y1);

    y1 -= 35;
    drawLabel(page1, 'Account No:', 30, y1 + 4);
    createField(page1, 'AccountNo', 120, y1, 150);
    drawLabel(page1, 'CKYC No:', 290, y1 + 4);
    createField(page1, 'CKYCNo', 360, y1, 130);

    y1 -= 35;
    drawLabel(page1, 'Account Type:', 30, y1 + 4);
    createCheckbox(page1, 'AccNormal', 'Normal', 120, y1);
    createCheckbox(page1, 'AccSmall', 'Small', 190, y1);
    createCheckbox(page1, 'AccMinor', 'Minor', 260, y1);
    createCheckbox(page1, 'AccStaff', 'Staff', 330, y1);

    y1 -= 55;
    drawSectionHeader(page1, 'A. Personal Details', y1);

    y1 -= 35;
    drawLabel(page1, '1. Name*:', 30, y1 + 4);
    y1 -= 25;
    createField(page1, 'NamePrefix', 30, y1, 50);
    createField(page1, 'FirstName', 90, y1, 150);
    createField(page1, 'MiddleName', 250, y1, 150);
    createField(page1, 'LastName', 410, y1, 155);

    drawLabel(page1, '(Prefix)', 40, y1 - 12, 9, helvetica, rgb(0.4, 0.4, 0.4));
    drawLabel(page1, '(First Name)', 135, y1 - 12, 9, helvetica, rgb(0.4, 0.4, 0.4));
    drawLabel(page1, '(Middle Name)', 295, y1 - 12, 9, helvetica, rgb(0.4, 0.4, 0.4));
    drawLabel(page1, '(Last Name)', 460, y1 - 12, 9, helvetica, rgb(0.4, 0.4, 0.4));

    // INCREASED VERTICAL GAP for DOB
    y1 -= 55;
    drawLabel(page1, '2. Date of Birth*:', 30, y1 + 4);
    createField(page1, 'DOB', 140, y1, 100);
    drawLabel(page1, '3. Gender*:', 260, y1 + 4);
    createCheckbox(page1, 'GenderM', 'Male', 330, y1);
    createCheckbox(page1, 'GenderF', 'Female', 390, y1);
    createCheckbox(page1, 'GenderT', 'Third Gender', 460, y1);

    y1 -= 40;
    drawLabel(page1, '4. Marital Status:', 30, y1 + 4);
    createCheckbox(page1, 'MaritalMarried', 'Married', 140, y1);
    createCheckbox(page1, 'MaritalUnmarried', 'Unmarried', 220, y1);
    createCheckbox(page1, 'MaritalOther', 'Others', 310, y1);
    drawLabel(page1, '5. Dependents:', 390, y1 + 4);
    createField(page1, 'Dependents', 480, y1, 40);

    y1 -= 40;
    drawLabel(page1, '6. Name of*:', 30, y1 + 4);
    createCheckbox(page1, 'GuardTypeFather', 'Father', 120, y1);
    createCheckbox(page1, 'GuardTypeMother', 'Mother', 190, y1);
    createCheckbox(page1, 'GuardTypeSpouse', 'Spouse', 260, y1);


    y1 -= 40;
    // EXPANDED TO FULL WIDTH: Name of Guardian
    drawLabel(page1, '7. Name of Guardian:', 30, y1 + 4);
    y1 -= 25;
    // 535 total width available / 3 = ~178 per box (leaving slight margins)
    createField(page1, 'GuardFirstName', 30, y1, 170);
    createField(page1, 'GuardMiddleName', 212, y1, 170);
    createField(page1, 'GuardLastName', 395, y1, 170);

    drawLabel(page1, '(First Name)', 85, y1 - 12, 9, helvetica, rgb(0.4, 0.4, 0.4));
    drawLabel(page1, '(Middle Name)', 265, y1 - 12, 9, helvetica, rgb(0.4, 0.4, 0.4));
    drawLabel(page1, '(Last Name)', 450, y1 - 12, 9, helvetica, rgb(0.4, 0.4, 0.4));

    y1 -= 40;
    drawLabel(page1, '8. Nationality:', 30, y1 + 4);
    createCheckbox(page1, 'NatIndian', 'In-Indian', 120, y1);
    createCheckbox(page1, 'NatOther', 'Others', 200, y1);
    createField(page1, 'CountryName', 270, y1, 100);
    drawLabel(page1, '9. Citizenship:', 390, y1 + 4);
    createField(page1, 'Citizenship', 470, y1, 90);

    y1 -= 55;
    page1.drawRectangle({ x: 30, y: y1 - 120, width: 535, height: 145, color: rgb(0.9, 0.85, 0.95), borderColor: rgb(0.4, 0.2, 0.6), borderWidth: 1 });

    drawLabel(page1, '*10. Occupation Type:', 35, y1 + 4, 12, helveticaBold);

    drawLabel(page1, 'Service:', 180, y1 + 4, 11, helveticaBold);
    createCheckbox(page1, 'OccStateGovt', 'State Govt', 240, y1);
    createCheckbox(page1, 'OccCentralGovt', 'Central Govt', 320, y1);
    createCheckbox(page1, 'OccPSU', 'Public Sector', 410, y1);
    createCheckbox(page1, 'OccPvt', 'Pvt Sector', 490, y1);

    y1 -= 35;
    drawLabel(page1, 'Business:', 35, y1 + 4, 11, helveticaBold);
    createCheckbox(page1, 'OccIndus', 'Industrialist', 120, y1);
    createCheckbox(page1, 'OccTrade', 'Trade Sect', 210, y1);
    createCheckbox(page1, 'OccServ', 'Serv Sect', 300, y1);
    createCheckbox(page1, 'OccContract', 'Contractor', 380, y1);

    y1 -= 35;
    drawLabel(page1, 'Others:', 35, y1 + 4, 11, helveticaBold);
    createCheckbox(page1, 'OccMedical', 'Medical Prof.', 120, y1);
    createCheckbox(page1, 'OccLegal', 'Legal Prof.', 210, y1);
    createCheckbox(page1, 'OccHousewife', 'Housewife', 300, y1);
    createCheckbox(page1, 'OccStudent', 'Student', 380, y1);
    createCheckbox(page1, 'OccRetired', 'Retired', 450, y1);

    y1 -= 35;
    drawLabel(page1, 'Not categorised-Please specify:', 35, y1 + 4, 11, helveticaBold);
    createField(page1, 'OccSpecify', 210, y1, 300);


    // ==========================================
    // PAGE 2 (Grid Aligned Checkboxes)
    // ==========================================
    const page2 = pdfDoc.addPage([595, 842]);
    let y2 = 800;

    drawLabel(page2, '11. Organization\'s Name:', 30, y2 + 4);
    createField(page2, 'OrgName', 170, y2, 160);
    drawLabel(page2, 'Designation:', 350, y2 + 4);
    createField(page2, 'Designation', 430, y2, 130);

    y2 -= 40;
    drawLabel(page2, '12. Annual Income (Rs):', 30, y2 + 4);
    createField(page2, 'AnnualIncome', 170, y2, 120);
    drawLabel(page2, '13. Net Worth (Rs):', 310, y2 + 4);
    createField(page2, 'NetWorth', 430, y2, 130);

    // COLUMN X-COORDINATES FOR NEAT ALIGNMENT
    const c1 = 180, c2 = 270, c3 = 360, c4 = 450;

    y2 -= 40;
    drawLabel(page2, '14. Source of Funds:', 30, y2 + 4);
    createCheckbox(page2, 'FundSalary', 'Salary', c1, y2);
    createCheckbox(page2, 'FundBusiness', 'Business Income', c2, y2);
    createCheckbox(page2, 'FundAgri', 'Agriculture', 380, y2); // Slight offset for long text
    createCheckbox(page2, 'FundPension', 'Pension', 470, y2);

    y2 -= 40;
    drawLabel(page2, '15. Religion:', 30, y2 + 4);
    createCheckbox(page2, 'RelHindu', 'Hindu', c1, y2);
    createCheckbox(page2, 'RelMuslim', 'Muslim', c2, y2);
    createCheckbox(page2, 'RelChristian', 'Christian', c3, y2);
    createCheckbox(page2, 'RelSikh', 'Sikh', c4, y2);
    createCheckbox(page2, 'RelOther', 'Others', 510, y2);

    y2 -= 40;
    drawLabel(page2, '16. Category:', 30, y2 + 4);
    createCheckbox(page2, 'CatGen', 'General', c1, y2);
    createCheckbox(page2, 'CatOBC', 'OBC', c2, y2);
    createCheckbox(page2, 'CatSC', 'SC', c3, y2);
    createCheckbox(page2, 'CatST', 'ST', c4, y2);

    y2 -= 40;
    drawLabel(page2, '17. Person with Disability:', 30, y2 + 4);
    createCheckbox(page2, 'PWDYes', 'Yes', 180, y2);
    createCheckbox(page2, 'PWDNo', 'No', 230, y2);
    drawLabel(page2, 'If yes:', 280, y2 + 4);
    createCheckbox(page2, 'PWDVisual', 'I. Visually impaired', 320, y2);
    createCheckbox(page2, 'PWDDiff', 'II. Differently abled', 440, y2);

    y2 -= 40;
    drawLabel(page2, '18. Educational Qual.:', 30, y2 + 4);
    createCheckbox(page2, 'Edu9th', 'Upto 9th', c1, y2);
    createCheckbox(page2, 'Edu10th', '10th Passed', c2, y2);
    createCheckbox(page2, 'EduGrad', 'Graduate', c3, y2);
    createCheckbox(page2, 'EduPG', 'Post Graduate', c4, y2);

    y2 -= 40;
    drawLabel(page2, '19. Politically Exposed:', 30, y2 + 4);
    createCheckbox(page2, 'PEPYes', 'Yes', c1, y2);
    createCheckbox(page2, 'PEPRelated', 'Related to PEP', c2, y2);
    createCheckbox(page2, 'PEPNone', 'None', c3, y2);

    y2 -= 40;
    drawLabel(page2, '20. Country of Tax Residence in India only?', 30, y2 + 4);
    createCheckbox(page2, 'TaxResYes', 'Yes', 300, y2);
    createCheckbox(page2, 'TaxResNo', 'No', 370, y2);

    y2 -= 40;
    drawLabel(page2, '21. PAN:', 30, y2 + 4);
    createField(page2, 'PAN', 100, y2, 200);

    y2 -= 55;
    drawSectionHeader(page2, 'B. Contact Details (All communications will be sent here)', y2);

    y2 -= 45;
    drawLabel(page2, 'Mobile No.:', 30, y2 + 4);
    createField(page2, 'MobileNo', 120, y2, 160);
    drawLabel(page2, 'Email ID:', 300, y2 + 4);
    createField(page2, 'EmailID', 360, y2, 200);

    y2 -= 40;
    drawLabel(page2, 'STD Tel (Off):', 30, y2 + 4);
    createField(page2, 'TelOff', 120, y2, 160);
    drawLabel(page2, 'Tel (Res):', 300, y2 + 4);
    createField(page2, 'TelRes', 360, y2, 200);

    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync('sbi-template-final.pdf', pdfBytes);

    console.log('Success! sbi-template-final.pdf generated.');

  } catch (error) {
    console.error('Error generating form:', error);
  }
}

createFinalSBIForm();