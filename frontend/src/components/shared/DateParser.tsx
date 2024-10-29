import React from "react";
import { AgGridCellRendererProps } from "~/types/props";

const DateParser: React.FC<AgGridCellRendererProps> = ({ value }: AgGridCellRendererProps) => {
  return (
    <span>{new Date(value).toLocaleDateString()} {new Date(value).toLocaleTimeString()}</span>
  );
};

export default DateParser;