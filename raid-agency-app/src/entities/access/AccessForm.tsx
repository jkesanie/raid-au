import DateInputField from "@/fields/DateInputField";
import LanguageSelector from "@/fields/LanguageSelector";
import { TextInputField } from "@/fields/TextInputField";
import { TextSelectField } from "@/fields/TextSelectField";
import { RaidDto } from "@/generated/raid";
import generalMapping from "@/mapping/data/general-mapping.json";
import { Grid } from "@mui/material";
import { memo } from "react";
import { FieldErrors, useFormContext, useWatch } from "react-hook-form";

const AccessForm = memo(({ errors }: { errors: FieldErrors<RaidDto> }) => {
  const { setValue, control } = useFormContext();

  // Watch for changes in the access type ID
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
    <Grid container spacing={2}>
      <TextSelectField
        options={accessTypeOptions}
        name={`access.type.id`}
        label="Access Type"
        required={true}
        width={6}
      />
      {/* Show embargo related fields only if access type is c_f1cf (embargoed) */}
      {accessTypeId?.includes("c_f1cf/") && (
        <>
          <TextInputField
            name={`access.statement.text`}
            label="Access Statement"
            required={true}
            width={12}
          />
          <LanguageSelector name={`access.statement.language.id`} width={6} />

          <DateInputField
            name="access.embargoExpiry"
            label="Embargo Expiry Date"
            required={true}
            width={6}
          />
        </>
      )}
    </Grid>
  );
});

AccessForm.displayName = "AccessFormComponent";
export default AccessForm;
