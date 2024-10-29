import { Button, Loader, Text } from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { MRFResponse } from "shared/src/types/apiTypes";
import { Claim } from "shared/src/types/claimsTypes";
import axiosService from "~/services/axiosService";
import { useStores } from "~/stores/useStores";
import { ALERTS, CONTENT } from "~/utils/constants";

interface Step3ProcessClaimsProps {
  claimsData: Claim[];
}

const Step3ProcessClaims: React.FC<Step3ProcessClaimsProps> = ({ claimsData }: Step3ProcessClaimsProps) => {
  const navigate = useNavigate();
  const { alertStore } = useStores();
  const [isProcessing, setIsProcessing] = React.useState<boolean>(true);

  const uploadClaims = React.useCallback(async () => {
    try {
      const { data: response }: { data: MRFResponse } = await axiosService.post("/api/mrf/generate", { claims: claimsData });
      if (response.success) {
        alertStore.reset();
        setIsProcessing(false);
      } else {
        alertStore.showAlert({
          ...ALERTS.SERVER_ERROR,
          title: response.message
        });
      }
    } catch (error) {
      alertStore.showAlert({
        ...ALERTS.SERVER_ERROR,
        title: error?.response?.data?.message || ALERTS.SERVER_ERROR.title
      });
    }
  }, [alertStore, claimsData]);

  React.useEffect(() => {
    uploadClaims();
  }, [uploadClaims]);

  return (
    <div className="flex flex-grow justify-center items-center">
      {isProcessing ? (
        <div className="flex flex-col justify-center items-center gap-8">
          <Loader size="xl" />
          <Text>{CONTENT.CONVERSION_PENDING}</Text>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-8">
          <IconCircleCheck className="w-20 h-20 text-primary" />
          <Text>{CONTENT.CONVERSION_SUCCESSFUL}</Text>
          <Button size="md" onClick={() => navigate("/mrf-list")}>{"Go to MRF Page"}</Button>
        </div>
      )}
    </div>
  );
};

export default Step3ProcessClaims;