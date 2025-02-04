import { DisplayCard } from "@/components/display-card";
import { DisplayItem } from "@/components/display-item";
import { useMapping } from "@/mapping";
import type { RelatedRaid, Title } from "@/generated/raid";
import { Divider, Grid, Stack, Typography } from "@mui/material";
import { memo, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getLastTwoUrlSegments } from "@/utils/string-utils/string-utils";
import { useKeycloak } from "@react-keycloak/web";
import { getApiEndpoint } from "@/utils/api-utils/api-utils";

const NoItemsMessage = memo(() => (
  <Typography variant="body2" color="text.secondary" textAlign="center">
    No related RAiDs defined
  </Typography>
));

const RelatedRaidItem = memo(
  ({ relatedRaid, i }: { relatedRaid: RelatedRaid; i: number }) => {
    const { keycloak } = useKeycloak();
    const apiEndpoint = getApiEndpoint();
    const raidQuery = useQuery({
      queryKey: ["raid", relatedRaid.id],
      queryFn: () =>
        fetch(`${apiEndpoint}/raid/${getLastTwoUrlSegments(relatedRaid.id!)}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${keycloak.token}`,
          },
        }).then((res) => res.json()),
      enabled: !!relatedRaid.id,
    });

    const { generalMap } = useMapping();

    const relatedRaidTypeMappedValue = useMemo(
      () => generalMap.get(String(relatedRaid.type?.id)) ?? "",
      [relatedRaid.type?.id]
    );

    return (
      <>
        {raidQuery.data && raidQuery.data.title ? (
          <Typography variant="body1">
            {raidQuery.data.title.map((el: Title) => el.text).join(",")}
          </Typography>
        ) : (
          <Typography variant="body1">Related RAiD #{i + 1}</Typography>
        )}

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
              key={crypto.randomUUID()}
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
