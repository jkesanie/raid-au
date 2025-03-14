import { DisplayCard } from "@/components/display-card";
import { NoItemsMessage } from "@/components/no-items-message";
import { AlternateIdentifier } from "@/generated/raid";
import { Divider, Stack } from "@mui/material";
import { memo } from "react";
import { AlternateIdentifierItemView } from "@/entities/alternate-identifier/views/alternate-identifier-item-view";

const AlternateIdentifiersView = memo(
  ({ data }: { data: AlternateIdentifier[] }) => (
    <DisplayCard data={data} labelPlural="Alternate Identifiers">
      {data.length === 0 ? (
        <NoItemsMessage entity="alternate identifiers" />
      ) : (
        <Stack gap={2} divider={<Divider />}>
          {data.map((alternateIdentifier, i) => (
            <AlternateIdentifierItemView
              alternateIdentifier={alternateIdentifier}
              key={`alt-id-${alternateIdentifier.id || i}`}
              i={i}
            />
          ))}
        </Stack>
      )}
    </DisplayCard>
  )
);

AlternateIdentifiersView.displayName = "AlternateIdentifiersView";
export { AlternateIdentifiersView };
