import { DisplayItem } from "@/components/display-item";
import { Description } from "@/generated/raid";
import { useMapping } from "@/mapping";
import { Grid, Typography } from "@mui/material";
import { memo, useMemo } from "react";

const DescriptionItem = memo(
  ({ description, i }: { description: Description; i: number }) => {
    const { generalMap, languageMap } = useMapping();

    const languageMappedValue = useMemo(
      () => languageMap.get(String(description.language?.id)) ?? "",
      [description.language?.id, languageMap]
    );

    const descriptionTypeMappedValue = useMemo(
      () => generalMap.get(String(description.type?.id)) ?? "",
      [description.type?.id, generalMap]
    );

    return (
      <>
        <Typography variant="body1">Description #{i + 1}</Typography>
        <Grid container spacing={2}>
          <DisplayItem
            multiline
            label="Text"
            value={description.text}
            width={12}
          />
          <DisplayItem
            label="Type"
            value={descriptionTypeMappedValue}
            width={6}
          />
          <DisplayItem label="Language" value={languageMappedValue} width={6} />
        </Grid>
      </>
    );
  }
);

DescriptionItem.displayName = "DescriptionItem";

export { DescriptionItem };
