package au.org.raid.api.client.orcid;

import au.org.raid.api.dto.orcid.OrcidName;
import au.org.raid.api.dto.orcid.OrcidStringValue;
import au.org.raid.api.dto.orcid.PersonalDetails;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.Is.is;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class OrcidClientTest {
    @Mock
    private RestTemplate restTemplate;
    @Mock
    private OrcidRequestEntityFactory requestEntityFactory;
    @InjectMocks
    private OrcidClient orcidClient;

    @Test
    @DisplayName("Should fetch organisation with valid id")
    public void fetchPersonalDetails() {
        final var orcid = "https://orcid.org/0009-0002-5128-5184";
        final var personalDetails = new PersonalDetails();
        final var requestEntity = RequestEntity.get("").build();

        final var response = new ResponseEntity<>(personalDetails, HttpStatusCode.valueOf(200));

        when(requestEntityFactory.create(orcid)).thenReturn(requestEntity);

        when(restTemplate.exchange(requestEntity, PersonalDetails.class)).thenReturn(response);

        assertThat(orcidClient.getPersonalDetails(orcid), is(personalDetails));
    }


    @Test
    @DisplayName("Should fetch name with valid id")
    public void fetchName() {
        final var orcid = "https://orcid.org/0009-0002-5128-5184";
        final var givenNames = "_given-names";
        final var familyName = "_family-name";

        final var personalDetails = PersonalDetails.builder()
                .name(OrcidName.builder()
                        .givenNames(OrcidStringValue.builder().value(givenNames).build())
                        .familyName(OrcidStringValue.builder().value(familyName).build())
                        .build())
                .build();

        final var requestEntity = RequestEntity.get("").build();

        final var response = new ResponseEntity<>(personalDetails, HttpStatusCode.valueOf(200));

        when(requestEntityFactory.create(orcid)).thenReturn(requestEntity);

        when(restTemplate.exchange(requestEntity, PersonalDetails.class)).thenReturn(response);

        assertThat(orcidClient.getName(orcid), is("%s %s".formatted(givenNames, familyName)));
    }


}