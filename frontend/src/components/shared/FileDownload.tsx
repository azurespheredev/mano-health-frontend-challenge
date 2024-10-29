import React from "react";
import type { MRFResponse } from "shared/src/types/apiTypes";
import axiosService from "~/services/axiosService";
import { useStores } from "~/stores/useStores";
import { AgGridCellRendererProps } from "~/types/props";
import { ALERTS } from "~/utils/constants";

const FileDownload: React.FC<AgGridCellRendererProps> = ({ value }: AgGridCellRendererProps) => {
  const { alertStore } = useStores();

  const handleDownload = React.useCallback(async () => {
    try {
      const response: MRFResponse = await axiosService.get(`/api/mrf/download/${encodeURIComponent(value)}`, {
        responseType: "blob",
      });
      const url: string = window.URL.createObjectURL(new Blob([response.data]));

      const link: HTMLAnchorElement = document.createElement("a");
      link.href = url;
      link.setAttribute("download", value);

      document.body.appendChild(link);
      link.click();

      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alertStore.showAlert({
        ...ALERTS.SERVER_ERROR,
        title: error?.response?.data?.message || ALERTS.SERVER_ERROR.title
      });
    }
  }, [alertStore, value]);

  return (
    <span className="cursor-pointer underline text-blue-700 hover:text-blue-400" onClick={handleDownload}>{value}</span>
  );
};

export default FileDownload