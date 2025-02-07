import { dateDisplayFormatter } from "@/utils/date-utils/date-utils";
import { GridColDef } from "@mui/x-data-grid";

export const startDateColumn: GridColDef = {
  field: "date.startDate",
  headerName: "Start Date",
  flex: 1,
  valueGetter: (params) => {
    return params.row.date.startDate; // Return the raw date value for sorting
  },
  valueFormatter: (params) => {
    return dateDisplayFormatter(params.value); // Format the date for display
  },
};
