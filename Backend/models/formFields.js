
// FormFields for SBI account opening form. Each field has a type, label, 
// filled status, and value. The CheckBox object maps checkbox groups to
// their respective field names.
// specific fields based on user input and context.

// type 1. text - for text input fields 
// type 2. checkbox - for checkbox input fields

// filled - indicates whether the field has been filled or not, 
// initially set to false


// Account Opening Form 
const formFieldsAccountOpening = {

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

  // Guardian Details
  GuardTypeFather: { type: "checkbox", label: "GuardianTypeFather", filled: false, value: "" },
  GuardTypeMother: { type: "checkbox", label: "GuardianTypeMother", filled: false, value: "" },
  GuardTypeSpouse: { type: "checkbox", label: "GuardianTypeSpouse", filled: false, value: "" },

  GuardFirstName: { type: "text", label: "Guardian First Name", filled: false, value: "" },
  GuardMiddleName: { type: "text", label: "Guardian Middle Name", filled: false, value: "" },
  GuardLastName: { type: "text", label: "Guardian Last Name", filled: false, value: "" },

  // Nationality
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

  // Organization and Income Details
  OrgName: { type: "text", label: "Organization Name", filled: false, value: "" },
  Designation: { type: "text", label: "Designation", filled: false, value: "" },
  AnnualIncome: { type: "text", label: "Annual Income", filled: false, value: "" },
  NetWorth: { type: "text", label: "Net Worth", filled: false, value: "" },

  FundSalary: { type: "checkbox", label: "FundSalary", filled: false, value: "" },
  FundBusiness: { type: "checkbox", label: "FundBusiness", filled: false, value: "" },
  FundAgri: { type: "checkbox", label: "FundAgriculture", filled: false, value: "" },
  FundPension: { type: "checkbox", label: "FundPension", filled: false, value: "" },

  // Religion
  RelHindu: { type: "checkbox", label: "ReligionHindu", filled: false, value: "" },
  RelMuslim: { type: "checkbox", label: "ReligionMuslim", filled: false, value: "" },
  RelChristian: { type: "checkbox", label: "ReligionChristian", filled: false, value: "" },
  RelSikh: { type: "checkbox", label: "ReligionSikh", filled: false, value: "" },
  RelOther: { type: "checkbox", label: "ReligionOther", filled: false, value: "" },

  // Category
  CatGen: { type: "checkbox", label: "CategoryGeneral", filled: false, value: "" },
  CatOBC: { type: "checkbox", label: "CategoryOBC", filled: false, value: "" },
  CatSC: { type: "checkbox", label: "CategorySC", filled: false, value: "" },
  CatST: { type: "checkbox", label: "CategoryST", filled: false, value: "" },

  PWDYes: { type: "checkbox", label: "PWDYes", filled: false, value: "" },
  PWDNo: { type: "checkbox", label: "PWDNo", filled: false, value: "" },
  PWDVisual: { type: "checkbox", label: "PWDVisually Impaired", filled: false, value: "" },
  PWDDiff: { type: "checkbox", label: "PWDDifferently Abled", filled: false, value: "" },

  // Education
  Edu9th: { type: "checkbox", label: "EducationBelow 10th", filled: false, value: "" },
  Edu10th: { type: "checkbox", label: "Education10th", filled: false, value: "" },
  EduGrad: { type: "checkbox", label: "EducationGraduate", filled: false, value: "" },
  EduPG: { type: "checkbox", label: "EducationPost Graduate", filled: false, value: "" },

  // PEP - Politically Exposed Person
  PEPYes: { type: "checkbox", label: "PEPYes", filled: false, value: "" },
  PEPRelated: { type: "checkbox", label: "PEPRelated to PEP", filled: false, value: "" },
  PEPNone: { type: "checkbox", label: "PEPNone", filled: false, value: "" },

  // Tax Residency
  TaxResYes: { type: "checkbox", label: "TaxResYes", filled: false, value: "" },
  TaxResNo: { type: "checkbox", label: "TaxResNo", filled: false, value: "" },

  PAN: { type: "text", label: "PAN", filled: false, value: "" },
  MobileNo: { type: "text", label: "Mobile No", filled: false, value: "" },
  EmailID: { type: "text", label: "Email ID", filled: false, value: "" },
  TelOff: { type: "text", label: "Telephone (Office)", filled: false, value: "" },
  TelRes: { type: "text", label: "Telephone (Residence)", filled: false, value: "" },

  // mapping of checkbox groups
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

  Instruction: {
    1: "For Name fields only ask FirstName MiddleName and LastName together and understanding the context of it fill those three fields ",
    2: "If Nationality is indian as stated by user then automaticall set value for fields CountryName and Citezenship as India and Indian respectively",
    3: "For occuption field ask user to go through the given options and select one you do not tell him the options ask him to read them and choose one from it . If he selects one of the given options then set the value of Specific Occupation as Null . If the user says no such option listed then ask him to specify the Occupation and fill it respectively",
    4: "If user says to skip a field then fill Null as the value of that field",

  }
}

// Admission Form 
const formFieldsAdmission = {
  Field1: { type: "text", label: "Student's Name", filled: false, value: "" },
  Field2: { type: "text", label: "Father's Name", filled: true, value: "Suresh Kumar" },
  Field3: { type: "text", label: "Caste", filled: false, value: "" },
  Field4: { type: "text", label: "Occupation", filled: false, value: "" },
  Field5: { type: "text", label: "Qualification", filled: false, value: "" },
  Field6: { type: "text", label: "Income", filled: false, value: "" },
  Field7: { type: "date", label: "Date of Birth", filled: false, value: "" },
  Field8: { type: "text", label: "Class for admission", filled: false, value: "" },
  Field9: { type: "text", label: "Admission fee", filled: false, value: "" },
  Field10: { type: "text", label: "Tuition fee", filled: false, value: "" },
  Field11: { type: "text", label: "Signature of father or Guardian", filled: false, value: "" },
  Field12: { type: "text", label: "Temporary Address", filled: false, value: "" },
  Field13: { type: "text", label: "Permanent Address", filled: false, value: "" },

  Instruction: {
    1: "For the field Signature of father or Gaurdian / Skip that field and do not fill anything in it",
  }


}

// Medical Intake Form 
const formFieldsMedical = {
  // Page 1: General Information
  TodaysDate: { type: "text", label: "Today's Date", filled: false, value: "" },
  FirstName: { type: "text", label: "First Name", filled: false, value: "" },
  MiddleName: { type: "text", label: "Middle Name", filled: false, value: "" },
  LastName: { type: "text", label: "Last Name", filled: false, value: "" },
  DOB: { type: "text", label: "Date of Birth", filled: false, value: "" },
  Age: { type: "text", label: "Age", filled: false, value: "" },
  Height: { type: "text", label: "Height", filled: false, value: "" },
  Weight: { type: "text", label: "Weight", filled: false, value: "" },

  GenderMale: { type: "checkbox", label: "GenderMale", filled: false, value: "" },
  GenderFemale: { type: "checkbox", label: "GenderFemale", filled: false, value: "" },

  PrimaryLang: { type: "text", label: "Primary Language", filled: false, value: "" },
  SecondaryLang: { type: "text", label: "Secondary Language", filled: false, value: "" },
  AddressLine1: { type: "text", label: "Address Line 1", filled: false, value: "" },
  AddressLine2: { type: "text", label: "Address Line 2", filled: false, value: "" },
  City: { type: "text", label: "City", filled: false, value: "" },
  State: { type: "text", label: "State", filled: false, value: "" },
  PinCode: { type: "text", label: "Pin Code", filled: false, value: "" },
  Phone: { type: "text", label: "Phone No", filled: false, value: "" },
  Email: { type: "text", label: "E-Mail", filled: false, value: "" },

  EmergencyName: { type: "text", label: "Emergency Contact Name", filled: false, value: "" },
  EmergencyPhone: { type: "text", label: "Emergency Contact Phone", filled: false, value: "" },
  Occupation: { type: "text", label: "Occupation", filled: false, value: "" },

  EduHighSchool: { type: "checkbox", label: "EduHighSchool", filled: false, value: "" },
  EduGraduate: { type: "checkbox", label: "EduGraduate", filled: false, value: "" },
  EduPostGrad: { type: "checkbox", label: "EduPostGrad", filled: false, value: "" },

  PhysicianName: { type: "text", label: "Primary Physician Name", filled: false, value: "" },
  PhysicianPhone: { type: "text", label: "Physician Phone No", filled: false, value: "" },
  ReferredBy: { type: "text", label: "Referred By", filled: false, value: "" },

  // Page 2: Medical Questionnaire
  HealthConcernsQ1: { type: "text", label: "When was the last time you felt well?", filled: false, value: "" },
  HealthConcernsQ2: { type: "text", label: "Did something trigger your change in health?", filled: false, value: "" },
  HealthConcernsQ3: { type: "text", label: "What makes you feel better?", filled: false, value: "" },
  HealthConcernsQ4: { type: "text", label: "What makes you feel worse?", filled: false, value: "" },

  Problem1Desc: { type: "text", label: "Problem 1 Description", filled: false, value: "" },
  Prob1Mild: { type: "checkbox", label: "Prob1Mild", filled: false, value: "" },
  Prob1Mod: { type: "checkbox", label: "Prob1Moderate", filled: false, value: "" },
  Prob1Sev: { type: "checkbox", label: "Prob1Severe", filled: false, value: "" },
  Problem2Desc: { type: "text", label: "Problem 2 Description", filled: false, value: "" },
  Prob2Mild: { type: "checkbox", label: "Prob2Mild", filled: false, value: "" },
  Prob2Mod: { type: "checkbox", label: "Prob2Moderate", filled: false, value: "" },
  Prob2Sev: { type: "checkbox", label: "Prob2Severe", filled: false, value: "" },
  Problem3Desc: { type: "text", label: "Problem 3 Description", filled: false, value: "" },
  Prob3Mild: { type: "checkbox", label: "Prob3Mild", filled: false, value: "" },
  Prob3Mod: { type: "checkbox", label: "Prob3Moderate", filled: false, value: "" },
  Prob3Sev: { type: "checkbox", label: "Prob3Severe", filled: false, value: "" },
  Problem4Desc: { type: "text", label: "Problem 4 Description", filled: false, value: "" },
  Prob4Mild: { type: "checkbox", label: "Prob4Mild", filled: false, value: "" },
  Prob4Mod: { type: "checkbox", label: "Prob4Moderate", filled: false, value: "" },
  Prob4Sev: { type: "checkbox", label: "Prob4Severe", filled: false, value: "" },
  Problem5Desc: { type: "text", label: "Problem 5 Description", filled: false, value: "" },
  Prob5Mild: { type: "checkbox", label: "Prob5Mild", filled: false, value: "" },
  Prob5Mod: { type: "checkbox", label: "Prob5Moderate", filled: false, value: "" },
  Prob5Sev: { type: "checkbox", label: "Prob5Severe", filled: false, value: "" },

  Treatment1Desc: { type: "text", label: "Treatment 1 Description", filled: false, value: "" },
  Treat1Success: { type: "checkbox", label: "Treat1Success", filled: false, value: "" },
  Treatment2Desc: { type: "text", label: "Treatment 2 Description", filled: false, value: "" },
  Treat2Success: { type: "checkbox", label: "Treat2Success", filled: false, value: "" },
  Treatment3Desc: { type: "text", label: "Treatment 3 Description", filled: false, value: "" },
  Treat3Success: { type: "checkbox", label: "Treat3Success", filled: false, value: "" },
  Treatment4Desc: { type: "text", label: "Treatment 4 Description", filled: false, value: "" },
  Treat4Success: { type: "checkbox", label: "Treat4Success", filled: false, value: "" },
  Treatment5Desc: { type: "text", label: "Treatment 5 Description", filled: false, value: "" },
  Treat5Success: { type: "checkbox", label: "Treat5Success", filled: false, value: "" },

  // Page 3: Allergies & Injuries
  AllergyItem1: { type: "text", label: "Allergy Item 1", filled: false, value: "" },
  AllergyReaction1: { type: "text", label: "Allergy Reaction 1", filled: false, value: "" },
  AllergyItem2: { type: "text", label: "Allergy Item 2", filled: false, value: "" },
  AllergyReaction2: { type: "text", label: "Allergy Reaction 2", filled: false, value: "" },
  AllergyItem3: { type: "text", label: "Allergy Item 3", filled: false, value: "" },
  AllergyReaction3: { type: "text", label: "Allergy Reaction 3", filled: false, value: "" },
  AllergyItem4: { type: "text", label: "Allergy Item 4", filled: false, value: "" },
  AllergyReaction4: { type: "text", label: "Allergy Reaction 4", filled: false, value: "" },

  InjBack: { type: "checkbox", label: "InjBack", filled: false, value: "" },
  InjHead: { type: "checkbox", label: "InjHead", filled: false, value: "" },
  InjNeck: { type: "checkbox", label: "InjNeck", filled: false, value: "" },
  InjBroken: { type: "checkbox", label: "InjBroken", filled: false, value: "" },
  InjOther: { type: "checkbox", label: "InjOther", filled: false, value: "" },
  InjOtherDesc: { type: "text", label: "Injury Other Description", filled: false, value: "" },

  ImplantsYes: { type: "checkbox", label: "ImplantsYes", filled: false, value: "" },
  ImplantsNo: { type: "checkbox", label: "ImplantsNo", filled: false, value: "" },

  DateHospitalized1: { type: "text", label: "Date Hospitalized 1", filled: false, value: "" },
  ReasonHospitalized1: { type: "text", label: "Reason Hospitalized 1", filled: false, value: "" },
  DateHospitalized2: { type: "text", label: "Date Hospitalized 2", filled: false, value: "" },
  ReasonHospitalized2: { type: "text", label: "Reason Hospitalized 2", filled: false, value: "" },
  DateHospitalized3: { type: "text", label: "Date Hospitalized 3", filled: false, value: "" },
  ReasonHospitalized3: { type: "text", label: "Reason Hospitalized 3", filled: false, value: "" },
  DateHospitalized4: { type: "text", label: "Date Hospitalized 4", filled: false, value: "" },
  ReasonHospitalized4: { type: "text", label: "Reason Hospitalized 4", filled: false, value: "" },

  CheckBox: {
    1: "Gender",
    2: "Education",
    3: "Prob1",
    4: "Prob2",
    5: "Prob3",
    6: "Prob4",
    7: "Prob5",
    8: "Treat1",
    9: "Treat2",
    10: "Treat3",
    11: "Treat4",
    12: "Treat5",
    13: "Injuries",
    14: "Implants"
  },

  Instruction: {
    1: "For Name fields only ask FirstName MiddleName and LastName together and understanding the context of it fill those three fields.",
    2: "If user says to skip a field then fill Null as the value of that field.",
    3: "For multiple choice fields (like Severity or Success), try to infer the choice based on user's answer."
  }
}


// Array of object that stores all the forms
const forms = [{

  id: '1',
  name: "Admission Form",
  formFields: formFieldsAdmission,
  description: 'Standard academic institution admission application',
  tag: 'Education',
  filename: 'filled_admission.pdf'

}, {
  id: '2',
  name: "Account Opening Form",
  formFields: formFieldsAccountOpening,
  description: 'Account Opening form',
  tag: 'Banking',
  filename: 'filled_account_opening_form.pdf'

}, {
  id: '3',
  name: "Medical Intake Form",
  formFields: formFieldsMedical,
  description: 'Medical history and intake form for patients',
  tag: 'Healthcare',
  filename: 'filled_medical-intake-form.pdf'

}]

export default forms;


// To add a new form
// 1. Create template pdf in filled_templatePDFs folder with filename xx-template.pdf
// 2. Add the formFields in formFields.js with id and filename xx.pdf
// 3. Add the controller in controllers/downloadControllers.js with id and and filename xx.pdf
// 4. Add the form in forms array with id and filename xx.pdf