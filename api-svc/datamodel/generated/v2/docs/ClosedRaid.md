

# Class: ClosedRaid



URI: [https://raid.org/datamodel/api/raid/core/:ClosedRaid](https://raid.org/datamodel/api/raid/core/:ClosedRaid)






```mermaid
 classDiagram
    class ClosedRaid
    click ClosedRaid href "../ClosedRaid"
      ClosedRaid : access
        
          
    
    
    ClosedRaid --> "0..1" Access : access
    click Access href "../Access"

        
      ClosedRaid : id
        
      
```




<!-- no inheritance hierarchy -->


## Slots

| Name | Cardinality and Range | Description | Inheritance |
| ---  | --- | --- | --- |
| [id](id.md) | 1 <br/> [String](String.md) |  | direct |
| [access](access.md) | 0..1 <br/> [Access](Access.md) |  | direct |









## Identifier and Mapping Information







### Schema Source


* from schema: https://raid.org/datamodel/api/raid/core




## Mappings

| Mapping Type | Mapped Value |
| ---  | ---  |
| self | https://raid.org/datamodel/api/raid/core/:ClosedRaid |
| native | https://raid.org/datamodel/api/raid/core/:ClosedRaid |







## LinkML Source

<!-- TODO: investigate https://stackoverflow.com/questions/37606292/how-to-create-tabbed-code-blocks-in-mkdocs-or-sphinx -->

### Direct

<details>
```yaml
name: ClosedRaid
from_schema: https://raid.org/datamodel/api/raid/core
slots:
- id
- access

```
</details>

### Induced

<details>
```yaml
name: ClosedRaid
from_schema: https://raid.org/datamodel/api/raid/core
attributes:
  id:
    name: id
    from_schema: https://raid.org/datamodel/api/raid/core
    rank: 1000
    identifier: true
    alias: id
    owner: ClosedRaid
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
  access:
    name: access
    from_schema: https://raid.org/datamodel/api/raid/core
    rank: 1000
    alias: access
    owner: ClosedRaid
    domain_of:
    - RaidDto
    - ClosedRaid
    range: Access
    multivalued: false

```
</details>