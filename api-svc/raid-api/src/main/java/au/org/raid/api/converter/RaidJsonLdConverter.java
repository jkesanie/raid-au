package au.org.raid.api.converter;

import au.org.raid.api.service.rdf.RaidRdfService;
import au.org.raid.idl.raidv2.model.RaidDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.riot.RDFFormat;
import org.apache.jena.riot.RDFWriter;
import org.springframework.http.HttpInputMessage;
import org.springframework.http.HttpOutputMessage;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.http.converter.HttpMessageNotWritableException;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.StringWriter;
import java.util.List;
import java.util.Map;

/**
 * Converter for RaidDto to JSON-LD format using Schema.org vocabulary
 */
@Component
@RequiredArgsConstructor
public class RaidJsonLdConverter implements HttpMessageConverter<RaidDto> {
    private static final MediaType JSON_LD_MEDIA_TYPE = MediaType.valueOf("application/ld+json");
    
    private final RaidRdfService raidRdfService;
    private final ObjectMapper objectMapper;

    @Override
    public boolean canRead(Class<?> clazz, MediaType mediaType) {
        return false; // We only support writing, not reading
    }

    @Override
    public boolean canWrite(Class<?> clazz, MediaType mediaType) {
        return RaidDto.class.isAssignableFrom(clazz) && 
               JSON_LD_MEDIA_TYPE.isCompatibleWith(mediaType);
    }

    @Override
    public List<MediaType> getSupportedMediaTypes() {
        return List.of(JSON_LD_MEDIA_TYPE);
    }

    @Override
    public RaidDto read(Class<? extends RaidDto> clazz, HttpInputMessage inputMessage) 
            throws HttpMessageNotReadableException {
        throw new UnsupportedOperationException("Reading JSON-LD format is not supported");
    }

    @Override
    public void write(RaidDto raidDto, MediaType contentType, HttpOutputMessage outputMessage) 
            throws IOException, HttpMessageNotWritableException {
        // Convert RaidDto to RDF model
        Model model = raidRdfService.toRdfModel(raidDto);
        
        // Set the JSON-LD content type in the response
        outputMessage.getHeaders().setContentType(JSON_LD_MEDIA_TYPE);
        
        // Convert RDF to JSON-LD format
        StringWriter writer = new StringWriter();
        RDFWriter.create()
                .format(RDFFormat.JSONLD)
                .source(model)
                .build()
                .output(writer);
        
        // Write the result to the response body
        outputMessage.getBody().write(writer.toString().getBytes());
    }
    
    /* Schema.org mappings that would be used in a more sophisticated implementation:
     * - raid:hasTitle -> schema:name
     * - raid:hasDescription -> schema:description
     * - dcterms:identifier -> schema:identifier
     * - raid:startDate -> schema:startDate
     * - raid:endDate -> schema:endDate
     * - dcterms:license -> schema:license
     * - raid:hasContributor -> schema:contributor
     * - raid:hasOrganisation -> schema:funder
     * - raid:hasRelatedObject -> schema:isPartOf
     * - raid:hasRelatedRaid -> schema:isRelatedTo
     * - dcterms:subject -> schema:keywords
     * - raid:alternateUrl -> schema:url
     * - dcterms:spatial -> schema:spatialCoverage
     */
}