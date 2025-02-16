import { TextInputField } from "@/fields/TextInputField";
import { RaidDto } from "@/generated/raid";
import { Card, CardContent, CardHeader, Grid } from "@mui/material";
import { memo } from "react";
import {
  Control,
  FieldErrors,
  UseFormTrigger
} from "react-hook-form";
import dateGenerator from "../data-components/date-generator";

const DateFormComponent = memo(
  ({
    control,
    errors,
    trigger,
  }: {
    control: Control<RaidDto>;
    errors: FieldErrors<RaidDto>;
    trigger: UseFormTrigger<RaidDto>;
  }) => {
    const key = "date";
    const label = "Date";
    const labelPlural = "Dates";
    const generator = dateGenerator;

    return (
      <Card
        sx={{
          borderLeft: errors[key] ? "3px solid" : "none",
          borderLeftColor: "error.main",
        }}
      >
        <CardHeader title={labelPlural} />
        <CardContent>
          <Grid container spacing={2}>
            <TextInputField
              name="date.startDate"
              label="Start Date"
              required={true}
              width={3}
            />
            <TextInputField
              name="date.endDate"
              label="End Date"
              required={false}
              width={3}
            />
          </Grid>
        </CardContent>
      </Card>
    );
  }
);

DateFormComponent.displayName = "DateFormComponent";
export default DateFormComponent;
