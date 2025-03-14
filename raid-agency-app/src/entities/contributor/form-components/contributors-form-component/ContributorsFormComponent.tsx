import { contributorGenerator } from "@/entities/contributor/data-components/contributor-generator";
import { Contributor, RaidDto } from "@/generated/raid";
import { AddBox } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { Fragment, useState } from "react";
import {
  Control,
  FieldErrors,
  UseFormTrigger,
  useFieldArray,
} from "react-hook-form";

import { ContributorPositionsFormComponent } from "@/entities/contributor-position/form-components/contributor-positions-form-component";
import { ContributorRolesFormComponent } from "@/entities/contributor-role/form-components/contributor-roles-form-component";
import { ContributorDetailsFormComponent } from "@/entities/contributor/form-components/contributor-details-form-component";

export function ContributorsFormComponent({
  control,
  data,
  errors,
  trigger,
}: {
  control: Control<RaidDto>;
  data: Contributor[];
  errors: FieldErrors<RaidDto>;
  trigger: UseFormTrigger<RaidDto>;
}) {
  const key = "contributor";
  const label = "Contributor";
  const labelPlural = "Contributors";
  const generator = contributorGenerator;
  const DetailsFormComponent = ContributorDetailsFormComponent;

  const [isRowHighlighted, setIsRowHighlighted] = useState(false);
  const { fields, append, remove } = useFieldArray({ control, name: key });
  const errorMessage = errors[key]?.message;

  const handleAddItem = () => {
    append(generator());
    trigger(key);
  };

  return (
    <Card
      sx={{
        borderLeft: errors[key] ? "3px solid" : "none",
        borderLeftColor: "error.main",
      }}
    >
      <CardHeader title={labelPlural} />
      <CardContent>
        <Stack gap={2} className={isRowHighlighted ? "add" : ""}>
          {errorMessage && (
            <Typography variant="body2" color="error" textAlign="center">
              {errorMessage}
            </Typography>
          )}

          {fields.length === 0 && (
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
            >
              No {labelPlural} defined
            </Typography>
          )}

          <Stack divider={<Divider />} gap={2} data-testid={`${key}-form`}>
            {fields.map((field, index) => (
              <Fragment key={field.id}>
                <DetailsFormComponent
                  key={field.id}
                  handleRemoveItem={() => remove(index)}
                  index={index}
                  data={data}
                />
                <ContributorPositionsFormComponent
                  control={control}
                  errors={errors}
                  trigger={trigger}
                  parentIndex={index}
                />
                <ContributorRolesFormComponent
                  control={control}
                  errors={errors}
                  trigger={trigger}
                  parentIndex={index}
                />
              </Fragment>
            ))}
          </Stack>
        </Stack>
      </CardContent>

      <CardActions>
        <Button
          variant="outlined"
          color="success"
          size="small"
          startIcon={<AddBox />}
          sx={{ textTransform: "none", mt: 3 }}
          onClick={handleAddItem}
          onMouseEnter={() => setIsRowHighlighted(true)}
          onMouseLeave={() => setIsRowHighlighted(false)}
        >
          Add {label}
        </Button>
      </CardActions>
    </Card>
  );
}