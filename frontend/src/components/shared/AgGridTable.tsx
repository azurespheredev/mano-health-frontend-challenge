import { Button, Group, Loader, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconNotes } from "@tabler/icons-react";
import React from "react";
import { AgGridReact } from "ag-grid-react";
import type { CellValueChangedEvent, ColDef, RowSelectionOptions, SelectionChangedEvent } from "ag-grid-community";
import type { Claim } from "shared/src/types/claimsTypes";
import type { MRFEntity } from "shared/src/types/mrfTypes";
import { ALERTS, CONTENT } from "~/utils/constants";
import { useStores } from "~/stores/useStores";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

type TableRowType = Claim | MRFEntity;
type TableDataType = Array<TableRowType>;

interface AgGridTableProps {
  data: TableDataType;
  onChangeData?: (data: TableDataType) => void;
  editable?: boolean;
  isLoading?: boolean;
  customComponents?: Record<string, React.FC>;
}

const NoRowsOverlay: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <IconNotes size={36} color="gray" />
      <Text>{CONTENT.NO_ROWS_TO_DISPLAY}</Text>
    </div>
  );
};

const AgGridTable: React.FC<AgGridTableProps> = ({ data, onChangeData = () => {}, editable = false, isLoading = false, customComponents = {} }) => {
  const [isDeleteModalOpen, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);
  const [selectedRows, setSelecedRows] = React.useState<TableDataType>([]);
  const { alertStore } = useStores();

  const columnDefs = React.useMemo<ColDef<TableRowType>[]>(() => {
    return Object.keys(data[0] || {}).map(key => ({
      field: key as keyof TableRowType,
      minWidth: typeof data[0][key as keyof TableRowType] === "string" ? 180 : 128,
      cellRenderer: customComponents[key] || undefined,
    }));
  }, [data, customComponents]);

  const rowSelection = React.useMemo<RowSelectionOptions>(() => {
    return {
      mode: editable ? "multiRow" : "singleRow",
      groupSelects: "descendants",
      checkboxes: editable,
    };
  }, [editable]);

  const defaultColDef = React.useMemo<ColDef>(() => {
    return {
      editable: editable,
      flex: 1,
      filter: true,
    };
  }, [editable]);

  const paginationPageSizeSelector = React.useMemo<number[]>(() => {
    return [10, 20, 50, 100, 200, 500];
  }, []);
  const paginationPageSize = React.useMemo<number>(() => {
    return paginationPageSizeSelector[0];
  }, [paginationPageSizeSelector]);

  const onCellValueChanged = React.useCallback(
    (event: CellValueChangedEvent) => {
      const updatedData = [...data];
      updatedData[event.rowIndex][event.colDef.field] = event.newValue;
      onChangeData(updatedData);
    },
    [data, onChangeData]
  );

  const onSelectionChanged = React.useCallback((event: SelectionChangedEvent) => {
    setSelecedRows(event.api.getSelectedRows());
  }, []);

  const onDeleteSelectedRows = React.useCallback(() => {
    const updatedData = data.filter((_, index) => !selectedRows.includes(data[index]));

    onChangeData(updatedData);
    alertStore.showAlert(ALERTS.DELETE_TABLE_ROWS_SUCCESS);
    closeDeleteModal();
  }, [alertStore, data, closeDeleteModal, onChangeData, selectedRows]);

  return (
    <div className="flex flex-col gap-4">
      {selectedRows.length > 0 && (
        <div className="flex justify-end">
          <Button variant="outline" color="red" onClick={openDeleteModal}>
            {"Delete Selected Rows"}
          </Button>
        </div>
      )}

      <div className="ag-theme-quartz ag-header-cell-filtered">
        <AgGridReact
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          domLayout="autoHeight"
          noRowsOverlayComponent={isLoading ? <Loader size="xl" /> : NoRowsOverlay}
          onCellValueChanged={onCellValueChanged}
          onSelectionChanged={onSelectionChanged}
          pagination={true}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
          rowData={data}
          rowSelection={rowSelection}
        />
      </div>

      <Modal opened={isDeleteModalOpen} onClose={closeDeleteModal}>
        <Text>{CONTENT.DELETE_CONFIRM_QUESTION}</Text>
        <Group justify="right" mt="md">
          <Button variant="outline" onClick={closeDeleteModal}>
            {"Cancel"}
          </Button>
          <Button color="red" onClick={onDeleteSelectedRows}>
            {"Delete"}
          </Button>
        </Group>
      </Modal>
    </div>
  );
};

export default React.memo(AgGridTable);
