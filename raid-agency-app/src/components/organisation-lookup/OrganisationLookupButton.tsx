import { Button, IconButton, Tooltip } from "@mui/material";
import { TravelExplore as TravelExploreIcon } from "@mui/icons-material";

export default function OrganisationLookupButton({ setOpen }: { setOpen: any }) {
  return (
    <Tooltip title="Open organisation lookup dialog" placement="top">
      <IconButton onClick={() => setOpen(true)}>
        <TravelExploreIcon />
      </IconButton>
    </Tooltip>
  );
}
