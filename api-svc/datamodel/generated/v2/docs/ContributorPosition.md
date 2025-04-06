

# Class: ContributorPosition



URI: [https://raid.org/datamodel/api/raid/core/:ContributorPosition](https://raid.org/datamodel/api/raid/core/:ContributorPosition)






```mermaid
 classDiagram
    class ContributorPosition
    click ContributorPosition href "../ContributorPosition"
      ContributorPosition : endDate
        
      ContributorPosition : id
        
          
    
    
    ContributorPosition --> "0..1" ContributorPositionIdEnum : id
    click ContributorPositionIdEnum href "../ContributorPositionIdEnum"

        
      ContributorPosition : schemaUri
        
          
    
    
    ContributorPosition --> "0..1" ContributorPositionSchemaUriEnum : schemaUri
    click ContributorPositionSchemaUriEnum href "../ContributorPositionSchemaUriEnum"

        
      ContributorPosition : startDate
        
      
```




<!-- no inheritance hierarchy -->


## Slots

| Name | Cardinality and Range | Description | Inheritance |
| ---  | --- | --- | --- |
| [startDate](startDate.md) | 1 <br/> [String](String.md) |  | direct |
| [endDate](endDate.md) | 0..1 <br/> [String](String.md) |  | direct |
| [schemaUri](schemaUri.md) | 0..1 <br/> [ContributorPositionSchemaUriEnum](ContributorPositionSchemaUriEnum.md) |  | direct |
| [id](id.md) | 0..1 <br/> [ContributorPositionIdEnum](ContributorPositionIdEnum.md) |  | direct |





## Usages

| used by | used in | type | used |
| ---  | --- | --- | --- |
| [Contributor](Contributor.md) | [position](position.md) | range | [ContributorPosition](ContributorPosition.md) |






## Identifier and Mapping Information







### Schema Source


* from schema: https://raid.org/datamodel/api/raid/core




## Mappings

| Mapping Type | Mapped Value |
| ---  | ---  |
| self | https://raid.org/datamodel/api/raid/core/:ContributorPosition |
| native | https://raid.org/datamodel/api/raid/core/:ContributorPosition |







## LinkML Source

<!-- TODO: investigate https://stackoverflow.com/questions/37606292/how-to-create-tabbed-code-blocks-in-mkdocs-or-sphinx -->

### Direct

<details>
```yaml
name: ContributorPosition
from_schema: https://raid.org/datamodel/api/raid/core
slots:
- startDate
- endDate
attributes:
  schemaUri:
    name: schemaUri
    from_schema: https://raid.org/datamodel/api/raid/core
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
    range: ContributorPositionSchemaUriEnum
  id:
    name: id
    from_schema: https://raid.org/datamodel/api/raid/core
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
    range: ContributorPositionIdEnum

```
</details>

### Induced

<details>
```yaml
name: ContributorPosition
from_schema: https://raid.org/datamodel/api/raid/core
attributes:
  schemaUri:
    name: schemaUri
    from_schema: https://raid.org/datamodel/api/raid/core
    alias: schemaUri
    owner: ContributorPosition
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
    range: ContributorPositionSchemaUriEnum
  id:
    name: id
    from_schema: https://raid.org/datamodel/api/raid/core
    alias: id
    owner: ContributorPosition
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
    range: ContributorPositionIdEnum
  startDate:
    name: startDate
    from_schema: https://raid.org/datamodel/api/raid/core
    rank: 1000
    alias: startDate
    owner: ContributorPosition
    domain_of:
    - Date
    - Title
    - ContributorPosition
    - OrganisationRole
    range: string
    required: true
  endDate:
    name: endDate
    from_schema: https://raid.org/datamodel/api/raid/core
    rank: 1000
    alias: endDate
    owner: ContributorPosition
    domain_of:
    - Date
    - Title
    - ContributorPosition
    - OrganisationRole
    range: string

```
</details>