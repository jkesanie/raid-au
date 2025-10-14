package au.org.raid.api.client.orcid;

import au.org.raid.api.dto.orcid.PersonalDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
@RequiredArgsConstructor
public class OrcidClient {
    private final RequestEntityFactory requestEntityFactory;
    private final RestTemplate restTemplate;

    public PersonalDetails getPersonalDetails(final String orcid) {
        final var request = requestEntityFactory.create(orcid);

        final var response = restTemplate.exchange(request, PersonalDetails.class);

        return response.getBody();
    }

    @Cacheable(value="orcid-name-cache", key="{#orcid}")
    public String getName(final String orcid) {
        final var personalDetails = getPersonalDetails(orcid);

        final var givenNames =  personalDetails.getName().getGivenNames().getValue();
        final var familyName =  personalDetails.getName().getFamilyName().getValue();

        return "%s %s".formatted(givenNames, familyName);
    }
}
