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

  GuardTypeFather: { type: "checkbox", label: "GuardTypeFather", filled: false, value: "" },
  GuardTypeMother: { type: "checkbox", label: "GuardTypeMother", filled: false, value: "" },
  GuardTypeSpouse: { type: "checkbox", label: "GuardTypeSpouse", filled: false, value: "" },

  GuardFirstName: { type: "text", label: "GuardFirstName", filled: false, value: "" },
  GuardMiddleName: { type: "text", label: "GuardMiddleName", filled: false, value: "" },
  GuardLastName: { type: "text", label: "GuardLastName", filled: false, value: "" },

  
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
    5: "GuardType",
    6: "Nationality",
    7: "Occupation",
    8: "Fund",
    9: "Religion",
    10: "Category",
    11: "PWD",
    12: "Education",
    13: "PEP",
    14: "TaxRes"
  }
}

export default formFields;
