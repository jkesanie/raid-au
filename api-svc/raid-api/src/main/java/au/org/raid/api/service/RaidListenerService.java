package au.org.raid.api.service;

import au.org.raid.api.dto.ContributorStatus;
import au.org.raid.api.factory.RaidListenerMessageFactory;
import au.org.raid.idl.raidv2.model.Contributor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

import static org.apache.commons.lang3.StringUtils.isBlank;

@Slf4j
@Component
@RequiredArgsConstructor
public class RaidListenerService {
    private final OrcidIntegrationClient orcidIntegrationClient;
    private final RaidListenerMessageFactory raidListenerMessageFactory;

    public void createOrUpdate(final String handle, final List<Contributor> contributors) {
        for (final var contributor : contributors) {
            if (isBlank(contributor.getStatus()) || contributor.getStatus().equals("UNAUTHENTICATED")) {
                log.debug("Looking up contributor by id {}", contributor.getId());

                final var response = orcidIntegrationClient.findByOrcid(contributor.getId());

                if (response.isPresent()) {

                    final var lookupResponse = response.get();

                    log.debug("Received look up response: {orcid: {}, status: {}", lookupResponse.getOrcid(), lookupResponse.getStatus());

                    contributor.status(lookupResponse.getStatus());
                } else {
                    contributor.status(ContributorStatus.AWAITING_AUTHENTICATION.name());
                }
            }
            final var message = raidListenerMessageFactory.create(
                    handle,
                    contributor
            );
            orcidIntegrationClient.post(message);
        }
    }
}
