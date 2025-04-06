

# Class: Owner



URI: [https://raid.org/datamodel/api/raid/core/:Owner](https://raid.org/datamodel/api/raid/core/:Owner)






```mermaid
 classDiagram
    class Owner
    click Owner href "../Owner"
      Owner : id
        
      Owner : schemaUri
        
          
    
    
    Owner --> "0..1" RegistrationAgencySchemaURIEnum : schemaUri
    click RegistrationAgencySchemaURIEnum href "../RegistrationAgencySchemaURIEnum"

        
      Owner : servicePoint
        
      
```




<!-- no inheritance hierarchy -->


## Slots

| Name | Cardinality and Range | Description | Inheritance |
| ---  | --- | --- | --- |
| [id](../slots/id.md) | 0..1 <br/> [String](../types/String.md) |  | direct |
| [schemaUri](../slots/schemaUri.md) | 0..1 <br/> [RegistrationAgencySchemaURIEnum](../enums/RegistrationAgencySchemaURIEnum.md) |  | direct |
| [servicePoint](../slots/servicePoint.md) | 0..1 <br/> [String](../types/String.md) |  | direct |





## Usages

| used by | used in | type | used |
| ---  | --- | --- | --- |
| [Id](../classes/Id.md) | [owner](../slots/owner.md) | range | [Owner](../classes/Owner.md) |






## Identifier and Mapping Information







### Schema Source


* from schema: https://raid.org/datamodel/api/raid/core




## Mappings

| Mapping Type | Mapped Value |
| ---  | ---  |
| self | https://raid.org/datamodel/api/raid/core/:Owner |
| native | https://raid.org/datamodel/api/raid/core/:Owner |







## LinkML Source

<!-- TODO: investigate https://stackoverflow.com/questions/37606292/how-to-create-tabbed-code-blocks-in-mkdocs-or-sphinx -->

### Direct

<details>
```yaml
name: Owner
from_schema: https://raid.org/datamodel/api/raid/core
attributes:
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
    range: string
    pattern: ^https://ror\.org/
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
    range: RegistrationAgencySchemaURIEnum
  servicePoint:
    name: servicePoint
    examples:
    - value: '20000003'
    from_schema: https://raid.org/datamodel/api/raid/core
    rank: 1000
    domain_of:
    - Owner
    range: string

```
</details>

### Induced

<details>
```yaml
name: Owner
from_schema: https://raid.org/datamodel/api/raid/core
attributes:
  id:
    name: id
    from_schema: https://raid.org/datamodel/api/raid/core
    alias: id
    owner: Owner
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
    pattern: ^https://ror\.org/
  schemaUri:
    name: schemaUri
    from_schema: https://raid.org/datamodel/api/raid/core
    alias: schemaUri
    owner: Owner
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
    range: RegistrationAgencySchemaURIEnum
  servicePoint:
    name: servicePoint
    examples:
    - value: '20000003'
    from_schema: https://raid.org/datamodel/api/raid/core
    rank: 1000
    alias: servicePoint
    owner: Owner
    domain_of:
    - Owner
    range: string

```
</details>