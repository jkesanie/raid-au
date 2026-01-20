import "@/index.css";
import "@fontsource/figtree";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from './keycloak';
import { App } from "./App";
import { otherRoutes, raidPageRoutes, servicePointRoutes } from "./routes";
import { ErrorAlertComponent } from "./components/error-alert-component";
import { OrcidSuccess } from "./pages/orcid-success";
import { AppNavBar } from "./components/app-nav-bar";
import { ROUTES } from "./constants/routes";
import { LoginTest } from "./pages/login-text";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorAlertComponent error="An error occurred" />,
    children: [
      ...servicePointRoutes,
      ...raidPageRoutes,
      ...otherRoutes,
      {
        path: "*",
        element: <Navigate to="/" />,
      },
      {
        path: "/login-test",
        element: <LoginTest />,
      },
    ],
  },
  
  {
    path: ROUTES.ORCID_SUCCESS,
    element: (
      <>
        <AppNavBar authenticated={false} />
        <OrcidSuccess />
      </>
    ),
  }
]);

const keycloakInitConfig = {
  onLoad: 'check-sso' as const,
  checkLoginIframe: false,
  pkceMethod: 'S256' as const,
};

root.render(
  <ReactKeycloakProvider
    authClient={keycloak}
    initOptions={keycloakInitConfig}
    onTokens={(tokens) => {
      console.log('Keycloak tokens updated');
      if (tokens.token) {
        localStorage.setItem('keycloak-token', tokens.token);
      }
    }}
    onEvent={(event, error) => {
      console.log('Keycloak event:', event);
      if (error) {
        console.error('Keycloak error:', error);
      }
    }}
    LoadingComponent={
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.2rem',
        color: '#666'
      }}>
        Initializing authentication...
      </div>
    }
  >
    <RouterProvider router={router} />
  </ReactKeycloakProvider>
);
