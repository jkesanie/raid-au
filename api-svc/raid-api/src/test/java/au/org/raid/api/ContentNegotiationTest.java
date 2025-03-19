package au.org.raid.api;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.*;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("dev")
public class ContentNegotiationTest {

    @LocalServerPort
    private int port;

    private final TestRestTemplate restTemplate = new TestRestTemplate();

    /**
     * Test that the API can return Turtle format when requested.
     */
    @Test
    public void testTurtleFormat() {
        // Set up headers
        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.ACCEPT, "text/turtle");

        HttpEntity<String> entity = new HttpEntity<>(headers);

        // Make request
        ResponseEntity<String> response = restTemplate.exchange(
                createURLWithPort("/raid/10378.1/1696639"),
                HttpMethod.GET, entity, String.class);

        // Assert response
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getHeaders().getContentType().toString()).isEqualTo("text/turtle");
        assertThat(response.getBody()).contains("https://raid.org.au/10378.1/1696639");
    }

    /**
     * Test that the API can return N-Triples format when requested.
     */
    @Test
    public void testNTriplesFormat() {
        // Set up headers
        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.ACCEPT, "application/n-triples");

        HttpEntity<String> entity = new HttpEntity<>(headers);

        // Make request
        ResponseEntity<String> response = restTemplate.exchange(
                createURLWithPort("/raid/10378.1/1696639"),
                HttpMethod.GET, entity, String.class);

        // Assert response
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getHeaders().getContentType().toString()).isEqualTo("application/n-triples");
        assertThat(response.getBody()).contains("https://raid.org.au/10378.1/1696639");
    }

    /**
     * Test that the API can return RDF/XML format when requested.
     */
    @Test
    public void testRdfXmlFormat() {
        // Set up headers
        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.ACCEPT, "application/rdf+xml");

        HttpEntity<String> entity = new HttpEntity<>(headers);

        // Make request
        ResponseEntity<String> response = restTemplate.exchange(
                createURLWithPort("/raid/10378.1/1696639"),
                HttpMethod.GET, entity, String.class);

        // Assert response
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getHeaders().getContentType().toString()).isEqualTo("application/rdf+xml");
        assertThat(response.getBody()).contains("https://raid.org.au/10378.1/1696639");
    }

    /**
     * Test that the API defaults to JSON when no specific Accept header is provided.
     */
    @Test
    public void testDefaultJsonFormat() {
        // Set up headers
        HttpHeaders headers = new HttpHeaders();

        HttpEntity<String> entity = new HttpEntity<>(headers);

        // Make request
        ResponseEntity<String> response = restTemplate.exchange(
                createURLWithPort("/raid/10378.1/1696639"),
                HttpMethod.GET, entity, String.class);

        // Assert response
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getHeaders().getContentType().toString()).isEqualTo("application/json");
        assertThat(response.getBody()).contains("https://raid.org.au/10378.1/1696639");
    }

    private String createURLWithPort(String uri) {
        return "http://localhost:" + port + uri;
    }
}