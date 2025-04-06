

# Class: Organisation



URI: [https://raid.org/datamodel/api/raid/core/:Organisation](https://raid.org/datamodel/api/raid/core/:Organisation)






```mermaid
 classDiagram
    class Organisation
    click Organisation href "../Organisation"
      Organisation : id
        
      Organisation : role
        
          
    
    
    Organisation --> "*" OrganisationRole : role
    click OrganisationRole href "../OrganisationRole"

        
      Organisation : schemaUri
        
          
    
    
    Organisation --> "0..1" OrganizationSchemaUriEnum : schemaUri
    click OrganizationSchemaUriEnum href "../OrganizationSchemaUriEnum"

        
      
```




<!-- no inheritance hierarchy -->


## Slots

| Name | Cardinality and Range | Description | Inheritance |
| ---  | --- | --- | --- |
| [id](../slots/id.md) | 1 <br/> [String](../types/String.md) |  | direct |
| [schemaUri](../slots/schemaUri.md) | 0..1 <br/> [OrganizationSchemaUriEnum](../enums/OrganizationSchemaUriEnum.md) |  | direct |
| [role](../slots/role.md) | * <br/> [OrganisationRole](../classes/OrganisationRole.md) |  | direct |





## Usages

| used by | used in | type | used |
| ---  | --- | --- | --- |
| [RaidDto](../classes/RaidDto.md) | [organisation](../slots/organisation.md) | range | [Organisation](../classes/Organisation.md) |
| [RaidCreateRequest](../classes/RaidCreateRequest.md) | [organisation](../slots/organisation.md) | range | [Organisation](../classes/Organisation.md) |
| [RaidUpdateRequest](../classes/RaidUpdateRequest.md) | [organisation](../slots/organisation.md) | range | [Organisation](../classes/Organisation.md) |






## Identifier and Mapping Information







### Schema Source


* from schema: https://raid.org/datamodel/api/raid/core




## Mappings

| Mapping Type | Mapped Value |
| ---  | ---  |
| self | https://raid.org/datamodel/api/raid/core/:Organisation |
| native | https://raid.org/datamodel/api/raid/core/:Organisation |







## LinkML Source

<!-- TODO: investigate https://stackoverflow.com/questions/37606292/how-to-create-tabbed-code-blocks-in-mkdocs-or-sphinx -->

### Direct

<details>
```yaml
name: Organisation
from_schema: https://raid.org/datamodel/api/raid/core
slots:
- id
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
    range: OrganizationSchemaUriEnum
  role:
    name: role
    from_schema: https://raid.org/datamodel/api/raid/core
    domain_of:
    - Contributor
    - Organisation
    range: OrganisationRole
    multivalued: true

```
</details>

### Induced

<details>
```yaml
name: Organisation
from_schema: https://raid.org/datamodel/api/raid/core
attributes:
  schemaUri:
    name: schemaUri
    from_schema: https://raid.org/datamodel/api/raid/core
    alias: schemaUri
    owner: Organisation
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
    range: OrganizationSchemaUriEnum
  role:
    name: role
    from_schema: https://raid.org/datamodel/api/raid/core
    alias: role
    owner: Organisation
    domain_of:
    - Contributor
    - Organisation
    range: OrganisationRole
    multivalued: true
  id:
    name: id
    from_schema: https://raid.org/datamodel/api/raid/core
    rank: 1000
    identifier: true
    alias: id
    owner: Organisation
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
    required: true

```
</details>