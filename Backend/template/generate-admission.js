import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';

async function createAdmissionForm() {
  try {
    // 1. Create a new document and an A4 sized page
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]); // Standard A4 points
    const form = pdfDoc.getForm();

    // Load a bold font for the title
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // 2. Draw the Header
    page.drawText('ADMISSION FORM', {
      x: 180, y: 780, size: 24, font: helveticaBold
    });

    page.drawText('Sr. No:', { x: 50, y: 785, size: 12, font: helveticaBold });

    // To create text field 
    const srNoField = form.createTextField('SrNo');
    srNoField.addToPage(page, {
      x: 100, y: 780, width: 60, height: 20,
      borderColor: rgb(0, 0, 0), borderWidth: 1
    });

    // 3. Helper function to keep our code clean when drawing rows
    // It draws the label, and creates a text box next to it.
    // const drawRow = (label, fieldName, labelX, fieldX, yPos, width) => {
    //   page.drawText(label, { x: labelX, y: yPos + 5, size: 12, font: helveticaBold });
    //   const field = form.createTextField(fieldName);
    //   field.addToPage(page, {
    //     x: fieldX, y: yPos, width: width, height: 20,
    //     borderColor: rgb(0, 0, 0), borderWidth: 0.5,
    //     backgroundColor: rgb(0.95, 0.95, 0.95) // Slight gray background to show it's fillable
    //   });
    // };
    const drawRow = (label, fieldName, labelX, fieldX, yPos, width) => {
      // Draw the text label
      page.drawText(label, { x: labelX, y: yPos + 5, size: 12, font: helveticaBold });

      // Create the fillable field
      const field = form.createTextField(fieldName);
      field.addToPage(page, {
        x: fieldX, y: yPos, width: width, height: 20,
        // Make the field completely invisible!
        borderWidth: 0
        // (Notice I removed the backgroundColor property entirely)
      });
    };

    // 4. Map out the rows (Moving down the Y axis)
    let y = 720; // Starting Y coordinate
    const lineSpacing = 35;

    // Row 1
    drawRow("Student's Name", "StudentName", 50, 160, y, 385);
    y -= lineSpacing;

    // Row 2
    drawRow("Father's Name", "FatherName", 50, 150, y, 395);
    y -= lineSpacing;

    // Row 3 (Split Row)
    drawRow("Caste", "Caste", 50, 100, y, 150);
    drawRow("Occupation", "Occupation", 270, 350, y, 195);
    y -= lineSpacing;

    // Row 4 (Split Row)
    drawRow("Qualification", "Qualification", 50, 135, y, 115);
    drawRow("Income", "Income", 270, 330, y, 215);
    y -= lineSpacing;

    // Row 5
    drawRow("Date of Birth", "DOB", 50, 140, y, 405);
    y -= lineSpacing;

    // Row 6
    drawRow("Class for admission", "ClassForAdmission", 50, 180, y, 365);
    y -= lineSpacing;

    // Row 7 (Split Row)
    drawRow("Admission fee", "AdmissionFee", 50, 150, y, 100);
    drawRow("Tuition fee", "TuitionFee", 270, 350, y, 195);
    y -= lineSpacing;

    // Row 8
    drawRow("Signature of father or Guardian", "Signature", 50, 250, y, 295);
    y -= lineSpacing;

    // Row 9
    drawRow("Temporary Address", "TempAddress", 50, 180, y, 365);
    y -= lineSpacing;

    // Row 10
    drawRow("Permanent Address", "PermAddress", 50, 180, y, 365);

    // 5. Save the document
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync('admission-template.pdf', pdfBytes);

    console.log('Success! admission-template.pdf generated.');

  } catch (error) {
    console.error('Error generating form:', error);
  }
}

createAdmissionForm();


const formFields2 ={
  Field1: { type: "text", label: "Student's Name" , filled : false , value: "" },
  Field2 : { type: "text", label: "Father's Name" , filled : true , value: "Suresh Kumar" },
  Field3 : { type: "text", label: "Caste" , filled : false ,  value: "" },
  Field4 : { type: "text", label: "Occupation" , filled : false ,   value: "" },
  Field5 : { type: "text", label: "Qualification" , filled : false ,  value: "" },
  Field6 : { type: "text", label: "Income" , filled : false ,  value: "" },
  Field7 : { type: "date", label: "Date of Birth" , filled : false , value: "" },
  Field8 : { type: "text", label: "Class for admission" , filled : false , value: "" },
  Field9 : { type: "text", label: "Admission fee" , filled : false , value: "" },
  Field10 : { type: "text", label: "Tuition fee" , filled : false , value: "" },
  Field11 : { type: "text", label: "Signature of father or Guardian" , filled : false , value: "" },
  Field12 : { type: "text", label: "Temporary Address" , filled : false , value: "" },
  Field13 : { type: "text", label: "Permanent Address" , filled : false , value: "" },
}

// const formFields = {
//   Field1: { type: "text", label: "Date", filled: false, value: "" },
//   Field2: { type: "text", label: "BranchName", filled: false, value: "" },
//   Field3: { type: "text", label: "BranchCode", filled: false, value: "" },
//   Field4: { type: "text", label: "CustomerID", filled: false, value: "" },
//   Field5: { type: "checkbox", label: "ApplicationTypeNew", filled: false, value: "" },
//   Field6: { type: "checkbox", label: "ApplicationTypeUpdate", filled: false, value: "" },
//   Field7: { type: "text", label: "AccountNo", filled: false, value: "" },
//   Field8: { type: "text", label: "CKYCNo", filled: false, value: "" },
//   Field9: { type: "checkbox", label: "AccountTypeNormal", filled: false, value: "" },
//   Field10: { type: "checkbox", label: "AccountTypeSmall", filled: false, value: "" },
//   Field11: { type: "checkbox", label: "AccountTypeMinor", filled: false, value: "" },
//   Field12: { type: "date", label: "Title", filled: false, value: "" },
//   Field13: { type: "text", label: "FirstName", filled: false, value: "" },
//   Field14: { type: "text", label: "MiddleName", filled: false, value: "" },
//   Field15: { type: "text", label: "LastName", filled: false, value: "" },
//   Field16: { type: "text", label: "DOB", filled: false, value: "" },
//   Field17: { type: "checkbox", label: "GenderM", filled: false, value: "" },
//   Field18: { type: "checkbox", label: "GenderF", filled: false, value: "" },
//   Field19: { type: "checkbox", label: "MaritalMarried", filled: false, value: "" },
//   Field20: { type: "checkbox", label: "MaritalUnmarried", filled: false, value: "" },
//   Field21: { type: "checkbox", label: "GuardianFather", filled: false, value: "" },
//   Field22: { type: "checkbox", label: "GuardianMother", filled: false, value: "" },
//   Field23: { type: "checkbox", label: "GuardianSpouse", filled: false, value: "" },
//   Field24: { type: "text", label: "GuardianFirstName", filled: false, value: "" },
//   Field25: { type: "text", label: "GuardianMiddleName", filled: false, value: "" },
//   Field26: { type: "text", label: "GuardianLastName", filled: false, value: "" },
//   Field27: { type: "checkbox", label: "NationalityIndian", filled: false, value: "" },
//   Field28: { type: "checkbox", label: "NationalityOther", filled: false, value: "" },
//   Field29: { type: "text", label: "CountryName", filled: false, value: "" },
//   CheckBox: { 1: "AccountType", 2: "ApplicationType" ,3: "Gender", 4: "Marital", 5: "Guardian", 6: "Nationality" },



// }

const formFields = {

  
  // 1. Header & Branch Info
  Date: { type: "text", label: "Date", filled: false, value: "" },
  BranchName: { type: "text", label: "Branch Name", filled: false, value: "" },
  BranchCode: { type: "text", label: "Branch Code", filled: false, value: "" },
  CustomerID: { type: "text", label: "Customer ID", filled: false, value: "" },
  AccountNo: { type: "text", label: "Account No", filled: false, value: "" },
  CKYCNo: { type: "text", label: "CKYC No", filled: false, value: "" },

  AppTypeNew: { type: "checkbox", label: "ApplicationTypeNew", filled: false, value: "" },
  AppTypeUpdate: { type: "checkbox", label: "ApplicationTypeUpdate", filled: false, value: "" },

  AccNormal: { type: "checkbox", label: "AccountTypeNormal", filled: false, value: "" },
  AccSmall: { type: "checkbox", label: "AccountTypeSmall", filled: false, value: "" },
  AccMinor: { type: "checkbox", label: "AccountTypeMinor", filled: false, value: "" },
  AccStaff: { type: "checkbox", label: "AccountTypeStaff", filled: false, value: "" },

  // 2. Personal Details
  NamePrefix: { type: "text", label: "Name Prefix", filled: false, value: "" },
  FirstName: { type: "text", label: "First Name", filled: false, value: "" },
  MiddleName: { type: "text", label: "Middle Name", filled: false, value: "" },
  LastName: { type: "text", label: "Last Name", filled: false, value: "" },
  DOB: { type: "text", label: "Date of Birth", filled: false, value: "" },
  Dependents: { type: "text", label: "No of Dependents", filled: false, value: "" },

  GenderM: { type: "checkbox", label: "GenderM", filled: false, value: "" },
  GenderF: { type: "checkbox", label: "GenderF", filled: false, value: "" },
  GenderT: { type: "checkbox", label: "GenderT", filled: false, value: "" },

  MaritalMarried: { type: "checkbox", label: "MaritalMarried", filled: false, value: "" },
  MaritalUnmarried: { type: "checkbox", label: "MaritalUnmarried", filled: false, value: "" },
  MaritalOther: { type: "checkbox", label: "MaritalOther", filled: false, value: "" },

  GuardTypeFather: { type: "checkbox", label: "GuardianTypeFather", filled: false, value: "" },
  GuardTypeMother: { type: "checkbox", label: "GuardianTypeMother", filled: false, value: "" },
  GuardTypeSpouse: { type: "checkbox", label: "GuardianTypeSpouse", filled: false, value: "" },

  GuardFirstName: { type: "text", label: "Guardian First Name", filled: false, value: "" },
  GuardMiddleName: { type: "text", label: "Guardian Middle Name", filled: false, value: "" },
  GuardLastName: { type: "text", label: "Guardian Last Name", filled: false, value: "" },


  NatIndian: { type: "checkbox", label: "NationalityIndian", filled: false, value: "" },
  NatOther: { type: "checkbox", label: "NationalityOther", filled: false, value: "" },

  CountryName: { type: "text", label: "Country Name", filled: false, value: "" },
  Citizenship: { type: "text", label: "Citizenship", filled: false, value: "" },

  // Occupation
  OccStateGovt: { type: "checkbox", label: "OccupationState Govt", filled: false, value: "" },
  OccCentralGovt: { type: "checkbox", label: "OccupationCentral Govt", filled: false, value: "" },
  OccPSU: { type: "checkbox", label: "OccupationPSU", filled: false, value: "" },
  OccPvt: { type: "checkbox", label: "OccupationPrivate Sector", filled: false, value: "" },
  OccIndus: { type: "checkbox", label: "OccupationIndustry", filled: false, value: "" },
  OccTrade: { type: "checkbox", label: "OccupationTrade", filled: false, value: "" },
  OccServ: { type: "checkbox", label: "OccupationService", filled: false, value: "" },
  OccContract: { type: "checkbox", label: "OccupationContractor", filled: false, value: "" },
  OccMedical: { type: "checkbox", label: "OccupationMedical", filled: false, value: "" },
  OccLegal: { type: "checkbox", label: "OccupationLegal", filled: false, value: "" },
  OccHousewife: { type: "checkbox", label: "OccupationHousewife", filled: false, value: "" },
  OccStudent: { type: "checkbox", label: "OccupationStudent", filled: false, value: "" },
  OccRetired: { type: "checkbox", label: "OccupationRetired", filled: false, value: "" },
  OccSpecify: { type: "text", label: "Specify Occupation", filled: false, value: "" },

  // Page 2 Details
  OrgName: { type: "text", label: "Organization Name", filled: false, value: "" },
  Designation: { type: "text", label: "Designation", filled: false, value: "" },
  AnnualIncome: { type: "text", label: "Annual Income", filled: false, value: "" },
  NetWorth: { type: "text", label: "Net Worth", filled: false, value: "" },

  FundSalary: { type: "checkbox", label: "FundSalary", filled: false, value: "" },
  FundBusiness: { type: "checkbox", label: "FundBusiness", filled: false, value: "" },
  FundAgri: { type: "checkbox", label: "FundAgriculture", filled: false, value: "" },
  FundPension: { type: "checkbox", label: "FundPension", filled: false, value: "" },

  RelHindu: { type: "checkbox", label: "ReligionHindu", filled: false, value: "" },
  RelMuslim: { type: "checkbox", label: "ReligionMuslim", filled: false, value: "" },
  RelChristian: { type: "checkbox", label: "ReligionChristian", filled: false, value: "" },
  RelSikh: { type: "checkbox", label: "ReligionSikh", filled: false, value: "" },
  RelOther: { type: "checkbox", label: "ReligionOther", filled: false, value: "" },

  CatGen: { type: "checkbox", label: "CategoryGeneral", filled: false, value: "" },
  CatOBC: { type: "checkbox", label: "CategoryOBC", filled: false, value: "" },
  CatSC: { type: "checkbox", label: "CategorySC", filled: false, value: "" },
  CatST: { type: "checkbox", label: "CategoryST", filled: false, value: "" },

  PWDYes: { type: "checkbox", label: "PWDYes", filled: false, value: "" },
  PWDNo: { type: "checkbox", label: "PWDNo", filled: false, value: "" },
  PWDVisual: { type: "checkbox", label: "PWDVisually Impaired", filled: false, value: "" },
  PWDDiff: { type: "checkbox", label: "PWDDifferently Abled", filled: false, value: "" },

  Edu9th: { type: "checkbox", label: "EducationBelow 10th", filled: false, value: "" },
  Edu10th: { type: "checkbox", label: "Education10th", filled: false, value: "" },
  EduGrad: { type: "checkbox", label: "EducationGraduate", filled: false, value: "" },
  EduPG: { type: "checkbox", label: "EducationPost Graduate", filled: false, value: "" },

  PEPYes: { type: "checkbox", label: "PEPYes", filled: false, value: "" },
  PEPRelated: { type: "checkbox", label: "PEPRelated to PEP", filled: false, value: "" },
  PEPNone: { type: "checkbox", label: "PEPNone", filled: false, value: "" },

  TaxResYes: { type: "checkbox", label: "TaxResYes", filled: false, value: "" },
  TaxResNo: { type: "checkbox", label: "TaxResNo", filled: false, value: "" },

  PAN: { type: "text", label: "PAN", filled: false, value: "" },
  MobileNo: { type: "text", label: "Mobile No", filled: false, value: "" },
  EmailID: { type: "text", label: "Email ID", filled: false, value: "" },
  TelOff: { type: "text", label: "Telephone (Office)", filled: false, value: "" },
  TelRes: { type: "text", label: "Telephone (Residence)", filled: false, value: "" },

  CheckBox: {
    1: "ApplicationType",
    2: "AccountType",
    3: "Gender",
    4: "Marital",
    5: "GuardianType",
    6: "Nationality",
    7: "Occupation",
    8: "Fund",
    9: "Religion",
    10: "Category",
    11: "PWD",
    12: "Education",
    13: "PEP",
    14: "TaxRes"
  },

  Instruction : {
    1:"For Name fields only ask FirstName MiddleName and LastName together and understanding the context of it fill those three fields ",
    2: "If Nationality is indian as stated by user then automaticall set value for fields CountryName and Citezenship as India and Indian respectively",
    3: "For occuption field ask user to go through the given options and select one you do not tell him the options ask him to read them and choose one from it . If he selects one of the given options then set the value of Specific Occupation as Null . If the user says no such option listed then ask him to specify the Occupation and fill it respectively",
    4: "If user says to skip a field then fill Null as the value of that field",  
  
  }
}

const forms = [{

  id:'1',
  name: "Admission Form",
  formFields: formFields2

},{
  id:'2',
  name: "SBI form",
  formFields: formFields

}]


// export default formFields
export default forms
// Refer ChatGPT chat - Syntax explanation PDF-lib