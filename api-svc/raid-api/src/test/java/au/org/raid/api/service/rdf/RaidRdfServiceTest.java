package au.org.raid.api.service.rdf;

import au.org.raid.idl.raidv2.model.Description;
import au.org.raid.idl.raidv2.model.DescriptionType;
import au.org.raid.idl.raidv2.model.Id;
import au.org.raid.idl.raidv2.model.Language;
import au.org.raid.idl.raidv2.model.Owner;
import au.org.raid.idl.raidv2.model.RaidDto;
import au.org.raid.idl.raidv2.model.RegistrationAgency;
import au.org.raid.idl.raidv2.model.Title;
import au.org.raid.idl.raidv2.model.TitleType;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.vocabulary.DCTerms;
import org.apache.jena.vocabulary.RDF;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class RaidRdfServiceTest {
    private final RaidRdfService raidRdfService = new RaidRdfService();

    @Test
    @DisplayName("Should convert RaidDto to RDF model with basic properties")
    void shouldConvertRaidDtoToRdfModel() {
        // Given
        var raidDto = createSampleRaidDto();
        
        // When
        Model model = raidRdfService.toRdfModel(raidDto);
        
        // Then
        assertThat(model).isNotNull();
        assertThat(model.size()).isGreaterThan(0);
        
        // Verify the raid resource exists
        var raidResource = model.getResource("https://raid.org/123.456/abc");
        assertThat(raidResource).isNotNull();
        
        // Verify it has the correct type
        assertThat(raidResource.hasProperty(RDF.type)).isTrue();
        
        // Verify title is present
        assertThat(raidResource.listProperties(DCTerms.title).hasNext() || 
                   raidResource.hasProperty(model.getProperty("https://raid.org/schema#", "hasTitle"))).isTrue();
    }
    
    private RaidDto createSampleRaidDto() {
        var raidDto = new RaidDto();
        
        // Set identifier
        var id = new Id();
        id.setId("https://raid.org/123.456/abc");
        id.setSchemaUri("https://raid.org");
        
        // Set registration agency
        var registrationAgency = new RegistrationAgency();
        registrationAgency.setId("https://ror.org/02stey378");
        registrationAgency.setSchemaUri("https://ror.org");
        id.setRegistrationAgency(registrationAgency);
        
        // Set owner
        var owner = new Owner();
        owner.setId("https://ror.org/02stey378");
        owner.setSchemaUri("https://ror.org");
        owner.setServicePoint(20000003L);
        id.setOwner(owner);
        
        // Set license
        id.setLicense("Creative Commons CC-0");
        id.setVersion(1);
        
        raidDto.setIdentifier(id);
        
        // Set date
        var date = new au.org.raid.idl.raidv2.model.Date();
        date.setStartDate("2023-01-01");
        date.setEndDate("2023-12-31");
        raidDto.setDate(date);
        
        // Set title
        var titles = new ArrayList<Title>();
        var title = new Title();
        title.setText("Sample RAID");
        
        var titleType = new TitleType();
        titleType.setId("https://vocabulary.raid.org/title.type.schema/5");
        titleType.setSchemaUri("https://vocabulary.raid.org/title.type.schema/376");
        title.setType(titleType);
        
        var language = new Language();
        language.setId("eng");
        language.setSchemaUri("https://iso639-3.sil.org/");
        title.setLanguage(language);
        
        titles.add(title);
        raidDto.setTitle(titles);
        
        // Set description
        var descriptions = new ArrayList<Description>();
        var description = new Description();
        description.setText("This is a sample RAID for testing");
        
        var descriptionType = new DescriptionType();
        descriptionType.setId("https://vocabulary.raid.org/description.type.schema/318");
        descriptionType.setSchemaUri("https://vocabulary.raid.org/description.type.schema/320");
        description.setType(descriptionType);
        description.setLanguage(language);
        
        descriptions.add(description);
        raidDto.setDescription(descriptions);
        
        return raidDto;
    }
}