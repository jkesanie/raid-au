import { DisplayCard } from "@/components/display-card";
import { NoItemsMessage } from "@/components/no-items-message";
import type { SpatialCoverage } from "@/generated/raid";
import { Divider, Stack } from "@mui/material";
import { memo } from "react";
import { SpatialCoverageItem } from "../spatial-coverage-item/SpatialCoverageItem";

const SpatialCoveragesDisplay = memo(
  ({ data }: { data: SpatialCoverage[] }) => (
    <DisplayCard
      data={data}
      labelPlural="Spatial Coverages"
      children={
        <>
          {data.length === 0 && <NoItemsMessage entity="spatial coverages" />}
          <Stack gap={2} divider={<Divider />}>
            {data?.map((spatialCoverage, i) => (
              <SpatialCoverageItem
                spatialCoverage={spatialCoverage}
                key={`spatial-coverage-${i}`}
                i={i}
              />
            ))}
          </Stack>
        </>
      }
    />
  )
);

SpatialCoveragesDisplay.displayName = "SpatialCoveragesDisplay";

export { SpatialCoveragesDisplay };
