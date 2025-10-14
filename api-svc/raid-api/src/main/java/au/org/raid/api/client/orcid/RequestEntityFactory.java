package au.org.raid.api.client.orcid;

import au.org.raid.api.config.properties.OrcidClientProperties;
import au.org.raid.api.config.properties.RorClientProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.stereotype.Component;

import java.net.URI;

@Component
@RequiredArgsConstructor
public class RequestEntityFactory {
    private final OrcidClientProperties properties;

    public RequestEntity<Void> create(final String orcid) {
        final var id = orcid.substring(orcid.lastIndexOf("/") + 1);

        return RequestEntity.method(HttpMethod.GET, URI.create(properties.getBaseUrl() + id + "/personal-details"))
                .header("Authorization", "Bearer %s".formatted(properties.getAccessToken()))
                .build();
    }
}
