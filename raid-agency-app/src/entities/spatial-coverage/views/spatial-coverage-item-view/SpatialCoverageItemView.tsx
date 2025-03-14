import { DisplayItem } from "@/components/display-item";
import { SpatialCoveragePlaceItemView } from "@/entities/spatial-coverage-place/views/spatial-coverage-place-item-view";
import type { SpatialCoverage } from "@/generated/raid";
import { Divider, Grid, Stack, Typography } from "@mui/material";
import { memo } from "react";

const SpatialCoverageItemView = memo(
  ({ spatialCoverage, i }: { spatialCoverage: SpatialCoverage; i: number }) => {
    return (
      <>
        <Typography variant="body1">Spatial Coverage #{i + 1}</Typography>
        <Grid container spacing={2}>
          <DisplayItem
            label="ID"
            link={spatialCoverage.id}
            value={spatialCoverage.id}
            width={12}
          />
        </Grid>
        <Stack gap={2} sx={{ pl: 3 }}>
          <Stack direction="row" alignItems="baseline">
            <Typography variant="body1" sx={{ mr: 0.5 }}>
              Places
            </Typography>
            <Typography variant="caption" color="text.disabled">
              Spatial Coverage #{i + 1}
            </Typography>
          </Stack>
          <Stack gap={2} divider={<Divider />}>
            {spatialCoverage?.place?.map((spatialCoveragePlace, j) => (
              <SpatialCoveragePlaceItemView
                spatialCoveragePlace={spatialCoveragePlace}
                key={`spatial-coverage-${i}-place-${j}`}
              />
            ))}
          </Stack>
        </Stack>
      </>
    );
  }
);

SpatialCoverageItemView.displayName = "SpatialCoverageItemView";

export { SpatialCoverageItemView };
