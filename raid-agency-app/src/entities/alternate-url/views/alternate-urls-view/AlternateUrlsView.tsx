import { DisplayCard } from "@/components/display-card";
import { NoItemsMessage } from "@/components/no-items-message";
import { AlternateUrlItemView } from "@/entities/alternate-url/views/alternate-url-item-view/AlternateUrlItemView";
import { AlternateUrl } from "@/generated/raid";
import { Divider, Stack } from "@mui/material";
import { memo } from "react";

const AlternateUrlsView = memo(({ data }: { data: AlternateUrl[] }) => (
  <DisplayCard data={data} labelPlural="Alternate URLs">
    <>
      {data.length === 0 && <NoItemsMessage entity="alternate URLs" />}
      <Stack gap={2} divider={<Divider />}>
        {(data || []).map((alternateUrl, i) => (
          <AlternateUrlItemView
            alternateUrl={alternateUrl}
            key={`alt-url-${alternateUrl.url || i}`}
            i={i}
          />
        ))}
      </Stack>
    </>
  </DisplayCard>
));

AlternateUrlsView.displayName = "AlternateUrlsView";

export { AlternateUrlsView };
