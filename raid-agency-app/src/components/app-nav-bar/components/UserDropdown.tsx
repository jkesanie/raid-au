import { useSnackbar } from "@/components/snackbar";
import { fetchCurrentUserKeycloakGroups } from "@/services/keycloak";
import { KeycloakGroup } from "@/types";
import {
  AccountCircle as AccountCircleIcon,
  ExitToApp as ExitToAppIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import {
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import { useKeycloak } from "@react-keycloak/web";
import { useQuery } from "@tanstack/react-query";
import { KeycloakTokenParsed } from "keycloak-js";
import React from "react";

const keycloakInternalRoles = [
  "default-roles-raid",
  "offline_access",
  "uma_authorization",
];

function getRolesFromToken({
  tokenParsed,
}: {
  tokenParsed: KeycloakTokenParsed | undefined;
}): string[] | undefined {
  return tokenParsed?.realm_access?.roles.filter(
    (el) => !keycloakInternalRoles.includes(el)
  );
}

export default function UserDropdown() {
  const { keycloak, initialized } = useKeycloak();
  const snackbar = useSnackbar();

  const [accountMenuAnchor, setAccountMenuAnchor] =
    React.useState<null | HTMLElement>(null);

  const handleAccountMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAccountMenuAnchor(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAccountMenuAnchor(null);
  };

  const roles = getRolesFromToken({ tokenParsed: keycloak.tokenParsed });

  const keycloakGroupsQuery = useQuery<KeycloakGroup[]>({
    queryKey: ["keycloak-groups"],
    queryFn: async () => {
      const servicePoints = await fetchCurrentUserKeycloakGroups({
        token: keycloak.token!,
      });
      return servicePoints;
    },
  });

  if (keycloakGroupsQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (keycloakGroupsQuery.isError) {
    return <div>Error...</div>;
  }

  return (
    <>
      {keycloak.authenticated && initialized && (
        <div>
          {(keycloak.authenticated && keycloak?.tokenParsed?.email && (
            <Button
              variant="outlined"
              startIcon={<AccountCircleIcon />}
              endIcon={<ExpandMoreIcon />}
              color="primary"
              onClick={handleAccountMenuOpen}
              sx={{
                textTransform: "none",
              }}
            >
              <Typography
                sx={{
                  display: { xs: "none", sm: "block" },
                }}
              >
                {keycloak?.tokenParsed?.email}
              </Typography>
            </Button>
          )) || (
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleAccountMenuOpen}
            >
              <AccountCircleIcon />
            </IconButton>
          )}
          <Menu
            id="menu-appbar"
            anchorEl={accountMenuAnchor}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(accountMenuAnchor)}
            onClose={handleAccountMenuClose}
          >
            <MenuList dense>
              {keycloak.tokenParsed?.email && (
                <MenuItem
                  onClick={() => {
                    navigator.clipboard.writeText(
                      keycloak.tokenParsed?.email || ""
                    );
                    snackbar?.openSnackbar(`✅ Copied value to clipboard`);
                  }}
                >
                  <ListItemText
                    primary="Email"
                    secondary={keycloak.tokenParsed?.email || ""}
                  />
                </MenuItem>
              )}
              <MenuItem
                onClick={() => {
                  navigator.clipboard.writeText(
                    keycloak.tokenParsed?.sub || ""
                  );
                  snackbar?.openSnackbar(`✅ Copied value to clipboard`);
                }}
              >
                <ListItemText
                  primary="Identity"
                  secondary={keycloak.tokenParsed?.sub}
                />
              </MenuItem>
              <MenuItem disabled>
                <ListItemText
                  primary="Signed in (24h format)"
                  secondary={
                    keycloak.tokenParsed?.iat &&
                    Intl.DateTimeFormat("en-AU", {
                      timeStyle: "short",
                      dateStyle: "medium",
                      hour12: false,
                    }).format(keycloak.tokenParsed?.iat * 1000)
                  }
                />
              </MenuItem>
              <MenuItem disabled>
                <ListItemText
                  primary="Session expiry (24h format)"
                  secondary={
                    keycloak.tokenParsed?.exp &&
                    Intl.DateTimeFormat("en-AU", {
                      timeStyle: "short",
                      dateStyle: "medium",
                      hour12: false,
                    }).format(keycloak.tokenParsed?.exp * 1000)
                  }
                />
              </MenuItem>
              <Divider />
              <MenuItem>
                <ListItemText
                  primary="Roles"
                  secondary={roles?.sort().join(" | ")}
                />
              </MenuItem>
              <Divider />
              <MenuItem
                onClick={() => {
                  localStorage.removeItem("client_id");
                  keycloak.logout();
                }}
              >
                <ListItemIcon>
                  <ExitToAppIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Sign out</ListItemText>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      )}
    </>
  );
}
