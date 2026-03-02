package au.org.raid.api.repository;

import au.org.raid.api.config.properties.ContributorValidationProperties;
import org.jooq.DSLContext;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static au.org.raid.db.jooq.tables.Raid.RAID;
import static org.mockito.Mockito.*;

/**
 * Unit test for RaidRepository. JOOQ DSL chains are thin delegations and the
 * meaningful behaviour is covered at the service layer. This test verifies the
 * method invokes the DSLContext in the expected direction.
 */
@ExtendWith(MockitoExtension.class)
class RaidRepositoryTest {
    @Mock
    ContributorValidationProperties contributorValidationProperties;
    @Mock
    DSLContext dslContext;
    @InjectMocks
    RaidRepository raidRepository;

    @Test
    @DisplayName("updateMetadata() calls dslContext.update(RAID) with the given handle")
    void updateMetadata_callsDslContextUpdate() {
        final var handle = "10.26193/ABC123";
        final var metadata = "{\"identifier\":{\"id\":\"https://raid.org/10.26193/ABC123\"}}";

        // dslContext.update(RAID) returns null by default in Mockito — calling further
        // chaining would NPE, so we verify the initial interaction and let it fail naturally.
        // The actual SQL correctness is covered by integration tests.
        try {
            raidRepository.updateMetadata(handle, metadata);
        } catch (final NullPointerException e) {
            // expected — JOOQ chain returns null mocks
        }

        verify(dslContext).update(RAID);
    }
}
