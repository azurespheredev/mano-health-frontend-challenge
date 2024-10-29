import type { BillingClass, BillingCodeType, MRFReportStatus, ReportingEntityType, } from "../utils/enums";

export interface Provider {
  billed_charge: number;
  npi: string[];
}

export interface OutOfNetworkPayment {
  allowed_amount: number;
  billing_code_modifier?: string[];
  providers: Provider[];
}

export interface AllowedAmounts {
  service_code?: string[];
  billing_class: BillingClass;
  payments: OutOfNetworkPayment[];
}

export interface OutOfNetworkObject {
  name: string;
  billing_code_type: BillingCodeType;
  billing_code: string;
  billing_code_type_version: string;
  description: string;
  allowed_amounts: AllowedAmounts[];
}

export interface OutOfNetworkAllowedAmountFile {
  reporting_entity_name: string;
  reporting_entity_type: ReportingEntityType;
  out_of_network: OutOfNetworkObject[];
  last_updated_on: string;
  version: string;
}

export interface MRFEntity {
  entity: string;
  status: MRFReportStatus;
  createdAt: Date;
  filename: string;
}