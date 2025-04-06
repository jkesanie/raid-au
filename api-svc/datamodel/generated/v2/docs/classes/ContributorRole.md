

# Class: ContributorRole



URI: [https://raid.org/datamodel/api/raid/core/:ContributorRole](https://raid.org/datamodel/api/raid/core/:ContributorRole)






```mermaid
 classDiagram
    class ContributorRole
    click ContributorRole href "../ContributorRole"
      ContributorRole : id
        
          
    
    
    ContributorRole --> "0..1" ContributorRoleIdEnum : id
    click ContributorRoleIdEnum href "../ContributorRoleIdEnum"

        
      ContributorRole : schemaUri
        
          
    
    
    ContributorRole --> "0..1" ContributorRoleSchemaUriEnum : schemaUri
    click ContributorRoleSchemaUriEnum href "../ContributorRoleSchemaUriEnum"

        
      
```




<!-- no inheritance hierarchy -->


## Slots

| Name | Cardinality and Range | Description | Inheritance |
| ---  | --- | --- | --- |
| [schemaUri](../slots/schemaUri.md) | 0..1 <br/> [ContributorRoleSchemaUriEnum](../enums/ContributorRoleSchemaUriEnum.md) |  | direct |
| [id](../slots/id.md) | 0..1 <br/> [ContributorRoleIdEnum](../enums/ContributorRoleIdEnum.md) |  | direct |





## Usages

| used by | used in | type | used |
| ---  | --- | --- | --- |
| [Contributor](../classes/Contributor.md) | [role](../slots/role.md) | range | [ContributorRole](../classes/ContributorRole.md) |






## Identifier and Mapping Information







### Schema Source


* from schema: https://raid.org/datamodel/api/raid/core




## Mappings

| Mapping Type | Mapped Value |
| ---  | ---  |
| self | https://raid.org/datamodel/api/raid/core/:ContributorRole |
| native | https://raid.org/datamodel/api/raid/core/:ContributorRole |







## LinkML Source

<!-- TODO: investigate https://stackoverflow.com/questions/37606292/how-to-create-tabbed-code-blocks-in-mkdocs-or-sphinx -->

### Direct

<details>
```yaml
name: ContributorRole
from_schema: https://raid.org/datamodel/api/raid/core
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
    range: ContributorRoleSchemaUriEnum
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
    range: ContributorRoleIdEnum

```
</details>

### Induced

<details>
```yaml
name: ContributorRole
from_schema: https://raid.org/datamodel/api/raid/core
attributes:
  schemaUri:
    name: schemaUri
    from_schema: https://raid.org/datamodel/api/raid/core
    alias: schemaUri
    owner: ContributorRole
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
    range: ContributorRoleSchemaUriEnum
  id:
    name: id
    from_schema: https://raid.org/datamodel/api/raid/core
    alias: id
    owner: ContributorRole
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
    range: ContributorRoleIdEnum

```
</details>