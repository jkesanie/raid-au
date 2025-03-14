import { DisplayItem } from "@/components/display-item";
import { RelatedObject } from "@/generated/raid";
import { useMapping } from "@/mapping";
import { Divider, Grid, Stack, Typography } from "@mui/material";
import { memo, useMemo } from "react";

const RelatedObjectItemView = memo(
  ({
    i,
    relatedObject,
    relatedObjectTitle,
  }: {
    i: number;
    relatedObject: RelatedObject;
    relatedObjectTitle: string;
  }) => {
    const { generalMap } = useMapping();

    const relatedObjectMappedValue = useMemo(
      () => generalMap.get(String(relatedObject.type?.id)) ?? "",
      [generalMap, relatedObject.type?.id]
    );

    return (
      <Stack gap={2}>
        <Typography variant="subtitle2">
          {relatedObjectTitle
            ? relatedObjectTitle
            : `Related Object #{${i + 1}}`}
        </Typography>
        <Grid container spacing={2}>
          <DisplayItem
            label="Related Object Link"
            value={relatedObject.id}
            link={relatedObject.id}
            width={8}
          />
          <DisplayItem
            label="Type"
            value={relatedObjectMappedValue}
            width={4}
          />
        </Grid>

        <Stack gap={2} sx={{ pl: 3 }}>
          <Stack direction="row" alignItems="baseline">
            <Typography variant="body1" sx={{ mr: 0.5 }}>
              Categories
            </Typography>
            <Typography variant="caption" color="text.disabled">
              {relatedObjectTitle
                ? relatedObjectTitle
                : `Related Object #{${i + 1}}`}
            </Typography>
          </Stack>
          <Stack gap={2} divider={<Divider />}>
            {(relatedObject?.category || []).map((category) => {
              const relatedObjectCategoryMappedValue = 
                generalMap.get(String(category.id)) ?? "";

              return (
                <Grid container spacing={2}>
                  <DisplayItem
                    label="Position"
                    value={relatedObjectCategoryMappedValue}
                    width={6}
                  />
                </Grid>
              );
            })}
          </Stack>
        </Stack>
      </Stack>
    );
  }
);

RelatedObjectItemView.displayName = "RelatedObjectItemView";

export { RelatedObjectItemView };
