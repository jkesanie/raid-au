import { DisplayCard } from "@/components/display-card";
import { DisplayItem } from "@/components/display-item";
import { ErrorAlertComponent } from "@/components/error-alert-component";
import type { RelatedRaid } from "@/generated/raid";
import { useMapping } from "@/mapping";
import { Loading } from "@/pages/loading";
import { fetchRelatedRaidTitle } from "@/services/related-raid";
import { getLastTwoUrlSegments } from "@/utils/string-utils/string-utils";
import { Divider, Grid, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { memo, useMemo } from "react";

const NoItemsMessage = memo(() => (
  <Typography variant="body2" color="text.secondary" textAlign="center">
    No related RAiDs defined
  </Typography>
));

const RelatedRaidItem = memo(
  ({ relatedRaid, i }: { relatedRaid: RelatedRaid; i: number }) => {
    const handle = getLastTwoUrlSegments(relatedRaid.id!);
    const { generalMap } = useMapping(); // Moved up before any conditionals

    const relatedRaidTypeMappedValue = useMemo(
      () => generalMap.get(String(relatedRaid.type?.id)) ?? "",
      [relatedRaid.type?.id]
    );

    const raidQuery = useQuery({
      queryKey: ["related-raid", handle],
      queryFn: () =>
        fetchRelatedRaidTitle({
          handle: handle!,
        }),
      enabled: !!handle,
    });

    if (raidQuery.isPending) {
      return <Loading />;
    }

    if (!raidQuery.isError) {
      return <ErrorAlertComponent error="Error loading related RAiD" />;
    }

    return (
      <>
        {raidQuery.data}

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

const RelatedRaidDisplay = memo(({ data }: { data: RelatedRaid[] }) => (
  <DisplayCard
    data={data}
    labelPlural="Related RAiDs"
    children={
      <>
        {data.length === 0 && <NoItemsMessage />}
        <Stack gap={2} divider={<Divider />}>
          {(data || []).map((relatedRaid, i) => (
            <RelatedRaidItem
              relatedRaid={relatedRaid}
              key={relatedRaid.id || i}
              i={i}
            />
          ))}
        </Stack>
      </>
    }
  />
));

NoItemsMessage.displayName = "NoItemsMessage";
RelatedRaidItem.displayName = "RelatedRaidItem";
RelatedRaidDisplay.displayName = "RelatedRaidDisplay";

export default RelatedRaidDisplay;
