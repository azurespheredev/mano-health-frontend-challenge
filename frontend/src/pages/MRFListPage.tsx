import { Alert, Button, Divider, Group, Image, Text } from "@mantine/core";
import { IconAlertTriangle } from "@tabler/icons-react";
import { observer } from "mobx-react-lite";
import React from "react";
import { useNavigate } from "react-router-dom";
import type { MRFResponse } from "shared/src/types/apiTypes";
import AgGridTable from "~/components/shared/AgGridTable";
import DateParser from "~/components/shared/DateParser";
import FileDownload from "~/components/shared/FileDownload";
import axiosService from "~/services/axiosService";
import { useStores } from "~/stores/useStores";
import { ALERTS, CONTENT } from "~/utils/constants";

const MRFListPage: React.FC = observer(() => {
  const navigate = useNavigate();
  const { alertStore, mrfStore } = useStores();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const fetchMRFData = React.useCallback(async () => {
    setIsLoading(true);

    try {
      const { data: response }: { data: MRFResponse } = await axiosService.get("/api/mrf/list");

      if (response.success) {
        mrfStore.updateList(response.data);
      } else {
        alertStore.showAlert(ALERTS.SERVER_ERROR, response.message);
      }
    } catch (error) {
      alertStore.showAlert(ALERTS.SERVER_ERROR, error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  }, [alertStore, mrfStore]);

  React.useEffect(() => {
    fetchMRFData();
  }, [fetchMRFData]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-12 w-full">
        <Image
          alt="man-looking-documents-and-smiling"
          src={"/assets/images/man-looking-documents-and-smiling.jpg"}
          className="w-80 h-80"
        />

        <div className="flex flex-col gap-4 w-full">
          <Text size="xl">{CONTENT.MRF_PAGE_TITLE}</Text>
          <Alert variant="light" color={ALERTS.MRFPAGE_WARNING.status} icon={<IconAlertTriangle />}>
            {ALERTS.MRFPAGE_WARNING.message}
          </Alert>

          <Text>{CONTENT.MRF_PAGE_DESCRIPTION1}</Text>
          <Text>{CONTENT.MRF_PAGE_DESCRIPTION1}</Text>

          <Group justify="left" mt={16}>
            <Button onClick={() => navigate("/claims")}>{"Upload Claims"}</Button>
          </Group>
        </div>
      </div>

      <Divider />

      <AgGridTable
        data={mrfStore.mrfData}
        isLoading={isLoading}
        customComponents={{
          createdAt: DateParser,
          filename: FileDownload
        }}
      />
    </div>
  );
});

export default MRFListPage;