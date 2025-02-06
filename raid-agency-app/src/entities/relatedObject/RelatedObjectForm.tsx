import { TextInputField } from "@/fields/TextInputField";
import { TextSelectField } from "@/fields/TextSelectField";
import generalMapping from "@/mapping/data/general-mapping.json";
import { Grid, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { memo, useMemo } from "react";
import { useFormContext } from "react-hook-form";

const RelatedObjectForm = memo(({ index }: { index: number }) => {
  const { setValue, getValues } = useFormContext();

  const relatedObjectTypeOptions = useMemo(
    () =>
      generalMapping
        .filter((el) => el.field === "relatedObject.type.id")
        .map((el) => ({
          value: el.key,
          label: el.value,
        })),
    []
  );

  const useRelatedObjectTitles = () => {
    return useQuery({
      queryKey: ["relatedObjectTitles"],
      queryFn: () => {
        const stored = localStorage.getItem("relatedObjectTitles");
        return stored ? new Map(JSON.parse(stored)) : new Map();
      },
    });
  };

  const { data: relatedObjectTitles } = useRelatedObjectTitles();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12}>
        <Typography variant="subtitle2" gutterBottom>
          Current value:{" "}
          {relatedObjectTitles &&
            relatedObjectTitles.size &&
            relatedObjectTitles?.get(
              getValues(`relatedObject.${index}.id`).value || ""
            )}
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <TextInputField
            name={`relatedObject.${index}.id`}
            label="Related Object ID"
            placeholder="Related Object ID"
            required={true}
            width={8}
          />
        </Stack>
      </Grid>

      <TextSelectField
        options={relatedObjectTypeOptions}
        name={`relatedObject.${index}.type.id`}
        label="Type"
        placeholder="Type"
        required={true}
        width={4}
      />
    </Grid>
  );
});

RelatedObjectForm.displayName = "RelatedObjectDetailsFormComponent";
export default RelatedObjectForm;
