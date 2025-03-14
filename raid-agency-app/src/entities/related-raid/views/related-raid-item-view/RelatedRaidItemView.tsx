import { DisplayItem } from "@/components/display-item";
import type { RelatedRaid } from "@/generated/raid";
import { useMapping } from "@/mapping";
import { fetchRelatedRaidTitle } from "@/services/related-raid";
import { getLastTwoUrlSegments } from "@/utils/string-utils/string-utils";
import { Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { memo, useMemo } from "react";

const RelatedRaidItemView = memo(
  ({ relatedRaid }: { relatedRaid: RelatedRaid }) => {
    const handle = getLastTwoUrlSegments(relatedRaid.id!);
    const { generalMap } = useMapping(); // Moved up before any conditionals

    const relatedRaidTypeMappedValue = useMemo(
      () => generalMap.get(String(relatedRaid.type?.id)) ?? "",
      [generalMap, relatedRaid.type?.id]
    );

    const raidQuery = useQuery({
      queryKey: ["related-raid", handle],
      queryFn: () =>
        fetchRelatedRaidTitle({
          handle: handle!,
        }),
      enabled: !!handle,
    });

    return (
      <>
        {raidQuery.isPending
          ? "Loading..."
          : raidQuery.isError
          ? "Related RAiD"
          : raidQuery.data}

        <Grid container spacing={2}>
          <DisplayItem
            label="Related RAiD"
            value={relatedRaid.id}
            link={relatedRaid.id}
            width={6}
          />
          <DisplayItem
            label="Type"
            value={relatedRaidTypeMappedValue}
            width={6}
          />
        </Grid>
      </>
    );
  }
);

RelatedRaidItemView.displayName = "RelatedRaidItemView";
export { RelatedRaidItemView };
