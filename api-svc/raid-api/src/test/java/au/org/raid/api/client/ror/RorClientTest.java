package au.org.raid.api.client.ror;

import au.org.raid.api.client.ror.dto.RorSchemaV21;
import au.org.raid.api.config.properties.RorClientProperties;
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
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class RorClientTest {
    @Mock
    private RestTemplate restTemplate;
    @Mock
    private RequestEntityFactory requestEntityFactory;
    @InjectMocks
    private RorClient rorClient;


    @Test
    @DisplayName("Should fetch organisation with valid id")
    public void fetchOrganisation() {
        final var ror = "https://ror.org/038sjwq14";
        final var organisation = new RorSchemaV21();
        final var requestEntity = RequestEntity.get("").build();

        final var response = new ResponseEntity<>(organisation, HttpStatusCode.valueOf(200));

        when(requestEntityFactory.create(ror)).thenReturn(requestEntity);

        when(restTemplate.exchange(requestEntity, RorSchemaV21.class)).thenReturn(response);

        assertThat(rorClient.getOrganisation(ror), is(organisation));
    }

}