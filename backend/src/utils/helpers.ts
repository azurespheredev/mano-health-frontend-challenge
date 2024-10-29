import { BillingClass, BillingCodeType } from "shared/src/utils/enums";

export function mapClaimTypeToBillingClass(claimType: string): BillingClass {
  const billingClass: Record<string, BillingClass> = {
    professional: BillingClass.Professional,
    institutional: BillingClass.Institutional,
  };

  return billingClass[claimType.toLowerCase()];
}

export const placeOfServiceCodeMapping: { [key: string]: string } = {
  Office: "11",
  Home: "12",
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

export function getCurrentTimestamp(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day}-${hours}-${minutes}-${seconds}`;
}

export function parseTimestampString(timestamp: string): Date {
  const [year, month, day, hours, minutes, seconds] = timestamp.split("-").map(Number);
  return new Date(year, month - 1, day, hours, minutes, seconds);
}
