

# Class: SpatialCoverage



URI: [https://raid.org/datamodel/api/raid/core/:SpatialCoverage](https://raid.org/datamodel/api/raid/core/:SpatialCoverage)






```mermaid
 classDiagram
    class SpatialCoverage
    click SpatialCoverage href "../SpatialCoverage"
      SpatialCoverage : id
        
      SpatialCoverage : place
        
          
    
    
    SpatialCoverage --> "*" SpatialCoveragePlace : place
    click SpatialCoveragePlace href "../SpatialCoveragePlace"

        
      SpatialCoverage : schemaUri
        
          
    
    
    SpatialCoverage --> "0..1" SpatialCoverageSchemaUriEnum : schemaUri
    click SpatialCoverageSchemaUriEnum href "../SpatialCoverageSchemaUriEnum"

        
      
```




<!-- no inheritance hierarchy -->


## Slots

| Name | Cardinality and Range | Description | Inheritance |
| ---  | --- | --- | --- |
| [id](../slots/id.md) | 0..1 <br/> [String](../types/String.md) |  | direct |
| [schemaUri](../slots/schemaUri.md) | 0..1 <br/> [SpatialCoverageSchemaUriEnum](../enums/SpatialCoverageSchemaUriEnum.md) |  | direct |
| [place](../slots/place.md) | * <br/> [SpatialCoveragePlace](../classes/SpatialCoveragePlace.md) |  | direct |





## Usages

| used by | used in | type | used |
| ---  | --- | --- | --- |
| [RaidDto](../classes/RaidDto.md) | [spatialCoverage](../slots/spatialCoverage.md) | range | [SpatialCoverage](../classes/SpatialCoverage.md) |
| [RaidCreateRequest](../classes/RaidCreateRequest.md) | [spatialCoverage](../slots/spatialCoverage.md) | range | [SpatialCoverage](../classes/SpatialCoverage.md) |
| [RaidUpdateRequest](../classes/RaidUpdateRequest.md) | [spatialCoverage](../slots/spatialCoverage.md) | range | [SpatialCoverage](../classes/SpatialCoverage.md) |






## Identifier and Mapping Information







### Schema Source


* from schema: https://raid.org/datamodel/api/raid/core




## Mappings

| Mapping Type | Mapped Value |
| ---  | ---  |
| self | https://raid.org/datamodel/api/raid/core/:SpatialCoverage |
| native | https://raid.org/datamodel/api/raid/core/:SpatialCoverage |







## LinkML Source

<!-- TODO: investigate https://stackoverflow.com/questions/37606292/how-to-create-tabbed-code-blocks-in-mkdocs-or-sphinx -->

### Direct

<details>
```yaml
name: SpatialCoverage
from_schema: https://raid.org/datamodel/api/raid/core
attributes:
  id:
    name: id
    from_schema: https://raid.org/datamodel/api/raid/extended
    domain_of:
    - ClosedRaid
    - Id
    - Contributor
    - Organisation
    - RelatedRaid
    - RelatedObject
    - AlternateIdentifier
    - Owner
    - RegistrationAgency
    - TitleType
    - DescriptionType
    - AccessType
    - ContributorPosition
    - ContributorRole
    - OrganisationRole
    - RelatedRaidType
    - RelatedObjectType
    - RelatedObjectCategory
    - Language
    - Subject
    - SpatialCoverage
    - TraditionalKnowledgeLabel
    range: string
  schemaUri:
    name: schemaUri
    from_schema: https://raid.org/datamodel/api/raid/extended
    domain_of:
    - Id
    - Contributor
    - Organisation
    - RelatedObject
    - Owner
    - RegistrationAgency
    - TitleType
    - DescriptionType
    - AccessType
    - ContributorPosition
    - ContributorRole
    - OrganisationRole
    - RelatedRaidType
    - RelatedObjectType
    - RelatedObjectCategory
    - Language
    - Subject
    - SpatialCoverage
    - TraditionalKnowledgeLabel
    range: SpatialCoverageSchemaUriEnum
  place:
    name: place
    from_schema: https://raid.org/datamodel/api/raid/extended
    rank: 1000
    domain_of:
    - SpatialCoverage
    range: SpatialCoveragePlace
    multivalued: true
    inlined: true
    inlined_as_list: true

```
</details>

### Induced

<details>
```yaml
name: SpatialCoverage
from_schema: https://raid.org/datamodel/api/raid/core
attributes:
  id:
    name: id
    from_schema: https://raid.org/datamodel/api/raid/extended
    alias: id
    owner: SpatialCoverage
    domain_of:
    - ClosedRaid
    - Id
    - Contributor
    - Organisation
    - RelatedRaid
    - RelatedObject
    - AlternateIdentifier
    - Owner
    - RegistrationAgency
    - TitleType
    - DescriptionType
    - AccessType
    - ContributorPosition
    - ContributorRole
    - OrganisationRole
    - RelatedRaidType
    - RelatedObjectType
    - RelatedObjectCategory
    - Language
    - Subject
    - SpatialCoverage
    - TraditionalKnowledgeLabel
    range: string
  schemaUri:
    name: schemaUri
    from_schema: https://raid.org/datamodel/api/raid/extended
    alias: schemaUri
    owner: SpatialCoverage
    domain_of:
    - Id
    - Contributor
    - Organisation
    - RelatedObject
    - Owner
    - RegistrationAgency
    - TitleType
    - DescriptionType
    - AccessType
    - ContributorPosition
    - ContributorRole
    - OrganisationRole
    - RelatedRaidType
    - RelatedObjectType
    - RelatedObjectCategory
    - Language
    - Subject
    - SpatialCoverage
    - TraditionalKnowledgeLabel
    range: SpatialCoverageSchemaUriEnum
  place:
    name: place
    from_schema: https://raid.org/datamodel/api/raid/extended
    rank: 1000
    alias: place
    owner: SpatialCoverage
    domain_of:
    - SpatialCoverage
    range: SpatialCoveragePlace
    multivalued: true
    inlined: true
    inlined_as_list: true

```
</details>