import { BillingClass, BillingCodeType } from "@/utils/enums";

export function mapClaimTypeToBillingClass(claimType: string): BillingClass {
  switch (claimType.toLowerCase()) {
    case "professional":
      return BillingClass.Professional;
    case "institutional":
      return BillingClass.Institutional;
    default:
      return BillingClass.Professional;
  }
}

export const placeOfServiceCodeMapping: { [key: string]: string } = {
  "Office": "11",
  "Home": "12",
  "Inpatient Hospital": "21",
  "Outpatient Hospital": "22",
  "Emergency Room - Hospital": "23",
  "Ambulatory Surgical Center": "24",
  "Birthing Center": "25",
  "Urgent Care Facility": "20",
};

export function mapPlaceOfServiceToServiceCode(placeOfService: string): string | undefined {
  return placeOfServiceCodeMapping[placeOfService];
}

export function mapProcedureCodeToBillingCodeType(procedureCode: string): BillingCodeType {
  if (/^\d{5}$/.test(procedureCode)) {
    return BillingCodeType.CPT;
  } else if (/^[A-Z]\d{4}$/.test(procedureCode)) {
    return BillingCodeType.HCPCS;
  } else {
    return BillingCodeType.LOCAL;
  }
}

export function getProcedureDescription(procedureCode: string): string {
  // In a real project, this would look up the description. Here, return the procedure code as the description
  return procedureCode;
}