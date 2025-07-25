package au.org.raid.api.service;

import au.org.raid.api.dto.ContributorLookupResponse;
import au.org.raid.api.dto.ContributorStatus;
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

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.nullValue;
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
    private static final String TEST_ORCID = "https://orcid.org/0000-0000-0000-0000";

    @Test
    @DisplayName("Should update contributor with ORCID ID when authenticated")
    void whenContributorIsAuthenticated_thenUpdateWithOrcidId() {
        // Arrange
        Contributor contributor = new Contributor().id(TEST_ORCID);

        final var raidName = "raid-name";
        ContributorLookupResponse lookupResponse = ContributorLookupResponse.builder()
                .status("AUTHENTICATED")
                .orcid(TEST_ORCID)
                .name("Contributor Name")
                .build();

        final var message = RaidListenerMessage.builder()
                .raidName(raidName)
                .contributor(contributor)
                .build();

        when(raidListenerMessageFactory.create(TEST_HANDLE, contributor)).thenReturn(message);
        when(orcidIntegrationClient.findByOrcid(TEST_ORCID)).thenReturn(Optional.of(lookupResponse));
        // Act
        raidListenerService.createOrUpdate(TEST_HANDLE, List.of(contributor));

        verify(orcidIntegrationClient, times(1)).post(message);

        assertThat(contributor.getId(), is(TEST_ORCID));
        assertThat(contributor.getStatus(), is("AUTHENTICATED"));
    }

    @Test
    @DisplayName("Should post message when contributor is not authenticated")
    void whenContributorIsNotAuthenticated_thenPostMessage() {
        // Arrange
        Contributor contributor = new Contributor();
        final var raidName = "raid-name";
        final var message = RaidListenerMessage.builder()
                .raidName(raidName)
                .contributor(contributor)
                .build();

        final var lookupResponse = ContributorLookupResponse.builder()
                .status("AWAITING_AUTHENTICATION")
                .build();

        when(raidListenerMessageFactory.create(TEST_HANDLE, contributor)).thenReturn(message);

        // Act
        raidListenerService.createOrUpdate(TEST_HANDLE, List.of(contributor));

        // Assert
        verify(orcidIntegrationClient, times(1)).post(message);

        assert contributor.getId() == null;
        assert contributor.getStatus().equals("AWAITING_AUTHENTICATION");
        assert contributor.getEmail() == null;
    }

    @Test
    @DisplayName("Should create new contributor and post message when contributor not found")
    void whenContributorNotFound_thenCreateNewAndPostMessage() {
        // Arrange

        final var raidName = "raid-name";
        Contributor contributor = new Contributor();
        final var message = RaidListenerMessage.builder()
                .raidName(raidName)
                .contributor(contributor)
                .build();
        when(raidListenerMessageFactory.create(TEST_HANDLE, contributor)).thenReturn(message);

        // Act
        raidListenerService.createOrUpdate(TEST_HANDLE, List.of(contributor));

        // Assert
        verify(orcidIntegrationClient, times(1)).post(message);

        assertThat(contributor.getId(), is(nullValue()));
        assertThat(contributor.getUuid(), is(nullValue()));
        assertThat(contributor.getStatus(), is(ContributorStatus.AWAITING_AUTHENTICATION.name()));
        assertThat(contributor.getEmail(), is(nullValue()));
    }

    @Test
    @DisplayName("Should process all contributors with different authentication states")
    void whenMultipleContributors_thenProcessAll() {
        final var orcid = "https://orcid.org/0000-0000-0000-0001";
        // Arrange
        Contributor contributor1 = new Contributor().id(TEST_ORCID);
        Contributor contributor2 = new Contributor().id(orcid);
        final var raidName = "raid-name";
        final var message = RaidListenerMessage.builder()
                .raidName(raidName)
                .contributor(contributor2)
                .build();

        ContributorLookupResponse lookupResponse1 = ContributorLookupResponse.builder()
                .status("AUTHENTICATED")
                .orcid(TEST_ORCID)
                .name("Contributor Name")
                .build();

        ContributorLookupResponse lookupResponse2 = ContributorLookupResponse.builder()
                .status("AWAITING_AUTHENTICATION")
                .orcid(orcid)
                .name("Contributor Name")
                .build();

        when(raidListenerMessageFactory.create(eq(TEST_HANDLE), any())).thenReturn(message);
        when(orcidIntegrationClient.findByOrcid(TEST_ORCID)).thenReturn(Optional.of(lookupResponse1));
        when(orcidIntegrationClient.findByOrcid(orcid)).thenReturn(Optional.of(lookupResponse2));

        // Act
        raidListenerService.createOrUpdate(TEST_HANDLE, List.of(contributor1, contributor2));

        // Assert
        verify(orcidIntegrationClient, times(2)).post(any());

        assertThat(contributor1.getId(), is(TEST_ORCID));
        assertThat(contributor2.getId(), is(orcid));
        assertThat(contributor2.getStatus(), is(ContributorStatus.AWAITING_AUTHENTICATION.name()));
    }
}