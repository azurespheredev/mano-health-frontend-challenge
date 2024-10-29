import { Button, Group, Text } from "@mantine/core";
import React from "react";
import type { Claim } from "shared/src/types/claimsTypes";
import AgGridTable from "~/components/shared/AgGridTable";
import { CONTENT } from "~/utils/constants";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

interface Step2ReviewClaimsProps {
  claimsData: Claim[];
  onChangeClaimsData: (data: Claim[]) => void;
  handleNextStep: () => void;
  handlePrevStep: () => void;
}

const Step2ReviewClaims: React.FC<Step2ReviewClaimsProps> = ({ claimsData, onChangeClaimsData, handleNextStep, handlePrevStep }) => {
  return (
    <div className="flex flex-col flex-grow gap-8 pt-8">
      <div className="flex flex-col gap-4">
        <Text>{CONTENT.REVIEW_PAGE_TITLE}</Text>
        <Text size="sm" className="whitespace-pre-line">
          {CONTENT.REVIEW_PAGE_DESCRIPTION}
        </Text>
      </div>

      <AgGridTable data={claimsData} onChangeData={onChangeClaimsData} editable={true} />

      <Group justify="center">
        <Button size="md" className="min-w-40 mb-4 md:mb-0" onClick={handleNextStep}>
          {"Approve"}
        </Button>

        <Button size="md" color="red" className="min-w-40 mb-4 md:mb-0" onClick={handlePrevStep}>
          {"Decline"}
        </Button>
      </Group>
    </div>
  );
};

export default React.memo(Step2ReviewClaims);
