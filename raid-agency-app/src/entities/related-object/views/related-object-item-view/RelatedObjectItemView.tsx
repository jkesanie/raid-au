import { DisplayItem } from "@/components/display-item";
import { RelatedObject } from "@/generated/raid";
import { useMapping } from "@/mapping";
import { Alert, Box, CircularProgress, Divider, Grid, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { memo, useMemo } from "react";

const RelatedObjectItemView = memo(
  ({
    i,
    relatedObject,
    relatedObjectCitation,
    doiLoadingStates,
    doiErrors,
    retrySingleDOI,
  }: {
    i: number;
    relatedObject: RelatedObject;
    relatedObjectCitation: string | undefined;
    doiLoadingStates: Record<string, boolean>;
    doiErrors: Record<string, string | null>;
    retrySingleDOI: (relatedObject: RelatedObject) => void;
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
            Loading citation from DOI.org...
          </Typography>
        </Box>
      );
    });
    const isLoading = relatedObject.id ? doiLoadingStates[relatedObject.id] : false;
    const hasTitle = Boolean(relatedObjectCitation);
    return (
      <Stack gap={2}>
        <Typography variant="body2" color="text.primary" sx={{ mt: 1 }}>
            {`Related Object #${i + 1}`}
          </Typography>
        <DOILoadingIndicator doiId={relatedObject.id} />
        {hasTitle && !isLoading && (
          <Box sx={{ mt: 0, display: 'flex', gap: 0.5 }}>
            <Typography variant="body2" sx={{ color: 'text.primary' }}>
              Citation:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {relatedObjectCitation}
            </Typography>
          </Box>
        )}
        {/* Individual error message with retry */}
        {relatedObject.id && doiErrors[relatedObject.id] && (
          <Alert 
            severity="error"
            variant="outlined"
            sx={{ 
              mt: 1,
              alignItems: 'center',
              '& .MuiAlert-icon': {
                fontSize: '1.25rem'
              }
            }}
            action={
              <Tooltip title="Retry">
                <IconButton
                  size="small"
                  onClick={() => retrySingleDOI(relatedObject)}
                  disabled={doiLoadingStates[relatedObject.id]}
                  sx={{ 
                    color: 'error.main',
                    '&:hover': {
                      bgcolor: 'error.light',
                      color: 'error.contrastText'
                    }
                  }}
                >
                 <RefreshIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            }
          >
            Unable to retrieve citation from DOI.org
          </Alert>
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
