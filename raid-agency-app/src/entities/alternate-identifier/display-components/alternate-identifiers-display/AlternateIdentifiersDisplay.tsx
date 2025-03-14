import { DisplayCard } from "@/components/display-card";
import { NoItemsMessage } from "@/components/no-items-message";
import { AlternateIdentifier } from "@/generated/raid";
import { Divider, Stack } from "@mui/material";
import { memo } from "react";
import { AlternateIdentifierItem } from "../alternate-identifier-item/AlternateIdentifierItem";

const AlternateIdentifiersDisplay = memo(
  ({ data }: { data: AlternateIdentifier[] }) => (
    <DisplayCard data={data} labelPlural="Alternate Identifiers">
      {data.length === 0 ? (
        <NoItemsMessage entity="alternate identifiers" />
      ) : (
        <Stack gap={2} divider={<Divider />}>
          {data.map((alternateIdentifier, i) => (
            <AlternateIdentifierItem
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

AlternateIdentifiersDisplay.displayName = "AlternateIdentifiersDisplay";
export { AlternateIdentifiersDisplay };
