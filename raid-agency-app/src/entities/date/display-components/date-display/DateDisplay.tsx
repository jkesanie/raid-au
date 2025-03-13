import { DisplayCard } from "@/components/display-card";
import { DisplayItem } from "@/components/display-item";
import { ModelDate } from "@/generated/raid";
import { dateDisplayFormatter } from "@/utils/date-utils/date-utils";
import { Grid } from "@mui/material";
import { memo } from "react";

const DateDisplay = memo(({ data }: { data: ModelDate }) => (
  <DisplayCard data={data} labelPlural="Dates">
    <Grid container spacing={2}>
      <DisplayItem
        label="Start Date"
        testid="startDate"
        value={dateDisplayFormatter(data?.startDate)}
      />
      <DisplayItem
        label="End Date"
        value={dateDisplayFormatter(data?.endDate)}
      />
    </Grid>
  </DisplayCard>
));

DateDisplay.displayName = "DateDisplay";
export { DateDisplay };
