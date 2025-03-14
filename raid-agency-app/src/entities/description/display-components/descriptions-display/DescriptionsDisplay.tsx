import { DisplayCard } from "@/components/display-card";
import { NoItemsMessage } from "@/components/no-items-message";
import { Description } from "@/generated/raid";
import { Divider, Stack } from "@mui/material";
import { memo } from "react";
import { DescriptionItem } from "../description-item";

const DescriptionsDisplay = memo(({ data }: { data: Description[] }) => (
  <DisplayCard data={data} labelPlural="Descriptions">
    <>
      {data.length === 0 && <NoItemsMessage entity="descriptions" />}
      <Stack gap={2} divider={<Divider />}>
        {data?.map((description, i) => (
          <DescriptionItem
            description={description}
            key={`description-${i}`}
            i={i}
          />
        ))}
      </Stack>
    </>
  </DisplayCard>
));

DescriptionsDisplay.displayName = "DescriptionDisplay";

export { DescriptionsDisplay };
