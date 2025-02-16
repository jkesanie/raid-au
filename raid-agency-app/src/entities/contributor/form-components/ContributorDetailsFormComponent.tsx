import { Contributor } from "@/generated/raid";
import { IndeterminateCheckBox } from "@mui/icons-material";
import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { ContributorForm } from "../ContributorForm";

export default function ContributorDetailsFormComponent({
  index,
  handleRemoveItem,
  data,
}: {
  index: number;
  handleRemoveItem: (index: number) => void;
  data: Contributor[];
}) {
  const key = "contributor";
  const label = "Contributor";

  const [isRowHighlighted, setIsRowHighlighted] = useState(false);
  const { getValues } = useFormContext();

  const handleMouseEnter = () => setIsRowHighlighted(true);
  const handleMouseLeave = () => setIsRowHighlighted(false);

  return (
    <Stack gap={2}>
      <Typography variant="body2">
        <span
          style={{ textDecoration: isRowHighlighted ? "line-through" : "" }}
        >
          {getValues(`${key}.${index}.text`)
            ? getValues(`${key}.${index}.text`)
            : `${label} # ${index + 1}`}
        </span>
        {isRowHighlighted && " (to be deleted)"}
      </Typography>

      <Stack direction="row" alignItems="flex-start" gap={1}>
        <ContributorForm index={index} data={data} />

        <Tooltip title={`Remove ${label}`} placement="right">
          <IconButton
            aria-label="delete"
            color="error"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => {
              if (
                window.confirm(
                  `Are you sure you want to delete ${label} "${getValues(
                    `${key}.${index}.text`
                  )}"?`
                )
              ) {
                handleRemoveItem(index);
              }
            }}
          >
            <IndeterminateCheckBox />
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  );
}
