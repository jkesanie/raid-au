package au.org.raid.api.service;

import au.org.raid.api.dto.ContributorStatus;
import au.org.raid.api.factory.RaidListenerMessageFactory;
import au.org.raid.idl.raidv2.model.Contributor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class RaidListenerService {
    private final OrcidIntegrationClient orcidIntegrationClient;
    private final RaidListenerMessageFactory raidListenerMessageFactory;

    public void createOrUpdate(final String handle, final List<Contributor> contributors) {

        for (final var contributor : contributors) {
            if (contributor.getEmail() != null) {
                final var response = orcidIntegrationClient.get(contributor.getEmail());

                if (response.isPresent()) {
                    final var lookupResponse = response.get();

                    if (lookupResponse.getOrcidStatus().equalsIgnoreCase("AUTHENTICATED")) {
                        contributor.uuid(lookupResponse.getUuid())
                                .status(lookupResponse.getOrcidStatus())
                                .id("https://orcid.org/%s".formatted(lookupResponse.getOrcidData().getOrcid()));

                        contributor.setEmail(null);
                    } else {
                        contributor.uuid(lookupResponse.getUuid())
                                .status(lookupResponse.getOrcidStatus())
                                .id(null);

                        final var message = raidListenerMessageFactory.create(
                                handle,
                                contributor
                        );
                        orcidIntegrationClient.post(message);

                        contributor.setEmail(null);
                    }
                } else {
                    contributor.uuid(UUID.randomUUID().toString())
                            .status(ContributorStatus.AWAITING_AUTHENTICATION.name())
                            .id(null);
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
}
