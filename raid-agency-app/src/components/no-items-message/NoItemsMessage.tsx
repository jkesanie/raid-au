import { Typography } from "@mui/material";
import { memo } from "react";

export const NoItemsMessage = memo(({ entity }: { entity: string }) => (
  <Typography variant="body2" color="text.secondary" textAlign="center">
    No {entity} defined
  </Typography>
));
