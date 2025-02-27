import { useSnackbar } from "@/components/snackbar";
import { updateUserServicePointUserRole } from "@/services/service-points";
import { ServicePointWithMembers } from "@/types";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";

import {
  CheckCircleOutline as CheckCircleOutlineIcon,
  HighlightOff as HighlightOffIcon,
} from "@mui/icons-material";
import { Stack } from "@mui/material";

import { useKeycloak } from "@/contexts/keycloak-context";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const ServicePointUsersList = ({
  servicePointWithMembers,
}: {
  servicePointWithMembers?: ServicePointWithMembers;
}) => {
  console.log("+++ servicePointWithMembers", servicePointWithMembers);
  const { token } = useKeycloak();

  const queryClient = useQueryClient();
  const snackbar = useSnackbar();

  const modifyUserAccessMutation = useMutation({
    mutationFn: updateUserServicePointUserRole,
    onError: (error) => {
      console.error(error);
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["servicePoints"],
      });
      snackbar.openSnackbar(
        `✅ Success: ${variables.operation} role service-point-user `
      );
    },
  });

  return (
    <>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="h6">{servicePointWithMembers?.name}</Typography>
        <List dense={true}>
          {(servicePointWithMembers?.members || []).map((el) => {
            const username = el.attributes.username[0] || "";
            const firstName = el.attributes.firstName[0] || "";
            const lastName = el.attributes.lastName[0] || "";
            const email = el.attributes.email[0] || "";
            const roles = el.roles || [];
            const displayName =
              firstName || lastName
                ? `${username} (${firstName} ${lastName} ${email})`
                : `${username}`;
            return (
              <ListItem
                key={el.id}
                secondaryAction={
                  <Stack direction={"row"} spacing={1}>
                    <Tooltip title="Revoke" placement="top">
                      <span>
                        <IconButton
                          edge="end"
                          aria-label="revoke"
                          color="error"
                          disabled={!el?.roles?.includes("service-point-user")}
                          onClick={() => {
                            modifyUserAccessMutation.mutate({
                              userId: el.id,
                              userGroupId:
                                servicePointWithMembers?.groupId as string,
                              operation: "revoke",
                              token: token as string,
                            });
                          }}
                        >
                          <HighlightOffIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
                    <Tooltip title="Grant" placement="top">
                      <span>
                        <IconButton
                          edge="end"
                          aria-label="grant"
                          color="success"
                          disabled={el?.roles?.includes("service-point-user")}
                          onClick={() => {
                            modifyUserAccessMutation.mutate({
                              userId: el.id,
                              userGroupId:
                                servicePointWithMembers?.groupId as string,
                              operation: "grant",
                              token: token as string,
                            });
                          }}
                        >
                          <CheckCircleOutlineIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </Stack>
                }
              >
                <ListItemText
                  primary={displayName}
                  secondary={roles.join(" • ")}
                />
              </ListItem>
            );
          })}
        </List>
      </Paper>
    </>
  );
};
