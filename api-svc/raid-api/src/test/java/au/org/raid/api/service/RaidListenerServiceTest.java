package au.org.raid.api.service;

import au.org.raid.api.dto.ContributorLookupResponse;
import au.org.raid.api.dto.ContributorStatus;
import au.org.raid.api.dto.RaidListenerMessage;
import au.org.raid.api.factory.RaidListenerMessageFactory;
import au.org.raid.idl.raidv2.model.*;
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
    private static final String TEST_ROR = "https://ror.org/";

    @Test
    @DisplayName("Should update contributor status with response from contributor look up")
    void whenContributorIsAuthenticated_thenUpdateWithOrcidId() {

        final Id id = new Id()
                .id(TEST_HANDLE)
                .owner(new Owner().id(TEST_ROR));

        final Contributor contributor = new Contributor().id(TEST_ORCID);

        final List<Title> titles = List.of(new Title().text("test title"));

        final var message = RaidListenerMessage.builder()
                .identifier(id)
                .contributor(contributor)
                .title(titles)
                .build();

        final var raid = new RaidCreateRequest()
                .identifier(id)
                .title(titles)
                .contributor(List.of(contributor));

        when(raidListenerMessageFactory.create(id, contributor, titles)).thenReturn(message);

        final ContributorLookupResponse lookupResponse = ContributorLookupResponse.builder()
                .status("AUTHENTICATED")
                .orcid(TEST_ORCID)
                .name("Contributor Name")
                .build();

        when(orcidIntegrationClient.findByOrcid(TEST_ORCID)).thenReturn(Optional.of(lookupResponse));
        // Act
        raidListenerService.createOrUpdate(raid);

        verify(orcidIntegrationClient, times(1)).post(message);

        assertThat(contributor.getId(), is(TEST_ORCID));
        assertThat(contributor.getStatus(), is("AUTHENTICATED"));
    }

    @Test
    @DisplayName("Should set contributor status to 'AWAITING_AUTHENTICATION' if contributor look up not found")
    void whenContributorIsNotAuthenticated_thenPostMessage() {
        final Id id = new Id()
                .id(TEST_HANDLE)
                .owner(new Owner().id(TEST_ROR));

        final Contributor contributor = new Contributor().id(TEST_ORCID);

        final List<Title> titles = List.of(new Title().text("test title"));

        final var message = RaidListenerMessage.builder()
                .identifier(id)
                .contributor(contributor)
                .title(titles)
                .build();

        when(raidListenerMessageFactory.create(id, contributor, titles)).thenReturn(message);

        final var lookupResponse = ContributorLookupResponse.builder()
                .status("AWAITING_AUTHENTICATION")
                .build();

        when(orcidIntegrationClient.findByOrcid(TEST_ORCID)).thenReturn(Optional.empty());

        final var raid = new RaidUpdateRequest()
                .identifier(id)
                .title(titles)
                .contributor(List.of(contributor));

        raidListenerService.createOrUpdate(raid);

        verify(orcidIntegrationClient, times(1)).post(message);

        assertThat(contributor.getId(), is(TEST_ORCID));
        assertThat(contributor.getStatus(), is("AWAITING_AUTHENTICATION"));
    }


}