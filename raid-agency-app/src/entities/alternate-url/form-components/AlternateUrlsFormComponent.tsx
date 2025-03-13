import { RaidDto } from "@/generated/raid";
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
import { useState } from "react";
import {
  Control,
  FieldErrors,
  UseFormTrigger,
  useFieldArray,
} from "react-hook-form";
import alternateUrlGenerator from "../data-components/alternate-url-generator";
import AlternateUrlDetailsFormComponent from "./AlternateUrlDetailsFormComponent";

export default function AlternateUrlsFormComponent({
  control,
  errors,
  trigger,
}: {
  control: Control<RaidDto>;
  errors: FieldErrors<RaidDto>;
  trigger: UseFormTrigger<RaidDto>;
}) {
  const key = "alternateUrl";
  const label = "Alternate URL";
  const labelPlural = "Alternate URLs";
  const generator = alternateUrlGenerator;
  const DetailsFormComponent = AlternateUrlDetailsFormComponent;

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
              <DetailsFormComponent
                key={field.id}
                handleRemoveItem={() => remove(index)}
                index={index}
              />
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
