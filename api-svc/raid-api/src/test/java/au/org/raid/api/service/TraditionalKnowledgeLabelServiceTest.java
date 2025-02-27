package au.org.raid.api.service;

import au.org.raid.api.exception.TraditionalKnowledgeLabelNotFoundException;
import au.org.raid.api.exception.TraditionalKnowledgeLabelSchemaNotFoundException;
import au.org.raid.api.factory.TraditionalKnowledgeLabelFactory;
import au.org.raid.api.factory.record.RaidTraditionalKnowledgeLabelRecordFactory;
import au.org.raid.api.repository.RaidTraditionalKnowledgeLabelRepository;
import au.org.raid.api.repository.TraditionalKnowledgeLabelRepository;
import au.org.raid.api.repository.TraditionalKnowledgeLabelSchemaRepository;
import au.org.raid.db.jooq.tables.records.RaidTraditionalKnowledgeLabelRecord;
import au.org.raid.db.jooq.tables.records.TraditionalKnowledgeLabelRecord;
import au.org.raid.db.jooq.tables.records.TraditionalKnowledgeLabelSchemaRecord;
import au.org.raid.idl.raidv2.model.TraditionalKnowledgeLabel;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class TraditionalKnowledgeLabelServiceTest {
    @Mock
    private TraditionalKnowledgeLabelSchemaRepository traditionalKnowledgeLabelSchemaRepository;
    @Mock
    private TraditionalKnowledgeLabelRepository traditionalKnowledgeLabelRepository;
    @Mock
    private RaidTraditionalKnowledgeLabelRecordFactory raidTraditionalKnowledgeLabelRecordFactory;
    @Mock
    private RaidTraditionalKnowledgeLabelRepository raidTraditionalKnowledgeLabelRepository;
    @Mock
    private TraditionalKnowledgeLabelFactory traditionalKnowledgeLabelFactory;
    @InjectMocks
    private TraditionalKnowledgeLabelService traditionalKnowledgeLabelService;

    @Test
    @DisplayName("findAllByHandle returns all labels for raid")
    void findAllByHandle() {
        final var handle = "_handle";
        final var id = 123;
        final var uri = "_uri";
        final var schemaId = 234;
        final var schemaUri = "schema-uri";

        final var raidTraditionalKnowledgeLabelRecord = new RaidTraditionalKnowledgeLabelRecord()
                .setTraditionalKnowledgeLabelId(id)
                .setTraditionalKnowledgeLabelSchemaId(schemaId);

        final var record = new TraditionalKnowledgeLabelRecord()
                .setId(id)
                .setUri(uri);

        final var schemaRecord = new TraditionalKnowledgeLabelSchemaRecord()
                .setUri(schemaUri);

        final var label = new TraditionalKnowledgeLabel();

        when(raidTraditionalKnowledgeLabelRepository.findAllByHandle(handle))
                .thenReturn(List.of(raidTraditionalKnowledgeLabelRecord));

        when(traditionalKnowledgeLabelRepository.findById(id)).thenReturn(Optional.of(record));

        when(traditionalKnowledgeLabelSchemaRepository.findById(schemaId)).thenReturn(Optional.of(schemaRecord));

        when(traditionalKnowledgeLabelFactory.create(uri, schemaUri)).thenReturn(label);

        assertThat(traditionalKnowledgeLabelService.findAllByHandle(handle), is(List.of(label)));
    }

    @Test
    @DisplayName("findAllByHandle() does not look up label if id is null")
    void findAllByHandleDoesNotLookUpLabel() {
        final var handle = "_handle";
        final var schemaId = 234;
        final var schemaUri = "schema-uri";

        final var raidTraditionalKnowledgeLabelRecord = new RaidTraditionalKnowledgeLabelRecord()
                .setTraditionalKnowledgeLabelSchemaId(schemaId);

        final var schemaRecord = new TraditionalKnowledgeLabelSchemaRecord()
                .setUri(schemaUri);

        final var label = new TraditionalKnowledgeLabel();

        when(raidTraditionalKnowledgeLabelRepository.findAllByHandle(handle))
                .thenReturn(List.of(raidTraditionalKnowledgeLabelRecord));

        when(traditionalKnowledgeLabelSchemaRepository.findById(schemaId)).thenReturn(Optional.of(schemaRecord));

        when(traditionalKnowledgeLabelFactory.create(null, schemaUri)).thenReturn(label);

        assertThat(traditionalKnowledgeLabelService.findAllByHandle(handle), is(List.of(label)));

        verifyNoInteractions(traditionalKnowledgeLabelRepository);
    }

    @Test
    @DisplayName("findAllByHandle() throws TraditionalKnowledgeLabelNotFoundException")
    void findAllByHandleThrowsTraditionalKnowledgeLabelNotFoundException() {
        final var handle = "_handle";
        final var id = 123;
        final var schemaId = 234;

        final var raidTraditionalKnowledgeLabelRecord = new RaidTraditionalKnowledgeLabelRecord()
                .setTraditionalKnowledgeLabelId(id)
                .setTraditionalKnowledgeLabelSchemaId(schemaId);

        when(raidTraditionalKnowledgeLabelRepository.findAllByHandle(handle))
                .thenReturn(List.of(raidTraditionalKnowledgeLabelRecord));
        when(traditionalKnowledgeLabelRepository.findById(id)).thenReturn(Optional.empty());

        assertThrows(TraditionalKnowledgeLabelNotFoundException.class,
                () -> traditionalKnowledgeLabelService.findAllByHandle(handle));

        verifyNoInteractions(traditionalKnowledgeLabelSchemaRepository);
        verifyNoInteractions(traditionalKnowledgeLabelFactory);
    }

    @Test
    @DisplayName("findAllByHandle throws TraditionalKnowledgeLabelSchemaNotFoundException")
    void findAllByHandleThrowsTraditionalKnowledgeLabelSchemaNotFoundException() {
        final var handle = "_handle";
        final var id = 123;
        final var uri = "_uri";
        final var schemaId = 234;

        final var raidTraditionalKnowledgeLabelRecord = new RaidTraditionalKnowledgeLabelRecord()
                .setTraditionalKnowledgeLabelId(id)
                .setTraditionalKnowledgeLabelSchemaId(schemaId);

        final var record = new TraditionalKnowledgeLabelRecord()
                .setId(id)
                .setUri(uri);

        when(raidTraditionalKnowledgeLabelRepository.findAllByHandle(handle))
                .thenReturn(List.of(raidTraditionalKnowledgeLabelRecord));
        when(traditionalKnowledgeLabelRepository.findById(id)).thenReturn(Optional.of(record));
        when(traditionalKnowledgeLabelSchemaRepository.findById(schemaId)).thenReturn(Optional.empty());

        assertThrows(TraditionalKnowledgeLabelSchemaNotFoundException.class,
                () -> traditionalKnowledgeLabelService.findAllByHandle(handle));

        verifyNoInteractions(traditionalKnowledgeLabelFactory);
    }
}