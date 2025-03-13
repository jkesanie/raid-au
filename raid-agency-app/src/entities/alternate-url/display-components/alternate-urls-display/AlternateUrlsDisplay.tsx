import { DisplayCard } from "@/components/display-card";
import { NoItemsMessage } from "@/components/no-items-message";
import { AlternateUrl } from "@/generated/raid";
import { Divider, Stack } from "@mui/material";
import { memo } from "react";
import { AlternateUrlItem } from "../alternate-url-item/AlternateUrlItem";

const AlternateUrlsDisplay = memo(({ data }: { data: AlternateUrl[] }) => (
  <DisplayCard data={data} labelPlural="Alternate URLs">
    <>
      {data.length === 0 && <NoItemsMessage entity="alternate URLs" />}
      <Stack gap={2} divider={<Divider />}>
        {(data || []).map((alternateUrl, i) => (
          <AlternateUrlItem
            alternateUrl={alternateUrl}
            key={`alt-url-${alternateUrl.url || i}`}
            i={i}
          />
        ))}
      </Stack>
    </>
  </DisplayCard>
));

AlternateUrlsDisplay.displayName = "AlternateUrlDisplay";

export { AlternateUrlsDisplay };
