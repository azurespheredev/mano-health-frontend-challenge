import type { Claim } from "@/types/claimsTypes";
import type { AllowedAmounts, OutOfNetworkAllowedAmountFile, OutOfNetworkObject } from "@/types/MRFTypes";
import { ENTITY_NAME } from "@/utils/constants";
import { BillingClass, ReportingEntityType } from "@/utils/enums";
import {
  getProcedureDescription,
  mapClaimTypeToBillingClass,
  mapPlaceOfServiceToServiceCode,
  mapProcedureCodeToBillingCodeType
} from "@/utils/helpers";

export function convertClaimsToMRF(
  claimsData: Claim[]
): OutOfNetworkAllowedAmountFile {
  const outOfNetworkAllowedAmountFile: OutOfNetworkAllowedAmountFile = {
    reporting_entity_name: ENTITY_NAME,
    reporting_entity_type: ReportingEntityType.ThirdParty,
    out_of_network: [],
    last_updated_on: new Date().toISOString().split('T')[0],
    version: "1.0.0",
  };

  // Group claims by procedure code
  const procedureCodeGroups: Map<string, Claim[]> = new Map();
  for (const claim of claimsData) {
    if (!procedureCodeGroups.has(claim.procedureCode)) {
      procedureCodeGroups.set(claim.procedureCode, []);
    }
    procedureCodeGroups.get(claim.procedureCode)!.push(claim);
  }

  for (const [procedureCode, claims] of procedureCodeGroups) {
    const outOfNetworkObject: OutOfNetworkObject = {
      name: procedureCode,
      billing_code_type: mapProcedureCodeToBillingCodeType(procedureCode),
      billing_code: procedureCode,
      billing_code_type_version: "",
      description: getProcedureDescription(procedureCode),
      allowed_amounts: [],
    };

    // Group claims by provider, service code, and billing class
    const allowedAmountsGroups: Map<string, { claims: Claim[]; serviceCode?: string[]; billingClass: BillingClass }> = new Map();

    for (const claim of claims) {
      const serviceCodeValue = mapPlaceOfServiceToServiceCode(claim.placeOfService);
      const serviceCode = serviceCodeValue ? [serviceCodeValue] : undefined;

      const billingClass = mapClaimTypeToBillingClass(claim.claimType);
      const key = `${serviceCodeValue || ""}:${billingClass}`;

      if (!allowedAmountsGroups.has(key)) {
        allowedAmountsGroups.set(key, {
          claims: [],
          serviceCode,
          billingClass,
        });
      }
      allowedAmountsGroups.get(key)!.claims.push(claim);
    }

    // Get averages and build allowed amounts
    for (const group of allowedAmountsGroups.values()) {
      const { claims, serviceCode, billingClass } = group;
      const totalAllowed = claims.reduce((sum, claim) => sum + claim.allowed, 0);
      const totalBilled = claims.reduce((sum, claim) => sum + claim.billed, 0);
      const averageAllowed = parseFloat((totalAllowed / claims.length).toFixed(2));
      const averageBilled = parseFloat((totalBilled / claims.length).toFixed(2));
      const providerNPIs = Array.from(new Set(claims.map(claim => claim.providerId)));

      const allowedAmounts: AllowedAmounts = {
        service_code: serviceCode,
        billing_class: billingClass,
        payments: [
          {
            allowed_amount: averageAllowed,
            providers: [
              {
                billed_charge: averageBilled,
                npi: providerNPIs,
              },
            ],
          },
        ],
      };
      outOfNetworkObject.allowed_amounts.push(allowedAmounts);
    }
    outOfNetworkAllowedAmountFile.out_of_network.push(outOfNetworkObject);
  }

  return outOfNetworkAllowedAmountFile;
}