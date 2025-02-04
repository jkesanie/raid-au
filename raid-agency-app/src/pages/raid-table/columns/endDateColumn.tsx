import { dateDisplayFormatter } from "@/utils/date-utils/date-utils";
import { GridColDef } from "@mui/x-data-grid";

export const endDateColumn: GridColDef = {
  field: "date.endDate",
  headerName: "End Date",
  flex: 1,
  valueGetter: (params) => {
    return params.row.date.endDate; // Return the raw date value for sorting
  },
  valueFormatter: (params) => {
    return dateDisplayFormatter(params.value); // Format the date for display
  },
};
