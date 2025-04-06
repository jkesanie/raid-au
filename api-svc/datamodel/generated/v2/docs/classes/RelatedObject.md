

# Class: RelatedObject



URI: [https://raid.org/datamodel/api/raid/core/:RelatedObject](https://raid.org/datamodel/api/raid/core/:RelatedObject)






```mermaid
 classDiagram
    class RelatedObject
    click RelatedObject href "../RelatedObject"
      RelatedObject : category
        
          
    
    
    RelatedObject --> "*" RelatedObjectCategory : category
    click RelatedObjectCategory href "../RelatedObjectCategory"

        
      RelatedObject : id
        
      RelatedObject : schemaUri
        
          
    
    
    RelatedObject --> "0..1" RelatedObjectSchemaUriEnum : schemaUri
    click RelatedObjectSchemaUriEnum href "../RelatedObjectSchemaUriEnum"

        
      RelatedObject : type
        
          
    
    
    RelatedObject --> "0..1" RelatedObjectType : type
    click RelatedObjectType href "../RelatedObjectType"

        
      
```




<!-- no inheritance hierarchy -->


## Slots

| Name | Cardinality and Range | Description | Inheritance |
| ---  | --- | --- | --- |
| [id](../slots/id.md) | 1 <br/> [String](../types/String.md) |  | direct |
| [schemaUri](../slots/schemaUri.md) | 0..1 <br/> [RelatedObjectSchemaUriEnum](../enums/RelatedObjectSchemaUriEnum.md) |  | direct |
| [type](../slots/type.md) | 0..1 <br/> [RelatedObjectType](../classes/RelatedObjectType.md) |  | direct |
| [category](../slots/category.md) | * <br/> [RelatedObjectCategory](../classes/RelatedObjectCategory.md) |  | direct |





## Usages

| used by | used in | type | used |
| ---  | --- | --- | --- |
| [RaidDto](../classes/RaidDto.md) | [relatedObject](../slots/relatedObject.md) | range | [RelatedObject](../classes/RelatedObject.md) |
| [RaidCreateRequest](../classes/RaidCreateRequest.md) | [relatedObject](../slots/relatedObject.md) | range | [RelatedObject](../classes/RelatedObject.md) |
| [RaidUpdateRequest](../classes/RaidUpdateRequest.md) | [relatedObject](../slots/relatedObject.md) | range | [RelatedObject](../classes/RelatedObject.md) |






## Identifier and Mapping Information







### Schema Source


* from schema: https://raid.org/datamodel/api/raid/core




## Mappings

| Mapping Type | Mapped Value |
| ---  | ---  |
| self | https://raid.org/datamodel/api/raid/core/:RelatedObject |
| native | https://raid.org/datamodel/api/raid/core/:RelatedObject |







## LinkML Source

<!-- TODO: investigate https://stackoverflow.com/questions/37606292/how-to-create-tabbed-code-blocks-in-mkdocs-or-sphinx -->

### Direct

<details>
```yaml
name: RelatedObject
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
    range: RelatedObjectSchemaUriEnum
  type:
    name: type
    from_schema: https://raid.org/datamodel/api/raid/core
    domain_of:
    - Title
    - Description
    - Access
    - RelatedRaid
    - RelatedObject
    - AlternateIdentifier
    range: RelatedObjectType
  category:
    name: category
    from_schema: https://raid.org/datamodel/api/raid/core
    rank: 1000
    domain_of:
    - RelatedObject
    range: RelatedObjectCategory
    multivalued: true

```
</details>

### Induced

<details>
```yaml
name: RelatedObject
from_schema: https://raid.org/datamodel/api/raid/core
attributes:
  schemaUri:
    name: schemaUri
    from_schema: https://raid.org/datamodel/api/raid/core
    alias: schemaUri
    owner: RelatedObject
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
    range: RelatedObjectSchemaUriEnum
  type:
    name: type
    from_schema: https://raid.org/datamodel/api/raid/core
    alias: type
    owner: RelatedObject
    domain_of:
    - Title
    - Description
    - Access
    - RelatedRaid
    - RelatedObject
    - AlternateIdentifier
    range: RelatedObjectType
  category:
    name: category
    from_schema: https://raid.org/datamodel/api/raid/core
    rank: 1000
    alias: category
    owner: RelatedObject
    domain_of:
    - RelatedObject
    range: RelatedObjectCategory
    multivalued: true
  id:
    name: id
    from_schema: https://raid.org/datamodel/api/raid/core
    rank: 1000
    identifier: true
    alias: id
    owner: RelatedObject
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