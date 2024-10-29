import React from "react";
import { AgGridCellRendererProps } from "~/types/props";

const DateParser: React.FC<AgGridCellRendererProps> = ({ value }) => {
  return (
    <span>
      {new Date(value).toLocaleDateString()} {new Date(value).toLocaleTimeString()}
    </span>
  );
};

export default React.memo(DateParser);
