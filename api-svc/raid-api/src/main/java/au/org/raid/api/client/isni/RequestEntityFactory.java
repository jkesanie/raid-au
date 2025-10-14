package au.org.raid.api.client.isni;

import au.org.raid.api.config.properties.IsniClientProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpMethod;
import org.springframework.http.RequestEntity;
import org.springframework.stereotype.Component;

import java.net.URI;

@Component
@RequiredArgsConstructor
public class RequestEntityFactory {
    private final IsniClientProperties properties;

    public RequestEntity<Void> create(final String isni) {
        final var id = isni.substring(isni.lastIndexOf("/") + 1);

        return RequestEntity.method(HttpMethod.GET, URI.create(properties.getUrlFormat().formatted(id)))
                .build();
    }
}
