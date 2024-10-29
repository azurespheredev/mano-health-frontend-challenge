import { Button, Group, Loader, Text } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { IconCsv, IconFileCheck, IconX } from "@tabler/icons-react";
import React from "react";
import Papa from "papaparse";
import { ZodError } from "zod";
import type { Claim, PapaparseResult } from "shared/src/types/claimsTypes";
import { claimsArrayValidationSchema } from "shared/src/utils/validations";
import { convertToClaim } from "~/services/claimsService";
import { useStores } from "~/stores/useStores";
import { ALERTS, CONTENT } from "~/utils/constants";
import { toOriginal } from "~/utils/helpers";

interface Step1UploadClaimsProps {
  selectedFile: File;
  onFileChange: (file: File) => void;
  onParsedDataChange: (data: Claim[]) => void;
  handleNextStep: () => void;
}

const maxFileSize: number = 1024 * 1024 * 5; // 5MB
const acceptedMimeTypes: string[] = ["text/csv"];

const Step1UploadClaims: React.FC<Step1UploadClaimsProps> = ({ selectedFile, onFileChange, onParsedDataChange, handleNextStep }) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const { alertStore } = useStores();

  const onFileAccept = React.useCallback(
    (files: File[]) => {
      alertStore.reset();
      onFileChange(files[0]);
    },
    [alertStore, onFileChange]
  );

  const onFileReject = React.useCallback(() => {
    alertStore.showAlert(ALERTS.NOT_CSV_FILE);
  }, [alertStore]);

  const onFileUpload = React.useCallback(() => {
    alertStore.reset();
    setLoading(true);

    const reader = new FileReader();
    reader.onload = event => {
      const csvData: string = event.target?.result as string;

      Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true,
        worker: true, // Parse CSV in separate thread
        complete: (result: PapaparseResult) => {
          if (result.errors.length > 0) {
            alertStore.showAlert(ALERTS.PAPAPARSE_ERROR);
            setLoading(false);
            return;
          }

          if (result.data.length === 0) {
            alertStore.showAlert(ALERTS.EMPTY_CSV_FILE);
            setLoading(false);
            return;
          }

          const convertedClaimData: Claim[] = result.data.map(item => convertToClaim(item));

          // Zod schema validation
          try {
            claimsArrayValidationSchema.parse(convertedClaimData);
            onParsedDataChange(convertedClaimData);
            handleNextStep();
          } catch (error) {
            let zodErrorMessage: string = "";

            if (error instanceof ZodError) {
              // Extract Zod errors and format them
              const formattedErrors: { [key in keyof Claim]?: string } = {};
              error.errors.forEach(err => {
                formattedErrors[err.path[1] as keyof Claim] = err.message;
              });

              Object.keys(formattedErrors).map((key: string) => {
                zodErrorMessage += `\n"${toOriginal(key)}" is ${formattedErrors[key as keyof Claim]}.`;
              });
            }

            alertStore.showAlert(ALERTS.CSV_VALIDATION_ERROR, zodErrorMessage);
          } finally {
            setLoading(false);
          }
        },
      });
    };
    reader.onerror = () => {
      alertStore.showAlert(ALERTS.CANNOT_READ_FILE);
      setLoading(false);
    };
    reader.readAsText(selectedFile);
  }, [alertStore, handleNextStep, onParsedDataChange, selectedFile]);

  return (
    <div className="flex flex-col flex-grow justify-center items-center gap-8 pt-8">
      <Dropzone onDrop={onFileAccept} onReject={onFileReject} maxSize={maxFileSize} accept={acceptedMimeTypes}>
        <Group justify="center" gap="xs" className="flex justify-center pointer-events-none w-full md:w-96 min-h-48">
          <Dropzone.Accept>
            <IconFileCheck className="w-16 h-16 text-green-400" />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX className="w-16 h-16 text-red-400" />
          </Dropzone.Reject>
          <Dropzone.Idle>{selectedFile ? <IconFileCheck className="w-16 h-16 text-green-400" /> : <IconCsv className="w-16 h-16 text-gray-400" />}</Dropzone.Idle>

          <div className="flex flex-col gap-2">
            <Text size="xl" className="text-center">
              {selectedFile ? CONTENT.FILE_SELECTED : CONTENT.DRAG_FILE_HERE}
            </Text>
            <Text size="sm" c="dimmed" className="text-center">
              {selectedFile ? selectedFile.name : CONTENT.SHOULD_NOT_EXCEED}
            </Text>
          </div>
        </Group>
      </Dropzone>

      <Group justify="center">
        <Button size="md" className="min-w-40" onClick={onFileUpload} disabled={!selectedFile || loading}>
          {loading ? <Loader size="sm" /> : "Parse File"}
        </Button>
      </Group>
    </div>
  );
};

export default React.memo(Step1UploadClaims);
