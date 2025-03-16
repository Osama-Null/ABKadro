// Enum mappings for EmployeePosition
const positionMap = {
  0: "ChiefOfficer",
  1: "Officer",
  2: "Manager",
  3: "GeneralManager",
  4: "AssitantGeneralManager",
  5: "SeniorOfficer",
};

// Enum mappings for EmployeeDepartment
const departmentMap = {
  0: "IT",
  1: "HR",
  2: "Finance",
  3: "Marketing",
  4: "Sales",
  5: "Operations",
  6: "Legal",
  7: "Management",
  8: "CustomerService",
  9: "ResearchAndDevelopment",
  10: "Production",
  11: "QualityAssurance",
  12: "Accounting",
  13: "PublicRelations",
  14: "Security",
  15: "Other",
};

// Enum mappings for RequestType
const typeOfRequestMap = {
  0: "Vacation",
  1: "Complaint",
};

// Enum mappings for Status (Vacation requests)
const vacationStatusMap = {
  0: "Ongoing",
  1: "RequestingDocuments",
  2: "Approved",
  3: "Rejected",
};

// Enum mappings for Status (Complaint requests)
const complaintStatusMap = {
  0: "Ongoing",
  1: "ReturedForResponse",
  2: "Resolved",
};

// Enum mappings for VacationType
const typeOfVacationMap = {
  0: "Annual",
  1: "Sick",
  2: "Hajj",
  3: "Eduacation",
  4: "HalfDay",
  5: "Hospitalization",
  6: "Maternity",
  7: "Paternity",
  8: "PatientCompanion",
  9: "TreatmentAbroad",
  10: "Marriage",
  11: "Bereavement",
};

// Enum mappings for ComplaintType
const complaintTypeMap = {
  0: "HarassmentAndDiscrimination",
  1: "SalaryAndPayroll",
  2: "WorkplaceSafety",
  3: "Workload",
  4: "PolicyViolation",
  5: "IT",
};

export {
  positionMap,
  departmentMap,
  typeOfRequestMap,
  vacationStatusMap,
  complaintStatusMap,
  typeOfVacationMap,
  complaintTypeMap,
};
