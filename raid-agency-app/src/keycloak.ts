import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:8001',  // Your Keycloak URL
  realm: 'raid',       // Replace with your actual realm name
  clientId: 'raid-api',     // Replace with your actual client ID
});

export default keycloak;