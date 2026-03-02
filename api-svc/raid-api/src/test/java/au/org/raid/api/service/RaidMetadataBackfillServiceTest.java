package au.org.raid.api.service;

import au.org.raid.api.repository.RaidRepository;
import au.org.raid.db.jooq.enums.Metaschema;
import au.org.raid.db.jooq.tables.records.RaidRecord;
import au.org.raid.idl.raidv2.model.Id;
import au.org.raid.idl.raidv2.model.RaidDto;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.jooq.JSONB;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class RaidMetadataBackfillServiceTest {
    @Mock
    RaidRepository raidRepository;
    @Mock
    RaidHistoryService raidHistoryService;
    @Spy
    ObjectMapper objectMapper = new ObjectMapper()
            .registerModule(new JavaTimeModule())
            .setDateFormat(new SimpleDateFormat("yyyy-MM-dd"))
            .setSerializationInclusion(JsonInclude.Include.NON_NULL);
    @InjectMocks
    RaidMetadataBackfillService backfillService;

    @Test
    @DisplayName("run() backfills metadata for v2 raids with no valid materialised state")
    void backfillsRaidWithoutMaterialisedMetadata() throws Exception {
        final var handle = "10.26193/ABC123";
        final var record = new RaidRecord()
                .setHandle(handle)
                .setMetadataSchema(Metaschema.raido_metadata_schema_v2)
                .setMetadata(JSONB.valueOf("{}"));

        final var raidDto = new RaidDto().identifier(new Id().id("https://raid.org/" + handle));

        when(raidRepository.findAllV2()).thenReturn(List.of(record));
        when(raidHistoryService.findByHandle(handle)).thenReturn(Optional.of(raidDto));

        backfillService.run(null);

        verify(raidRepository).updateMetadata(eq(handle), anyString());
    }

    @Test
    @DisplayName("run() skips raids that already have valid materialised metadata")
    void skipsRaidWithValidMaterialisedMetadata() throws Exception {
        final var handle = "10.26193/ALREADY";
        final var raidDto = new RaidDto().identifier(new Id().id("https://raid.org/" + handle));
        final var existingJson = objectMapper.writeValueAsString(raidDto);

        final var record = new RaidRecord()
                .setHandle(handle)
                .setMetadataSchema(Metaschema.raido_metadata_schema_v2)
                .setMetadata(JSONB.valueOf(existingJson));

        when(raidRepository.findAllV2()).thenReturn(List.of(record));

        backfillService.run(null);

        verify(raidRepository, never()).updateMetadata(anyString(), anyString());
        verifyNoInteractions(raidHistoryService);
    }

    @Test
    @DisplayName("run() skips raids where history reconstruction fails")
    void skipsRaidWhereHistoryReconstructionFails() {
        final var handle = "10.26193/MISSING";
        final var record = new RaidRecord()
                .setHandle(handle)
                .setMetadataSchema(Metaschema.raido_metadata_schema_v2)
                .setMetadata(null);

        when(raidRepository.findAllV2()).thenReturn(List.of(record));
        when(raidHistoryService.findByHandle(handle)).thenReturn(Optional.empty());

        backfillService.run(null);

        verify(raidRepository, never()).updateMetadata(anyString(), anyString());
    }

    @Test
    @DisplayName("run() processes multiple raids, backfilling only those that need it")
    void processesMixedRaids() throws Exception {
        final var handleToBackfill = "10.26193/NEEDS_BACKFILL";
        final var handleAlreadyDone = "10.26193/ALREADY_DONE";

        final var raidDto = new RaidDto().identifier(new Id().id("https://raid.org/" + handleAlreadyDone));
        final var existingJson = objectMapper.writeValueAsString(raidDto);

        final var recordToBackfill = new RaidRecord()
                .setHandle(handleToBackfill)
                .setMetadataSchema(Metaschema.raido_metadata_schema_v2)
                .setMetadata(JSONB.valueOf("{}"));

        final var recordAlreadyDone = new RaidRecord()
                .setHandle(handleAlreadyDone)
                .setMetadataSchema(Metaschema.raido_metadata_schema_v2)
                .setMetadata(JSONB.valueOf(existingJson));

        final var backfilledDto = new RaidDto().identifier(new Id().id("https://raid.org/" + handleToBackfill));

        when(raidRepository.findAllV2()).thenReturn(List.of(recordToBackfill, recordAlreadyDone));
        when(raidHistoryService.findByHandle(handleToBackfill)).thenReturn(Optional.of(backfilledDto));

        backfillService.run(null);

        verify(raidRepository).updateMetadata(eq(handleToBackfill), anyString());
        verify(raidRepository, never()).updateMetadata(eq(handleAlreadyDone), anyString());
    }
}
