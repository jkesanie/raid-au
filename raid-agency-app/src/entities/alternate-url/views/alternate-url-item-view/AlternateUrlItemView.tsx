import { DisplayItem } from "@/components/display-item";
import { AlternateUrl } from "@/generated/raid";
import { Grid, Typography } from "@mui/material";
import { memo } from "react";

const AlternateUrlItemView = memo(
  ({ alternateUrl, i }: { alternateUrl: AlternateUrl; i: number }) => (
    <>
      <Typography variant="body1">Alternate URL #{i + 1}</Typography>
      <Grid container>
        <DisplayItem
          label="URL"
          value={alternateUrl.url}
          link={alternateUrl.url}
          width={12}
        />
      </Grid>
    </>
  )
);

AlternateUrlItemView.displayName = "AlternateUrlItemView";

export { AlternateUrlItemView };
