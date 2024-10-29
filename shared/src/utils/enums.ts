export enum ReportingEntityType {
  GroupHealthPlan = "Group Health Plan",
  HealthInsuranceIssuer = "Health Insurance Issuer",
  ThirdParty = "Third Party",
}

export enum MRFReportStatus {
  IN_NETWORK = "In Network",
  OUT_NETWORK = "Out Network",
}

export enum BillingCodeType {
  CPT = "CPT",
  NDC = "NDC",
  HCPCS = "HCPCS",
  RC = "RC",
  ICD = "ICD",
  MSDRG = "MS-DRG",
  RDRG = "R-DRG",
  SDRG = "S-DRG",
  APSDRG = "APS-DRG",
  APDRG = "AP-DRG",
  APRDRG = "APR-DRG",
  APC = "APC",
  LOCAL = "LOCAL",
  EAPG = "EAPG",
  HIPPS = "HIPPS",
  CDT = "CDT",
}

export enum BillingClass {
  Professional = "professional",
  Institutional = "institutional",
}
