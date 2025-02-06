package au.org.raid.api.service;

import au.org.raid.api.dto.ContributorStatus;
import au.org.raid.api.factory.RaidListenerMessageFactory;
import au.org.raid.idl.raidv2.model.Contributor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@Slf4j
@Component
@RequiredArgsConstructor
public class RaidListenerService {
    private final OrcidIntegrationClient orcidIntegrationClient;
    private final RaidListenerMessageFactory raidListenerMessageFactory;

    public void createOrUpdate(final String handle, final List<Contributor> contributors) {

        for (final var contributor : contributors) {
            if (contributor.getEmail() != null) {
                log.debug("Looking up contributor by email {}", contributor.getEmail());

                final var response = orcidIntegrationClient.get(contributor.getEmail());

                if (response.isPresent()) {

                    final var lookupResponse = response.get();

                    log.debug("Received look up response: {uuid: {}, status: {}", lookupResponse.getUuid(), lookupResponse.getOrcidStatus());

                    if (lookupResponse.getOrcidStatus().equalsIgnoreCase("AUTHENTICATED")) {
                        contributor.uuid(lookupResponse.getUuid())
                                .status(lookupResponse.getOrcidStatus())
                                .id("https://orcid.org/%s".formatted(lookupResponse.getOrcid().getOrcid()));
                    } else {
                        contributor.uuid(lookupResponse.getUuid())
                                .status(lookupResponse.getOrcidStatus());
                    }
                } else {
                    contributor.uuid(UUID.randomUUID().toString())
                            .status(ContributorStatus.AWAITING_AUTHENTICATION.name())
                            .id(null);
                }

                final var message = raidListenerMessageFactory.create(
                        handle,
                        contributor
                );
                orcidIntegrationClient.post(message);

                contributor.email(null);
            }
        }
    }
}
