

# Class: Title



URI: [https://raid.org/datamodel/api/raid/core/:Title](https://raid.org/datamodel/api/raid/core/:Title)






```mermaid
 classDiagram
    class Title
    click Title href "../Title"
      Title : endDate
        
      Title : language
        
          
    
    
    Title --> "0..1" Language : language
    click Language href "../Language"

        
      Title : startDate
        
      Title : text
        
      Title : type
        
          
    
    
    Title --> "0..1" TitleType : type
    click TitleType href "../TitleType"

        
      
```




<!-- no inheritance hierarchy -->


## Slots

| Name | Cardinality and Range | Description | Inheritance |
| ---  | --- | --- | --- |
| [text](../slots/text.md) | 0..1 <br/> [String](../types/String.md) |  | direct |
| [startDate](../slots/startDate.md) | 1 <br/> [String](../types/String.md) |  | direct |
| [endDate](../slots/endDate.md) | 0..1 <br/> [String](../types/String.md) |  | direct |
| [language](../slots/language.md) | 0..1 <br/> [Language](../classes/Language.md) |  | direct |
| [type](../slots/type.md) | 0..1 <br/> [TitleType](../classes/TitleType.md) |  | direct |





## Usages

| used by | used in | type | used |
| ---  | --- | --- | --- |
| [RaidDto](../classes/RaidDto.md) | [title](../slots/title.md) | range | [Title](../classes/Title.md) |
| [RaidCreateRequest](../classes/RaidCreateRequest.md) | [title](../slots/title.md) | range | [Title](../classes/Title.md) |
| [RaidUpdateRequest](../classes/RaidUpdateRequest.md) | [title](../slots/title.md) | range | [Title](../classes/Title.md) |






## Identifier and Mapping Information







### Schema Source


* from schema: https://raid.org/datamodel/api/raid/core




## Mappings

| Mapping Type | Mapped Value |
| ---  | ---  |
| self | https://raid.org/datamodel/api/raid/core/:Title |
| native | https://raid.org/datamodel/api/raid/core/:Title |







## LinkML Source

<!-- TODO: investigate https://stackoverflow.com/questions/37606292/how-to-create-tabbed-code-blocks-in-mkdocs-or-sphinx -->

### Direct

<details>
```yaml
name: Title
from_schema: https://raid.org/datamodel/api/raid/core
slots:
- text
- startDate
- endDate
- language
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
    range: TitleType

```
</details>

### Induced

<details>
```yaml
name: Title
from_schema: https://raid.org/datamodel/api/raid/core
attributes:
  type:
    name: type
    from_schema: https://raid.org/datamodel/api/raid/core
    alias: type
    owner: Title
    domain_of:
    - Title
    - Description
    - Access
    - RelatedRaid
    - RelatedObject
    - AlternateIdentifier
    range: TitleType
  text:
    name: text
    from_schema: https://raid.org/datamodel/api/raid/core
    rank: 1000
    alias: text
    owner: Title
    domain_of:
    - Title
    - Description
    - AccessStatement
    - SubjectKeyword
    - SpatialCoveragePlace
    range: string
  startDate:
    name: startDate
    from_schema: https://raid.org/datamodel/api/raid/core
    rank: 1000
    alias: startDate
    owner: Title
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
    owner: Title
    domain_of:
    - Date
    - Title
    - ContributorPosition
    - OrganisationRole
    range: string
  language:
    name: language
    from_schema: https://raid.org/datamodel/api/raid/core
    rank: 1000
    alias: language
    owner: Title
    domain_of:
    - Title
    - Description
    - AccessStatement
    - SubjectKeyword
    - SpatialCoveragePlace
    range: Language

```
</details>