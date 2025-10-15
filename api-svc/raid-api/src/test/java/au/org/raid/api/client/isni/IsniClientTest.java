package au.org.raid.api.client.isni;

import au.org.raid.api.client.isni.dto.ResponseRecord;
import au.org.raid.api.dto.isni.RecordData;
import au.org.raid.api.dto.isni.RecordWrapper;
import au.org.raid.api.dto.isni.Records;
import au.org.raid.api.dto.isni.SearchRetrieveResponse;
import jakarta.xml.bind.JAXBContext;
import jakarta.xml.bind.JAXBException;
import jakarta.xml.bind.Unmarshaller;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpMethod;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import javax.xml.transform.stream.StreamSource;
import java.io.File;
import java.net.URI;
import java.util.List;
import java.util.Optional;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.Is.is;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class IsniClientTest {
    @Mock
    private IsniRequestEntityFactory requestEntityFactory;
    @Mock
    private RestTemplate restTemplate;
    @InjectMocks
    private IsniClient isniClient;

    @Test
    @DisplayName("should return ISNI record given a valid ISNI")
    void shouldReturnResponseRecord() {
        final var isni = "https://isni.org/isni/0000000078519858";
        final var requestEntity = new RequestEntity<Void>(HttpMethod.GET, URI.create("https://localhost"));
        final var recordWrapper = new RecordWrapper();
        final var recordData = new RecordData();
        final var records = new Records();

        final var searchRetrieveResponse = new SearchRetrieveResponse();
        searchRetrieveResponse.setNumberOfRecords(1);
        final var responseRecord = new ResponseRecord();
        recordData.setResponseRecord(responseRecord);
        recordWrapper.setRecordData(recordData);
        records.setRecord(List.of(recordWrapper));

        searchRetrieveResponse.setRecords(records);
        final var responseEntity = ResponseEntity.of(Optional.of(searchRetrieveResponse));

        when(requestEntityFactory.create(isni)).thenReturn(requestEntity);
        when(restTemplate.exchange(requestEntity, SearchRetrieveResponse.class)).thenReturn(responseEntity);

        final var response = isniClient.getRecord(isni);

        assertThat(response.get(), is(responseRecord));
    }

    @Test
    @DisplayName("should return contributor name given a valid ISNI")
    void shouldReturnContributorName() throws Exception {
        final var isni = "https://isni.org/isni/0000000078519858";
        final var requestEntity = new RequestEntity<Void>(HttpMethod.GET, URI.create("https://localhost"));

        final var searchRetrieveResponse = getResponse();

        final var responseEntity = ResponseEntity.of(Optional.of(searchRetrieveResponse));

        when(requestEntityFactory.create(isni)).thenReturn(requestEntity);
        when(restTemplate.exchange(requestEntity, SearchRetrieveResponse.class)).thenReturn(responseEntity);

        final var name = isniClient.getName(isni);

        assertThat(name, is("Taylor Swift"));
    }

    private SearchRetrieveResponse getResponse() throws JAXBException {
        JAXBContext jaxbContext = JAXBContext.newInstance(SearchRetrieveResponse.class);

        // Create unmarshaller
        Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();

        final var root =
                unmarshaller.unmarshal(new StreamSource(new File(getClass().getResource("/fixtures/valid-isni.xml").getPath())), SearchRetrieveResponse.class);

        return root.getValue();
    }

}