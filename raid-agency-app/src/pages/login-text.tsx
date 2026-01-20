import { useKeycloak } from '@/contexts/keycloak-context';
import { Button, Box, Typography, Paper } from '@mui/material';

export function LoginTest() {
  const { isInitialized, authenticated, user, login, logout } = useKeycloak();

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  const handleLogin = () => {
    console.log('Triggering login...');
    login();
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 200px)',
        bgcolor: '#f5f5f5',
        p: 2,
      }}
    >
      <Paper sx={{ p: 4, maxWidth: 600, width: '100%' }}>
        <Typography variant="h4" gutterBottom>
          Keycloak Authentication Test
        </Typography>
        
        <Box sx={{ mt: 3 }}>
          {authenticated ? (
            <>
              <Typography variant="h6" color="success.main" gutterBottom>
                ✅ Authenticated!
              </Typography>
              <Box sx={{ mt: 2, mb: 2 }}>
                <Typography variant="body1">
                  <strong>Username:</strong> {user?.username || 'N/A'}
                </Typography>
                <Typography variant="body1">
                  <strong>Email:</strong> {user?.email || 'N/A'}
                </Typography>
                <Typography variant="body1">
                  <strong>Name:</strong> {user?.firstName} {user?.lastName}
                </Typography>
                <Typography variant="body1">
                  <strong>Roles:</strong> {user?.roles?.join(', ') || 'None'}
                </Typography>
              </Box>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Typography variant="h6" color="error.main" gutterBottom>
                ❌ Not authenticated
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Click the button below to login with Keycloak. You will be redirected to the custom RAiD login page with Google, AAF, and ORCID options.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleLogin}
                size="large"
              >
                Login with Keycloak
              </Button>
            </>
          )}
        </Box>
      </Paper>
    </Box>
  );
}