package au.org.raid.api.service.rdf;

import au.org.raid.idl.raidv2.model.RaidDto;
import lombok.extern.slf4j.Slf4j;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.ModelFactory;
import org.apache.jena.rdf.model.Property;
import org.apache.jena.rdf.model.Resource;
import org.apache.jena.vocabulary.DCTerms;
import org.apache.jena.vocabulary.RDF;
import org.springframework.stereotype.Service;

/**
 * Service for converting RaidDto to RDF model
 */
@Slf4j
@Service
public class RaidRdfService {

    private static final String RAID_TYPE = "https://raid.org/schema#RAiD";
    private static final String RAID_NS = "https://raid.org/schema#";

    /**
     * Convert a RaidDto to a Jena RDF Model
     * @param raidDto The RaidDto to convert
     * @return RDF Model representation of the RaidDto
     */
    public Model toRdfModel(RaidDto raidDto) {
        Model model = ModelFactory.createDefaultModel();
        model.setNsPrefix("raid", RAID_NS);
        model.setNsPrefix("dc", DCTerms.NS);

        // Create property constants
        Property hasTitle = model.createProperty(RAID_NS, "hasTitle");
        Property hasDescription = model.createProperty(RAID_NS, "hasDescription");
        Property hasIdentifier = model.createProperty(DCTerms.NS, "identifier");
        Property hasSchemaUri = model.createProperty(RAID_NS, "schemaUri");
        Property hasStartDate = model.createProperty(RAID_NS, "startDate");
        Property hasEndDate = model.createProperty(RAID_NS, "endDate");

        // Create the RAID resource
        Resource raid = model.createResource(raidDto.getIdentifier().getId());
        raid.addProperty(RDF.type, model.createResource(RAID_TYPE));
        
        // Add identifier properties
        raid.addProperty(hasIdentifier, raidDto.getIdentifier().getId());
        raid.addProperty(hasSchemaUri, raidDto.getIdentifier().getSchemaUri());
        
        // Add date information
        if (raidDto.getDate() != null) {
            if (raidDto.getDate().getStartDate() != null) {
                raid.addProperty(hasStartDate, raidDto.getDate().getStartDate());
            }
            if (raidDto.getDate().getEndDate() != null) {
                raid.addProperty(hasEndDate, raidDto.getDate().getEndDate());
            }
        }

        // Add titles
        if (raidDto.getTitle() != null) {
            raidDto.getTitle().forEach(title -> {
                Resource titleResource = model.createResource()
                        .addProperty(DCTerms.title, title.getText());
                if (title.getType() != null) {
                    titleResource.addProperty(DCTerms.type, title.getType().getId());
                }
                raid.addProperty(hasTitle, titleResource);
            });
        }

        // Add descriptions
        if (raidDto.getDescription() != null) {
            raidDto.getDescription().forEach(description -> {
                Resource descResource = model.createResource()
                        .addProperty(DCTerms.description, description.getText());
                if (description.getType() != null) {
                    descResource.addProperty(DCTerms.type, description.getType().getId());
                }
                raid.addProperty(hasDescription, descResource);
            });
        }

        // Add more properties as needed for a complete representation
        // This is a basic implementation that can be extended

        return model;
    }
}