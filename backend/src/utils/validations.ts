import { z } from "zod";

const claimValidationSchema = z.object({
  claimId: z.string(),
  subscriberId: z.string(),
  memberSequence: z.number(),
  claimStatus: z.string(),
  billed: z.number(),
  allowed: z.number(),
  paid: z.number(),
  paymentStatusDate: z.string(),
  serviceDate: z.string(),
  receivedDate: z.string(),
  entryDate: z.string(),
  processedDate: z.string(),
  paidDate: z.string(),
  paymentStatus: z.string(),
  groupName: z.string(),
  groupId: z.string(),
  divisionName: z.string(),
  divisionId: z.string(),
  plan: z.string(),
  planId: z.string(),
  placeOfService: z.string(),
  claimType: z.string(),
  procedureCode: z.string(),
  memberGender: z.string(),
  providerId: z.string(),
  providerName: z.string(),
});

export const claimsArrayValidationSchema = z.array(claimValidationSchema);
