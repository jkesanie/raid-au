import { DisplayItem } from "@/components/display-item";
import type { Metadata } from "@/generated/raid/Metadata";
import { Card, CardContent, Grid } from "@mui/material";

export const MetadataDisplay = ({ metadata }: { metadata: Metadata }) => {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <DisplayItem
            label="RAiD created on"
            value={
              metadata.created && metadata.created !== null
                ? new Date(metadata.created * 1000).toLocaleString()
                : "Unknown"
            }
            width={3}
          />
          <DisplayItem
            label="RAiD updated on"
            value={
              metadata.updated && metadata.updated !== null
                ? new Date(metadata.updated * 1000).toLocaleString()
                : "Unknown"
            }
          />
        </Grid>
      </CardContent>
    </Card>
  );
};
