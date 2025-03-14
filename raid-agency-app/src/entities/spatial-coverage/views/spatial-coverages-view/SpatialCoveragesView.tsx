import { DisplayCard } from "@/components/display-card";
import { NoItemsMessage } from "@/components/no-items-message";
import { SpatialCoverageItemView } from "@/entities/spatial-coverage/views/spatial-coverage-item-view";
import type { SpatialCoverage } from "@/generated/raid";
import { Divider, Stack } from "@mui/material";
import { memo } from "react";

const SpatialCoveragesView = memo(({ data }: { data: SpatialCoverage[] }) => (
  <DisplayCard
    data={data}
    labelPlural="Spatial Coverages"
    children={
      <>
        {data.length === 0 && <NoItemsMessage entity="spatial coverages" />}
        <Stack gap={2} divider={<Divider />}>
          {data?.map((spatialCoverage, i) => (
            <SpatialCoverageItemView
              spatialCoverage={spatialCoverage}
              key={`spatial-coverage-${i}`}
              i={i}
            />
          ))}
        </Stack>
      </>
    }
  />
));

SpatialCoveragesView.displayName = "SpatialCoveragesView";

export { SpatialCoveragesView };
