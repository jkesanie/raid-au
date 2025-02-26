import { useAuthHelper } from "@/keycloak";
import { GroupSelector } from "@/pages/home/components/GroupSelector";
import { RaidTable } from "@/pages/raid-table";
import { Add as AddIcon } from "@mui/icons-material";
import { Alert, Container, Fab, Stack } from "@mui/material";
import { Link } from "react-router-dom";

export const Home = () => {
  const { hasServicePointGroup, isServicePointUser } = useAuthHelper();

  return (
    <Container>
      <Stack gap={2}>
        {hasServicePointGroup && isServicePointUser && (
          <Fab
            variant="extended"
            component={Link}
            color="primary"
            sx={{ position: "fixed", bottom: "32px", right: "32px" }}
            type="button"
            to="/raids/new"
            data-testid="mint-raid-button"
          >
            <AddIcon sx={{ mr: 1 }} />
            Mint new RAiD
          </Fab>
        )}
        {hasServicePointGroup && !isServicePointUser && (
          <Alert severity="error">
            You successfully logged in, but the admin of the service point group
            has not granted you access yet.
          </Alert>
        )}
        {!hasServicePointGroup && <GroupSelector />}
        {hasServicePointGroup && isServicePointUser && <RaidTable />}
      </Stack>
    </Container>
  );
};
