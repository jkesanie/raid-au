import { DisplayItem } from "@/components/display-item";
import { SubjectKeyword } from "@/generated/raid";
import { useMapping } from "@/mapping";
import { Grid } from "@mui/material";
import { memo, useMemo } from "react";

const SubjectKeywordItemView = memo(
  ({ subjectKeyword }: { subjectKeyword: SubjectKeyword }) => {
    const { languageMap } = useMapping();

    const languageMappedValue = useMemo(
      () => languageMap.get(String(subjectKeyword.language?.id)) ?? "",
      [languageMap, subjectKeyword.language?.id]
    );
    return (
      <Grid container spacing={2}>
        <DisplayItem label="Keyword" value={subjectKeyword.text} width={8} />
        <DisplayItem label="Language" value={languageMappedValue} width={4} />
      </Grid>
    );
  }
);

SubjectKeywordItemView.displayName = "SubjectKeywordItemView";

export { SubjectKeywordItemView };
