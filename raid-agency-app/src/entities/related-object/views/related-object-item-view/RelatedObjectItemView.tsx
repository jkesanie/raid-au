import { DisplayItem } from "@/components/display-item";
import { RelatedObject } from "@/generated/raid";
import { useMapping } from "@/mapping";
import { Box, CircularProgress, Divider, Grid, Stack, Typography } from "@mui/material";
import { memo, useMemo } from "react";

const RelatedObjectItemView = memo(
  ({
    i,
    relatedObject,
    relatedObjectTitle,
    doiLoadingStates
  }: {
    i: number;
    relatedObject: RelatedObject;
    relatedObjectTitle: string;
    doiLoadingStates: Record<string, boolean>;
  }) => {
    const { generalMap } = useMapping();

    const relatedObjectMappedValue = useMemo(
      () => generalMap.get(String(relatedObject.type?.id)) ?? "",
      [generalMap, relatedObject.type?.id]
    );
      // Individual DOI Loading Indicator
    const DOILoadingIndicator = memo(({ doiId }: { doiId?: string }) => {
      if (!doiId || !doiLoadingStates[doiId]) return null;
      
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
          <CircularProgress size={16} />
          <Typography variant="caption" color="text.secondary">
            Loading citation...
          </Typography>
        </Box>
      );
    });
    const isLoading = relatedObject.id ? doiLoadingStates[relatedObject.id] : false;
    const hasTitle = Boolean(relatedObjectTitle);
    return (
      <Stack gap={2}>
        <DOILoadingIndicator doiId={relatedObject.id} />
        {hasTitle && !isLoading && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {relatedObjectTitle}
          </Typography>
        )}
        {!hasTitle && !isLoading && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {`Related Object #${i + 1}`}
          </Typography>
        )}

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
                <Grid container spacing={2} key={category.id}>
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
