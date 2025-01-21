package au.org.raid.inttest;

import au.org.raid.inttest.client.keycloak.KeycloakClient;
import au.org.raid.inttest.config.AuthConfig;
import au.org.raid.inttest.dto.keycloak.ActiveGroupRequest;
import au.org.raid.inttest.service.Handle;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;

public class PreReleaseTest extends AbstractIntegrationTest {

    @Autowired
    private AuthConfig authConfig;

    @Autowired
    private KeycloakClient keycloakClient;

    private String clientSecret;
    private String clientId;


    @Test
    @Disabled
    void readAllRaids() {
        final var clientId = authConfig.getIntegrationTestClient().getClientId();
        final var clientSecret = authConfig.getIntegrationTestClient().getClientSecret();

        final var token = tokenService.getClientToken(clientId, clientSecret);

        final var response = testClient.servicePointApi(token).findAllServicePoints();
        final var servicePoints = response.getBody();

        final var raidUserContext = userService.createUser("raid-au", "raid-admin");

        for (final var servicePoint : servicePoints) {
            final var groupId = servicePoint.getGroupId();
            if (groupId != null) {

                final var activeGroupRequest = new ActiveGroupRequest();
                activeGroupRequest.setActiveGroupId(groupId);

                try {
                    keycloakClient.keycloakApi(raidUserContext.getToken()).setActiveGroup(activeGroupRequest);

                    final var raidUserToken = tokenService.getUserToken(raidUserContext.getUsername(), raidUserContext.getPassword());

                    final var raidApi = testClient.raidApi(raidUserToken);

                    final var listRaidsResponse = raidApi.findAllRaids(null, null, null);


                    for (final var raid : listRaidsResponse.getBody()) {
                        final var handle = new Handle(raid.getIdentifier().getId());

                        final var raidResponse = raidApi.findRaidByName(handle.getPrefix(), handle.getSuffix());
                        assertThat(raidResponse.getStatusCode(), is(HttpStatusCode.valueOf(200)));

                        //TODO: Update raid

                    }

                } finally {
//                    userService.deleteUser(raidUserContext.getId());
                }
            }
        }
    }
}
