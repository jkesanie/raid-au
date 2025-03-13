import { DisplayItem } from "@/components/display-item";
import type { Title } from "@/generated/raid";
import { useMapping } from "@/mapping";
import { dateDisplayFormatter } from "@/utils/date-utils/date-utils";
import { Grid, Typography } from "@mui/material";
import { memo, useMemo } from "react";

const TitleItem = memo(({ title, i }: { title: Title; i: number }) => {
  const { generalMap, languageMap } = useMapping();

  const languageMappedValue = useMemo(
    () => languageMap.get(String(title.language?.id)) ?? "",
    [languageMap, title.language?.id]
  );

  const titleTypeMappedValue = useMemo(
    () => generalMap.get(String(title.type?.id)) ?? "",
    [generalMap, title.type?.id]
  );

  return (
    <>
      <Typography variant="body1">Title #{i + 1}</Typography>
      <Grid container spacing={2}>
        <DisplayItem label="Title" value={title.text} width={12} />
        <DisplayItem label="Type" value={titleTypeMappedValue} />
        <DisplayItem label="Language" value={languageMappedValue} />
        <DisplayItem
          label="Start Date"
          value={dateDisplayFormatter(title.startDate)}
        />
        <DisplayItem
          label="End Date"
          value={dateDisplayFormatter(title.endDate)}
        />
      </Grid>
    </>
  );
});

TitleItem.displayName = "TitleItem";

export { TitleItem };
