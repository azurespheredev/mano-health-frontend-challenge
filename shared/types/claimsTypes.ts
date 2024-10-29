export interface Claim {
  claimId: string;
  subscriberId: string;
  memberSequence: number;
  claimStatus: string;
  billed: number;
  allowed: number;
  paid: number;
  paymentStatusDate: string;
  serviceDate: string;
  receivedDate: string;
  entryDate: string;
  processedDate: string;
  paidDate: string;
  paymentStatus: string;
  groupName: string;
  groupId: string;
  divisionName: string;
  divisionId: string;
  plan: string;
  planId: string;
  placeOfService: string;
  claimType: string;
  procedureCode: string;
  memberGender: string;
  providerId: string;
  providerName: string;
}

export interface PapaparseResult {
  data: Record<string, string>[];
  errors: unknown[];
  meta: {
    delimiter: string;
    linebreak: string;
    aborted: boolean;
    truncated: boolean;
    fields: string[];
  };
}