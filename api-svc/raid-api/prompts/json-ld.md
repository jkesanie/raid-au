# Task: Implement JSON-LD and RDF Format Support in RAID API

**IMPORTANT: Update the OpenAPI schema at `api-svc/idl-raid-v2/src/raido-openapi-3.0.yaml` with NO BREAKING CHANGES**

**Controller to update: `api-svc/raid-api/src/main/java/au/org/raid/api/controller/RaidController.java`**

## Overview
We need to implement content negotiation in our Spring Boot RAID API to support Schema.org metadata via JSON-LD. This will allow clients to request data in JSON-LD format by using the Accept header.

The controller to be updated is at `api-svc/raid-api/src/main/java/au/org/raid/api/controller/RaidController.java`.

## Requirements
1. Update the OpenAPI specification at `api-svc/idl-raid-v2/src/raido-openapi-3.0.yaml` to include the new JSON-LD content type while ensuring **NO BREAKING CHANGES** to existing API contracts
2. Support the following format:
    - application/ld+json (JSON-LD format for Schema.org)

2. Implement using Spring's content negotiation features and `HttpMessageConverter` pattern
3. Maintain clean controller code by moving format conversion logic to separate classes
4. Use Schema.org vocabulary for the JSON-LD format

## Implementation Details

### 1. Update OpenAPI Schema
Modify the OpenAPI schema at `api-svc/idl-raid-v2/src/raido-openapi-3.0.yaml` to include the application/ld+json content type in relevant endpoints. Make sure these changes don't break existing API contracts or require clients to update their integrations.

### 2. Create JSON-LD Converter
Create a converter class for JSON-LD format:

- `RaidDtoToJsonLdConverter` for JSON-LD

### 3. Implement Schema.org Mapping
For the JSON-LD converter, implement a mapping from our RAID data model to Schema.org vocabulary. Choose appropriate Schema.org types for our research data (e.g., Dataset, ResearchProject).

### 4. Configure Content Negotiation
Configure Spring's content negotiation to recognize the JSON-LD MIME type and use the appropriate converter.

### 5. Update Controller Method
Update the `findRaidByName` method in `RaidController` at `api-svc/raid-api/src/main/java/au/org/raid/api/controller/RaidController.java` to use content negotiation based on the Accept header.

## Examples

### JSON-LD Converter Class
```typescript
@Component
public class RaidDtoToJsonLdConverter implements HttpMessageConverter<RaidDto> {
    
    private static final MediaType JSON_LD = MediaType.valueOf("application/ld+json");
    private final ObjectMapper objectMapper;
    
    public RaidDtoToJsonLdConverter(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }
    
    @Override
    public boolean canRead(Class<?> clazz, MediaType mediaType) {
        return false; // We only handle writing, not reading
    }
    
    @Override
    public boolean canWrite(Class<?> clazz, MediaType mediaType) {
        return RaidDto.class.isAssignableFrom(clazz) && 
               JSON_LD.isCompatibleWith(mediaType);
    }
    
    @Override
    public List<MediaType> getSupportedMediaTypes() {
        return List.of(JSON_LD);
    }
    
    @Override
    public RaidDto read(Class<? extends RaidDto> clazz, HttpInputMessage inputMessage) {
        throw new UnsupportedOperationException("Reading not supported");
    }
    
    @Override
    public void write(RaidDto raidDto, MediaType contentType, HttpOutputMessage outputMessage) 
            throws IOException {
        // Convert RaidDto to JSON-LD format
        Map<String, Object> jsonLdMap = convertToJsonLd(raidDto);
        
        // Set headers
        outputMessage.getHeaders().setContentType(JSON_LD);
        
        // Write to output
        try (OutputStream out = outputMessage.getBody()) {
            objectMapper.writeValue(out, jsonLdMap);
        }
    }
    
    private Map<String, Object> convertToJsonLd(RaidDto raid) {
        // Implement conversion logic here
        // Example implementation stub included below
    }
}
```

## WebConfig Example
```typescript
@Configuration
public class WebConfig implements WebMvcConfigurer {
    
    private final RaidDtoToJsonLdConverter jsonLdConverter;
    
    @Autowired
    public WebConfig(RaidDtoToJsonLdConverter jsonLdConverter) {
        this.jsonLdConverter = jsonLdConverter;
    }
    
    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        converters.add(jsonLdConverter);
    }
    
    @Override
    public void configureContentNegotiation(ContentNegotiationConfigurer configurer) {
        configurer
            .mediaType("json", MediaType.APPLICATION_JSON)
            .mediaType("jsonld", MediaType.valueOf("application/ld+json"))
            .favorParameter(false)
            .ignoreAcceptHeader(false)
            .defaultContentType(MediaType.APPLICATION_JSON);
    }
}
```

## Schema.org Mapping Guide
For the JSON-LD converter, consider these Schema.org types and properties:

- `Dataset` or `ResearchProject` as the primary type
- `name` for the title
- `description` for description fields
- `creator` for contributors
- `dateCreated` and `dateModified` for dates
- `funder` for organizations
- `identifier` for various identifiers

## OpenAPI Specification Update Example
For the OpenAPI schema, ensure you're adding the new content type without breaking existing contracts:

```yaml
# Example update to /raid/{prefix}/{suffix} endpoint in the OpenAPI spec
/raid/{prefix}/{suffix}:
  get:
    # ... existing configuration ...
    responses:
      200:
        description: data
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/RaidDto'
          application/ld+json:  # Add this section
            schema:
              type: object      # Generic object for JSON-LD
          # Note: text/turtle, application/n-triples, and application/rdf+xml are already implemented
```

## Testing
Test the implementation by making requests with the JSON-LD Accept header:

```
GET /raid/10.25.1.1/abcde
Accept: application/ld+json
```

## Deliverables
1. Updated OpenAPI schema in `api-svc/idl-raid-v2/src/raido-openapi-3.0.yaml` with no breaking changes
2. JSON-LD HTTP message converter implementation
3. WebConfig for content negotiation configuration
4. Updated controller code if needed
5. Tests to verify JSON-LD content negotiation works as expected