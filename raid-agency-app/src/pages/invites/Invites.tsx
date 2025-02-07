import { fetchInvites } from "@/services/invite";
import {
  Circle as CircleIcon,
  RunningWithErrors as RunningWithErrorsIcon
} from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useKeycloak } from "@react-keycloak/web";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

interface Invite {
  invites: {
    inviteeEmail: string;
    handle: string;
    status: string;
  }[];
}

export const Invites = () => {
  const { keycloak } = useKeycloak();
  const invitesQuery = useQuery<Invite>({
    queryKey: ["invites"],
    queryFn: () =>
      fetchInvites({
        token: keycloak.token!,
      }),
  });

  if (invitesQuery.isPending) {
    return <div>Loading...</div>;
  }

  if (invitesQuery.isError) {
    return <div>Error...</div>;
  }

  const { invites } = invitesQuery.data;

  return (
    <Container>
      <Card>
        <CardHeader
          title="Invites for your user"
          subheader="To accept invites, check your email for the invitation"
        />
        <CardContent>
          <Grid item xs={12} md={6}>
            {!invites ||
              (invites.length === 0 && (
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <RunningWithErrorsIcon />
                    </ListItemIcon>
                    <ListItemText primary="No invites found" />
                  </ListItem>
                </List>
              ))}

            <List dense={true}>
              {invites &&
                invites.length === 0 &&
                invites.map((invite: any) => (
                  <ListItemButton
                    component={Link}
                    to={`/raids/${invite.handle}`}
                    key={invite.handle}
                  >
                    <ListItemIcon>
                      <CircleIcon
                        sx={{ fontSize: 12 }}
                        color={
                          invite.status === "ACCEPTED" ? "success" : "warning"
                        }
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={invite.inviteeEmail}
                      secondary={invite.status}
                    />
                  </ListItemButton>
                ))}
            </List>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};
