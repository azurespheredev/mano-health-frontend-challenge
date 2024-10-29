import { AlertStatus } from "./enums";

export const CONTENT = {
  REVIEW_PAGE_TITLE: "Please review the parsed CSV data below and approve for submission.",
  REVIEW_PAGE_DESCRIPTION: "• Click the checkbox to select rows to take action.\n• Click the table header to apply filters.\n• Double click the cell to edit the content.",
  MRF_PAGE_TITLE: "Machine Readable Files",
  MRF_PAGE_DESCRIPTION1: "A machine-readable file is defined as a digital representation of data or information in a file that can be imported or read by a computer system for further processing without human intervention, while ensuring no semantic meaning is lost.",
  MRF_PAGE_DESCRIPTION2: "Below are all of the relevant machine readable files. This page is intended to meet the compliance requirements for the Transparency in Coverage Act. Per that legislation, this page includes these files below.",
  DELETE_CONFIRM_QUESTION: "Are you sure you want to delete the selected rows?",
  DRAG_FILE_HERE: "Drag CSV files here or click to select",
  FILE_SELECTED: "File uploaded!",
  NO_ROWS_TO_DISPLAY: "There are no rows to display.",
  SHOULD_NOT_EXCEED: "Attach a single CSV file, it should not exceed 5MB.",
}

export const ALERTS = {
  CSV_VALIDATION_ERROR: {
    status: AlertStatus.ERROR,
    title: "Invalid CSV File",
    message: "Failed to validate the CSV file."
  },
  CANNOT_READ_FILE: {
    status: AlertStatus.ERROR,
    title: "Cannot Read File",
    message: "Failed to read the file. Please try again."
  },
  DELETE_TABLE_ROWS_SUCCESS: {
    status: AlertStatus.SUCCESS,
    title: "Success",
    message: "Selected rows deleted successfully!"
  },
  NOT_CSV_FILE: {
    status: AlertStatus.ERROR,
    title: "Invalid File Type",
    message: "The uploaded file is not a CSV file. Please upload a valid CSV file."
  },
  PAPAPARSE_ERROR: {
    status: AlertStatus.ERROR,
    title: "Parsing Error",
    message: "Failed to parse the CSV file. Please check the file and try again."
  },
  SERVER_ERROR: {
    status: AlertStatus.ERROR,
    title: "Server Error",
    message: "Please check the server status and try again."
  },
  MRFPAGE_WARNING: {
    status: AlertStatus.WARNING,
    title: "",
    message: "Some of these files are very large so download at your own risk."
  }
}