import { Button, IconButton, Tooltip } from "@mui/material";
import { TravelExplore as TravelExploreIcon } from "@mui/icons-material";

export default function OrganisationQueryButton({ setOpen }: { setOpen: any }) {
  return (
    <Tooltip title="Open organisation dialog" placement="left">
      <IconButton onClick={() => setOpen(true)}>
        <TravelExploreIcon />
      </IconButton>
    </Tooltip>
  );
}
