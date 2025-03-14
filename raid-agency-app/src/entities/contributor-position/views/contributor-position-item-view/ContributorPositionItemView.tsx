import { DisplayItem } from "@/components/display-item";
import { useMapping } from "@/mapping";
import { ContributorPosition } from "@/generated/raid";
import { dateDisplayFormatter } from "@/utils/date-utils/date-utils";
import { Grid } from "@mui/material";
import { memo, useMemo } from "react";

const ContributorPositionItemView = memo(
  ({ contributorPosition }: { contributorPosition: ContributorPosition }) => {
    const { generalMap } = useMapping();

    const contributorPositionMappedValue = useMemo(
      () => generalMap.get(String(contributorPosition.id)) ?? "",
      [contributorPosition.id, generalMap]
    );

    return (
      <Grid container spacing={2}>
        <DisplayItem
          label="Position"
          value={contributorPositionMappedValue}
          width={6}
        />
        <DisplayItem
          label="Start Date"
          value={dateDisplayFormatter(contributorPosition.startDate)}
          width={3}
        />
        <DisplayItem
          label="End Date"
          value={dateDisplayFormatter(contributorPosition.endDate)}
          width={3}
        />
      </Grid>
    );
  }
);

ContributorPositionItemView.displayName = "ContributorPositionItemView";
export { ContributorPositionItemView };
