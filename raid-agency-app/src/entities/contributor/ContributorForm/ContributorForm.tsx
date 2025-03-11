import { DisplayItem } from "@/components/display-item";
import { CheckboxField } from "@/fields/CheckboxField";
import { TextInputField } from "@/fields/TextInputField";
import { Contributor } from "@/generated/raid";
import { Grid } from "@mui/material";

interface ContributorWithStatus extends Contributor {
  status?: string;
}

export const ContributorForm = ({
  index,
  data,
}: {
  index: number;
  data: ContributorWithStatus[];
}) => {
  return (
    <Grid container spacing={2}>
      {(!data || !data[index] || !Object.hasOwn(data[index], "status")) && (
        <TextInputField
          name={`contributor.${index}.id`}
          label="ORCID ID"
          placeholder="Full ORCID ID, e.g. https://orcid.org/0000-0000-0000-0000"
          width={12}
        />
      )}
      {data[index] && Object.hasOwn(data[index], "status") && (
        <DisplayItem
          label="Contributor Status"
          value={"status" in data[index] ? data[index].status : ""}
          width={12}
        />
      )}

      <CheckboxField
        name={`contributor.${index}.leader`}
        label="Leader?"
        width={6}
      />
      <CheckboxField
        name={`contributor.${index}.contact`}
        label="Contact?"
        width={6}
      />
    </Grid>
  );
};

ContributorForm.displayName = "ContributorDetailsFormComponent";
