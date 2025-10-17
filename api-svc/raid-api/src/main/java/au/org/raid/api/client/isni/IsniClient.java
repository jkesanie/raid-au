package au.org.raid.api.client.isni;

import au.org.raid.api.client.isni.dto.PersonalName;
import au.org.raid.api.client.isni.dto.ResponseRecord;
import au.org.raid.api.dto.isni.SearchRetrieveResponse;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.w3c.dom.Element;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class IsniClient {
    private final RestTemplate restTemplate;
    private final IsniRequestEntityFactory requestEntityFactory;

    public SearchRetrieveResponse search(final String isni) {
        final var request = requestEntityFactory.create(isni);

        final var responseEntity = restTemplate.exchange(request, SearchRetrieveResponse.class);

        return  responseEntity.getBody();
    }

    @Cacheable(value="isni-name-cache", key="{#isni}")
    public String getName(final String isni) {
        final var result = search(isni);

        if (result.getNumberOfRecords() > 0) {
            final var record = result.getFirstRecord();

            final var personalNames = record.getISNIAssigned()
                    .getISNIMetadata()
                    .getIdentity()
                    .getPersonOrFiction()
                    .getPersonalName();

            if (personalNames == null || personalNames.isEmpty()) {
                throw new RuntimeException("No name found for ISNI %s".formatted(isni));
            }

            return personalNames.stream()
                    .filter(personalName -> personalName.getNameUse().equalsIgnoreCase("legal") || personalName.getNameUse().equalsIgnoreCase("public"))
                    .findFirst()
                    .map(this::getFullName)
                    .orElseThrow(() -> new RuntimeException("No name found for ISNI %s".formatted(isni)));
        } else {
            throw new RuntimeException("ISNI not found %s".formatted(isni));
        }
    }

    private String getFullName(final PersonalName personalName) {
        final var givenName = ((Element)personalName.getForename()).getTextContent();
        final var familyName = ((Element)personalName.getSurname()).getTextContent();

        return "%s %s".formatted(givenName, familyName);
    }

    @Cacheable(value="valid-isni", key="{#isni}")
    public boolean exists(@NotNull String isni) {
        final var result = this.search(isni);
        return result.getNumberOfRecords() > 0;
    }
}
