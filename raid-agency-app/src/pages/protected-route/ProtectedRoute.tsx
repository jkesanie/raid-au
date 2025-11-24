import Banner from "@/components/alert-notifications/banner/Banner";
import { AppNavBar } from "@/components/app-nav-bar";
import { useKeycloak } from "@/contexts/keycloak-context";
import { Loading } from "@/pages/loading";
import { Box, Container } from "@mui/material";
import { memo } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

/**
 * Protected route component for authentication-gated content
 * 
 * Ensures routes require authentication before access. Redirects to login
 * when unauthenticated and preserves the attempted URL for post-login redirect.
 * Shows loading state during authentication initialization.
 * 
 * @returns {JSX.Element} Authenticated content, loading indicator, or redirect to login
 */
export const ProtectedRoute = memo(() => {
  const { isInitialized, authenticated } = useKeycloak();
  const location = useLocation();
  const isProduction = import.meta.env.VITE_RAIDO_ENV === 'prod';

  if (!isInitialized) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  return authenticated ? (
    <>
      <AppNavBar authenticated={true} />
      {!isProduction && (
        <Banner
          variant="warning"
          message={
            <>
              This is not a production system. Australian and New Zealand organisations can{' '}
              <a href="https://documentation.ardc.edu.au/raid/request-a-raid-production-service-point" target="_blank" rel="noopener noreferrer">
                request access
              </a>
              {' '}to the production system.
            </>
          }
          dismissible={false}
        />
      )}
      <Box sx={{ height: "3em" }} />
      <Outlet />
    </>
  ) : (
    <Navigate
      to="/login"
      replace
      state={{ from: location.pathname + location.search }}
    />
  );
});

ProtectedRoute.displayName = "ProtectedRoute";
