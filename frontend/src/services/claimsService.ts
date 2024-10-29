import type { Claim } from "shared/src/types/claimsTypes";
import { toCamel } from "~/utils/helpers";

export function convertToClaim(obj: Record<string, string>): Claim {
  const convertedObj: Record<string, string> = Object.keys(obj).reduce((acc: Record<string, string>, key: string) => {
    const camelKey = toCamel(key);
    acc[camelKey] = obj[key];
    return acc;
  }, {});

  return {
    claimId: convertedObj.claimID,
    subscriberId: convertedObj.subscriberID,
    memberSequence: Number(convertedObj.memberSequence),
    claimStatus: convertedObj.claimStatus,
    billed: Number(convertedObj.billed),
    allowed: Number(convertedObj.allowed),
    paid: Number(convertedObj.paid),
    paymentStatusDate: convertedObj.paymentStatusDate,
    serviceDate: convertedObj.serviceDate,
    receivedDate: convertedObj.receivedDate,
    entryDate: convertedObj.entryDate,
    processedDate: convertedObj.processedDate,
    paidDate: convertedObj.paidDate,
    paymentStatus: convertedObj.paymentStatus,
    groupName: convertedObj.groupName,
    groupId: convertedObj.groupID,
    divisionName: convertedObj.divisionName,
    divisionId: convertedObj.divisionID,
    plan: convertedObj.plan,
    planId: convertedObj.planID,
    placeOfService: convertedObj.placeOfService,
    claimType: convertedObj.claimType,
    procedureCode: convertedObj.procedureCode,
    memberGender: convertedObj.memberGender,
    providerId: convertedObj.providerID,
    providerName: convertedObj.providerName,
  }
}
