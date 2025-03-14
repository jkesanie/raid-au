import LanguageSelector from "@/fields/LanguageSelector";
import { TextInputField } from "@/fields/TextInputField";
import { TextSelectField } from "@/fields/TextSelectField";
import { RaidDto } from "@/generated/raid";
import generalMapping from "@/mapping/data/general-mapping.json";
import { Card, CardContent, CardHeader, Grid } from "@mui/material";
import { memo } from "react";
import {
  Control,
  FieldErrors,
  UseFormTrigger,
  useWatch,
} from "react-hook-form";

const AccessFormComponent = memo(
  ({
    control,
    errors,
  }: {
    control: Control<RaidDto>;
    errors: FieldErrors<RaidDto>;
    trigger: UseFormTrigger<RaidDto>;
  }) => {
    const key = "access";
    const labelPlural = "Access";

    const accessTypeId = useWatch({
      control,
      name: "access.type.id",
    });

    const accessTypeOptions = generalMapping
      .filter((el) => el.field === "access.type.id")
      .map((el) => ({
        value: el.key,
        label: el.value,
      }));

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
            <TextSelectField
              options={accessTypeOptions}
              name={`access.type.id`}
              label="Access Type"
              required={true}
              width={6}
            />
            {/* Only whow embargo related fields if access type is c_f1cf (embargoed) */}
            {accessTypeId?.includes("c_f1cf/") && (
              <>
                <TextInputField
                  name={`access.statement.text`}
                  label="Access Statement"
                  required={true}
                  width={12}
                />
                <LanguageSelector
                  name={`access.statement.language.id`}
                  width={6}
                />

                <TextInputField
                  name={`access.embargoExpiry`}
                  label="Embargo Expiry Date"
                  placeholder="Embargo Expiry Date"
                  required={true}
                  width={6}
                />
              </>
            )}
          </Grid>
        </CardContent>
      </Card>
    );
  }
);

AccessFormComponent.displayName = "AccessFormComponent";
export { AccessFormComponent };
