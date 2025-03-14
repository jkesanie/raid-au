import { DisplayCard } from "@/components/display-card";
import { NoItemsMessage } from "@/components/no-items-message";
import { DescriptionItemView } from "@/entities/description/views/description-item-view";
import { Description } from "@/generated/raid";
import { Divider, Stack } from "@mui/material";
import { memo } from "react";

const DescriptionsView = memo(({ data }: { data: Description[] }) => (
  <DisplayCard data={data} labelPlural="Descriptions">
    <>
      {data.length === 0 && <NoItemsMessage entity="descriptions" />}
      <Stack gap={2} divider={<Divider />}>
        {data?.map((description, i) => (
          <DescriptionItemView
            description={description}
            key={`description-${i}`}
            i={i}
          />
        ))}
      </Stack>
    </>
  </DisplayCard>
));

DescriptionsView.displayName = "DescriptionsView";

export { DescriptionsView };
