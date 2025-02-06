package au.org.raid.api.service;

import au.org.raid.api.dto.ContributorLookupResponse;
import au.org.raid.api.dto.ContributorStatus;
import au.org.raid.api.dto.OrcidData;
import au.org.raid.api.dto.RaidListenerMessage;
import au.org.raid.api.factory.RaidListenerMessageFactory;
import au.org.raid.idl.raidv2.model.Contributor;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class RaidListenerServiceTest {

    @Mock
    private OrcidIntegrationClient orcidIntegrationClient;

    @Mock
    private RaidListenerMessageFactory raidListenerMessageFactory;

    @InjectMocks
    private RaidListenerService raidListenerService;

    private static final String TEST_HANDLE = "test-handle";
    private static final String TEST_EMAIL = "test@example.com";
    private static final String TEST_ORCID = "0000-0000-0000-0000";
    private static final String TEST_UUID = UUID.randomUUID().toString();

    @Test
    @DisplayName("Should update contributor with ORCID ID when authenticated")
    void whenContributorIsAuthenticated_thenUpdateWithOrcidId() {
        // Arrange
        Contributor contributor = new Contributor().email(TEST_EMAIL);

        final var raidName = "raid-name";
        ContributorLookupResponse lookupResponse = ContributorLookupResponse.builder()
                .orcidStatus("AUTHENTICATED")
                .uuid(TEST_UUID)
                .orcid(OrcidData.builder().orcid(TEST_ORCID).build())
                .build();

        final var message = RaidListenerMessage.builder()
                .raidName(raidName)
                .contributor(contributor)
                .build();

        when(orcidIntegrationClient.get(TEST_EMAIL)).thenReturn(Optional.of(lookupResponse));
        when(raidListenerMessageFactory.create(TEST_HANDLE, contributor)).thenReturn(message);

        // Act
        raidListenerService.createOrUpdate(TEST_HANDLE, List.of(contributor));

        // Assert
        verify(orcidIntegrationClient, times(1)).get(TEST_EMAIL);


        verify(orcidIntegrationClient, times(1)).post(message);

        assert contributor.getId().equals("https://orcid.org/" + TEST_ORCID);
        assert contributor.getUuid().equals(TEST_UUID);
        assert contributor.getStatus().equals("AUTHENTICATED");
        assert contributor.getEmail() == null;
    }

    @Test
    @DisplayName("Should post message when contributor is not authenticated")
    void whenContributorIsNotAuthenticated_thenPostMessage() {
        // Arrange
        Contributor contributor = new Contributor().email(TEST_EMAIL);
        final var raidName = "raid-name";
        final var message = RaidListenerMessage.builder()
                .raidName(raidName)
                .contributor(contributor)
                .build();

        final var lookupResponse = ContributorLookupResponse.builder()
                .orcidStatus("AWAITING_AUTHENTICATION")
                .uuid(TEST_UUID)
                .build();

        when(orcidIntegrationClient.get(TEST_EMAIL)).thenReturn(Optional.of(lookupResponse));
        when(raidListenerMessageFactory.create(TEST_HANDLE, contributor)).thenReturn(message);

        // Act
        raidListenerService.createOrUpdate(TEST_HANDLE, List.of(contributor));

        // Assert
        verify(orcidIntegrationClient, times(1)).get(TEST_EMAIL);
        verify(orcidIntegrationClient, times(1)).post(message);

        assert contributor.getId() == null;
        assert contributor.getUuid().equals(TEST_UUID);
        assert contributor.getStatus().equals("AWAITING_AUTHENTICATION");
        assert contributor.getEmail() == null;
    }

    @Test
    @DisplayName("Should create new contributor and post message when contributor not found")
    void whenContributorNotFound_thenCreateNewAndPostMessage() {
        // Arrange

        final var raidName = "raid-name";
        Contributor contributor = new Contributor().email(TEST_EMAIL);
        final var message = RaidListenerMessage.builder()
                .raidName(raidName)
                .contributor(contributor)
                .build();
        when(orcidIntegrationClient.get(TEST_EMAIL)).thenReturn(Optional.empty());
        when(raidListenerMessageFactory.create(TEST_HANDLE, contributor)).thenReturn(message);

        // Act
        raidListenerService.createOrUpdate(TEST_HANDLE, List.of(contributor));

        // Assert
        verify(orcidIntegrationClient, times(1)).get(TEST_EMAIL);
        verify(orcidIntegrationClient, times(1)).post(message);

        assert contributor.getId() == null;
        assert contributor.getUuid() != null;
        assert contributor.getStatus().equals(ContributorStatus.AWAITING_AUTHENTICATION.name());
        assert contributor.getEmail() == null;
    }

    @Test
    @DisplayName("Should process all contributors with different authentication states")
    void whenMultipleContributors_thenProcessAll() {
        // Arrange
        Contributor contributor1 = new Contributor().email("test1@example.com");
        Contributor contributor2 = new Contributor().email("test2@example.com");
        final var raidName = "raid-name";
        final var message = RaidListenerMessage.builder()
                .raidName(raidName)
                .contributor(contributor2)
                .build();

        ContributorLookupResponse lookupResponse1 = ContributorLookupResponse.builder()
                .orcidStatus("AUTHENTICATED")
                .uuid(UUID.randomUUID().toString())
                .orcid(OrcidData.builder().orcid(TEST_ORCID).build())
                .build();

        when(orcidIntegrationClient.get("test1@example.com")).thenReturn(Optional.of(lookupResponse1));
        when(orcidIntegrationClient.get("test2@example.com")).thenReturn(Optional.empty());
        when(raidListenerMessageFactory.create(eq(TEST_HANDLE), any())).thenReturn(message);

        // Act
        raidListenerService.createOrUpdate(TEST_HANDLE, List.of(contributor1, contributor2));

        // Assert
        verify(orcidIntegrationClient, times(1)).get("test1@example.com");
        verify(orcidIntegrationClient, times(1)).get("test2@example.com");
        verify(orcidIntegrationClient, times(2)).post(any());

        assert contributor1.getId().equals("https://orcid.org/" + TEST_ORCID);
        assert contributor2.getId() == null;
        assert contributor2.getStatus().equals(ContributorStatus.AWAITING_AUTHENTICATION.name());
    }
}