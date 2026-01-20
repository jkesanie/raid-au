// Remove or comment out your custom login page route
// Instead, use Keycloak's login

import { useKeycloak } from '@react-keycloak/web';
import React from 'react';

export default function KeyCloakLogin() {
  const { keycloak } = useKeycloak();

  React.useEffect(() => {
    // Redirect to Keycloak login automatically
    if (!keycloak.authenticated) {
      keycloak.login();
    }
  }, [keycloak]);

  // Rest of your app
}