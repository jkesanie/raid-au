

# Class: RelatedRaid



URI: [https://raid.org/datamodel/api/raid/core/:RelatedRaid](https://raid.org/datamodel/api/raid/core/:RelatedRaid)






```mermaid
 classDiagram
    class RelatedRaid
    click RelatedRaid href "../RelatedRaid"
      RelatedRaid : id
        
      RelatedRaid : type
        
          
    
    
    RelatedRaid --> "0..1" RelatedRaidType : type
    click RelatedRaidType href "../RelatedRaidType"

        
      
```




<!-- no inheritance hierarchy -->


## Slots

| Name | Cardinality and Range | Description | Inheritance |
| ---  | --- | --- | --- |
| [id](../slots/id.md) | 1 <br/> [String](../types/String.md) |  | direct |
| [type](../slots/type.md) | 0..1 <br/> [RelatedRaidType](../classes/RelatedRaidType.md) |  | direct |





## Usages

| used by | used in | type | used |
| ---  | --- | --- | --- |
| [RaidDto](../classes/RaidDto.md) | [relatedRaid](../slots/relatedRaid.md) | range | [RelatedRaid](../classes/RelatedRaid.md) |
| [RaidCreateRequest](../classes/RaidCreateRequest.md) | [relatedRaid](../slots/relatedRaid.md) | range | [RelatedRaid](../classes/RelatedRaid.md) |
| [RaidUpdateRequest](../classes/RaidUpdateRequest.md) | [relatedRaid](../slots/relatedRaid.md) | range | [RelatedRaid](../classes/RelatedRaid.md) |






## Identifier and Mapping Information







### Schema Source


* from schema: https://raid.org/datamodel/api/raid/core




## Mappings

| Mapping Type | Mapped Value |
| ---  | ---  |
| self | https://raid.org/datamodel/api/raid/core/:RelatedRaid |
| native | https://raid.org/datamodel/api/raid/core/:RelatedRaid |







## LinkML Source

<!-- TODO: investigate https://stackoverflow.com/questions/37606292/how-to-create-tabbed-code-blocks-in-mkdocs-or-sphinx -->

### Direct

<details>
```yaml
name: RelatedRaid
from_schema: https://raid.org/datamodel/api/raid/core
slots:
- id
attributes:
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
    range: RelatedRaidType

```
</details>

### Induced

<details>
```yaml
name: RelatedRaid
from_schema: https://raid.org/datamodel/api/raid/core
attributes:
  type:
    name: type
    from_schema: https://raid.org/datamodel/api/raid/core
    alias: type
    owner: RelatedRaid
    domain_of:
    - Title
    - Description
    - Access
    - RelatedRaid
    - RelatedObject
    - AlternateIdentifier
    range: RelatedRaidType
  id:
    name: id
    from_schema: https://raid.org/datamodel/api/raid/core
    rank: 1000
    identifier: true
    alias: id
    owner: RelatedRaid
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