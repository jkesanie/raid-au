import {
  Code as CodeIcon,
  Google as GoogleIcon,
  HelpOutline as HelpOutlineIcon,
} from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Container,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Australia } from "./icons/Australia";
import { Orcid } from "./icons/Orcid";
import { useKeycloak } from "@/contexts/keycloak-context";

export const Login = () => {
  const { authenticated, isInitialized, login } = useKeycloak();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  if (isInitialized && authenticated) {
    setTimeout(() => navigate("/"), 0);
  }

  const handleLogin = (idpHint?: string) => {
    login({
      idpHint,
      scope: "openid",
      redirectUri: window.location.origin + from,
    });
  };

  const raidLinkButton = (
    <Link to="/about-raid">
      <Button variant="text" size="small" sx={{ minWidth: 0 }}>
        RAiD
      </Button>
    </Link>
  );

  const ardcLinkButton = (
    <Button
      href="https://ardc.edu.au/"
      target="_blank"
      variant="text"
      size="small"
      sx={{ minWidth: 0 }}
    >
      ARDC
    </Button>
  );

  return (
    <Stack gap={2}>
      <Container maxWidth="md">
        <Card>
          <CardHeader
            title="ARDC Research Activity Identifier (RAiD)"
            action={
              <Chip
                size="small"
                label={import.meta.env.VITE_RAIDO_ENV.toUpperCase()}
                color="error"
              />
            }
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              This is the Oceania region implementation of the {raidLinkButton}{" "}
              ISO standard.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Maintained by the {ardcLinkButton}.
            </Typography>
          </CardContent>
          <CardActions>
            <NavLink to={"/privacy"}>
              <Button size="small">Privacy Statement</Button>
            </NavLink>
            <NavLink to={"/terms"}>
              <Button size="small">Usage Terms</Button>
            </NavLink>
          </CardActions>
        </Card>
      </Container>
      {localStorage.getItem("client_id") && (
        <Container maxWidth="md">
          <Card>
            <CardHeader
              title="Previous client"
              subheader="Manage your previously selected client"
            />
            <CardContent>
              <Chip
                label={localStorage.getItem("client_id")}
                onDelete={() => {
                  localStorage.removeItem("client_id");
                  navigate("/login");
                }}
              />
            </CardContent>
          </Card>
        </Container>
      )}

      <Container maxWidth="md">
        <Card>
          <CardHeader
            title="RAiD Sign-in"
            subheader="Please select your preferred sign-in method"
            action={
              <Tooltip
                title={`You can sign in either directly with your personal Google or ORCID account, or via the AAF if your organisation has an agreement. Once you've signed in and authenticated yourself, you will be able to submit a request for a specific institution to authorize your usage of the RAiD app with their data.`}
              >
                <HelpOutlineIcon sx={{ cursor: "help" }} />
              </Tooltip>
            }
          />
          <CardContent>
            <Stack direction="row" gap={2} justifyContent="center">
              <Button
                startIcon={<GoogleIcon />}
                variant="contained"
                onClick={() => handleLogin("google")}
              >
                Google
              </Button>
              <Button
                startIcon={<Australia />}
                variant="contained"
                onClick={() => handleLogin("aaf-saml")}
              >
                AAF
              </Button>
              <Button
                startIcon={<Orcid />}
                variant="contained"
                onClick={() => handleLogin("orcid")}
              >
                ORCID
              </Button>
              <Button
                sx={{ position: "fixed", bottom: 0, right: 0, opacity: 0.25 }}
                data-testid="login-button"
                startIcon={<CodeIcon />}
                variant="contained"
                onClick={() => handleLogin()}
              >
                DEV
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Stack>
  );
};
