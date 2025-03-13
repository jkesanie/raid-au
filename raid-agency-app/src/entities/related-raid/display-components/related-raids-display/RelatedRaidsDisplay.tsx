import { DisplayCard } from "@/components/display-card";
import { NoItemsMessage } from "@/components/no-items-message";
import type { RelatedRaid } from "@/generated/raid";
import { Divider, Stack } from "@mui/material";
import { memo } from "react";
import { RelatedRaidItem } from "../related-raid-item";

const RelatedRaidsDisplay = memo(({ data }: { data: RelatedRaid[] }) => (
  <DisplayCard
    data={data}
    labelPlural="Related RAiDs"
    children={
      <>
        {data.length === 0 && <NoItemsMessage entity="related raids" />}
        <Stack gap={2} divider={<Divider />}>
          {(data || []).map((relatedRaid, i) => (
            <RelatedRaidItem
              relatedRaid={relatedRaid}
              key={relatedRaid.id || i}
            />
          ))}
        </Stack>
      </>
    }
  />
));

RelatedRaidsDisplay.displayName = "RelatedRaidDisplay";

export { RelatedRaidsDisplay };
