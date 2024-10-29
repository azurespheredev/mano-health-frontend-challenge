import { AlertStatus } from "./enums";

export const CONTENT = {
  DRAG_FILE_HERE: "Drag CSV files here or click to select",
  FILE_SELECTED: "File uploaded!",
  SHOULD_NOT_EXCEED: "Attach a single CSV file, it should not exceed 5MB.",
};

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
    title: "Server Error Occurred",
    message: "Please check the server and try again."
  },
};