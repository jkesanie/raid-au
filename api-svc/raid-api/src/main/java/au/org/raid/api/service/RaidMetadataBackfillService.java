package au.org.raid.api.service;

import au.org.raid.api.repository.RaidRepository;
import au.org.raid.db.jooq.enums.Metaschema;
import au.org.raid.idl.raidv2.model.RaidDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class RaidMetadataBackfillService implements ApplicationRunner {
    private final RaidRepository raidRepository;
    private final RaidHistoryService raidHistoryService;
    private final ObjectMapper objectMapper;

    @Override
    @Transactional
    @SneakyThrows
    public void run(final ApplicationArguments args) {
        final var allV2Records = raidRepository.findAllV2();
        var backfilledCount = 0;
        var skippedCount = 0;

        log.info("Starting raid metadata backfill for {} v2 raids", allV2Records.size());

        for (final var record : allV2Records) {
            if (!Metaschema.raido_metadata_schema_v2.equals(record.getMetadataSchema())) {
                skippedCount++;
                continue;
            }

            if (hasValidMaterialisedMetadata(record.getMetadata() != null ? record.getMetadata().data() : null)) {
                skippedCount++;
                continue;
            }

            final var raidDtoOptional = raidHistoryService.findByHandle(record.getHandle());
            if (raidDtoOptional.isEmpty()) {
                log.warn("Could not reconstruct RaidDto for handle {}, skipping backfill", record.getHandle());
                skippedCount++;
                continue;
            }

            final var json = objectMapper.writeValueAsString(raidDtoOptional.get());
            raidRepository.updateMetadata(record.getHandle(), json);
            backfilledCount++;
        }

        log.info("Raid metadata backfill complete: {} backfilled, {} skipped", backfilledCount, skippedCount);
    }

    @SneakyThrows
    private boolean hasValidMaterialisedMetadata(final String metadataJson) {
        if (metadataJson == null || metadataJson.isBlank()) {
            return false;
        }
        try {
            final var raidDto = objectMapper.readValue(metadataJson, RaidDto.class);
            return raidDto.getIdentifier() != null;
        } catch (final Exception e) {
            return false;
        }
    }
}
