import { DisplayItem } from "@/components/display-item";
import { AlternateIdentifier } from "@/generated/raid";
import { Grid, Typography } from "@mui/material";
import { memo } from "react";

const AlternateIdentifierItemView = memo(
  ({
    alternateIdentifier,
    i,
  }: {
    alternateIdentifier: AlternateIdentifier;
    i: number;
  }) => (
    <>
      <Typography variant="body1">Alternate Identifier #{i + 1}</Typography>
      <Grid container spacing={2}>
        <DisplayItem label="ID" value={alternateIdentifier.id} width={8} />
        <DisplayItem label="Type" value={alternateIdentifier.type} width={4} />
      </Grid>
    </>
  )
);

AlternateIdentifierItemView.displayName = "AlternateIdentifierItemView";
export { AlternateIdentifierItemView };
