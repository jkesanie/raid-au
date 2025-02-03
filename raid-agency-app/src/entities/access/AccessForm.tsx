import LanguageSelector from "@/fields/LanguageSelector";
import { TextInputField } from "@/fields/TextInputField";
import { TextSelectField } from "@/fields/TextSelectField";
import { RaidDto } from "@/generated/raid";
import generalMapping from "@/mapping/data/general-mapping.json";
import { Grid } from "@mui/material";
import { memo } from "react";
import { FieldErrors, useFormContext } from "react-hook-form";

const AccessForm = memo(({ errors }: { errors: FieldErrors<RaidDto> }) => {
  // formcontext
  const { setValue, getValues } = useFormContext();

  const accessTypeOptions = generalMapping
    .filter((el) => el.field === "access.type.id")
    .map((el) => ({
      value: el.key,
      label: el.value,
    }));

  return (
    <Grid container spacing={2}>
      <TextInputField
        name={`access.statement.text`}
        label="Access Statement"
        required={true}
        width={6}
      />

      <LanguageSelector name={`access.statement.language.id`} width={6} />

      <TextSelectField
        options={accessTypeOptions}
        name={`access.type.id`}
        label="Access Type"
        required={true}
        width={6}
      />

      {/* only show embargo expiry date if access type is c_f1cf */}
      {getValues("access.type.id").includes("c_f1cf/") && (
        <TextInputField
          name="access.embargoExpiry"
          label="Embargo expiry date"
          required={false}
          width={3}
        />
      )}
    </Grid>
  );
});

AccessForm.displayName = "AccessFormComponent";
export default AccessForm;
