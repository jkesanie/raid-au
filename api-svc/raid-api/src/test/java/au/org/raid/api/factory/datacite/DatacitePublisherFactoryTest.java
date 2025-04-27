package au.org.raid.api.factory.datacite;

import au.org.raid.idl.raidv2.model.Owner;
import au.org.raid.idl.raidv2.model.RegistrationAgencySchemaURIEnum;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;

class DatacitePublisherFactoryTest {
    private final DatacitePublisherFactory publisherFactory = new DatacitePublisherFactory();

    @Test
    @DisplayName("Create sets all fields")
    void create() {
        final var id = "_id";
        final var schemaUri = RegistrationAgencySchemaURIEnum.HTTPS_ROR_ORG_;

        final var owner = new Owner()
                .id(id)
                .schemaUri(schemaUri);

        final var result = publisherFactory.create(owner);

        assertThat(result.getSchemeUri(), is(schemaUri.getValue()));
        assertThat(result.getPublisherIdentifier(), is(id));
        assertThat(result.getName(), is(id));
        assertThat(result.getPublisherIdentifierScheme(), is("ROR"));
    }
}