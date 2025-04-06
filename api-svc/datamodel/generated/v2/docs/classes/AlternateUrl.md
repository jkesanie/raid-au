

# Class: AlternateUrl



URI: [https://raid.org/datamodel/api/raid/core/:AlternateUrl](https://raid.org/datamodel/api/raid/core/:AlternateUrl)






```mermaid
 classDiagram
    class AlternateUrl
    click AlternateUrl href "../AlternateUrl"
      AlternateUrl : url
        
      
```




<!-- no inheritance hierarchy -->


## Slots

| Name | Cardinality and Range | Description | Inheritance |
| ---  | --- | --- | --- |
| [url](../slots/url.md) | 0..1 <br/> [String](../types/String.md) |  | direct |





## Usages

| used by | used in | type | used |
| ---  | --- | --- | --- |
| [RaidDto](../classes/RaidDto.md) | [alternateUrl](../slots/alternateUrl.md) | range | [AlternateUrl](../classes/AlternateUrl.md) |
| [RaidCreateRequest](../classes/RaidCreateRequest.md) | [alternateUrl](../slots/alternateUrl.md) | range | [AlternateUrl](../classes/AlternateUrl.md) |
| [RaidUpdateRequest](../classes/RaidUpdateRequest.md) | [alternateUrl](../slots/alternateUrl.md) | range | [AlternateUrl](../classes/AlternateUrl.md) |






## Identifier and Mapping Information







### Schema Source


* from schema: https://raid.org/datamodel/api/raid/core




## Mappings

| Mapping Type | Mapped Value |
| ---  | ---  |
| self | https://raid.org/datamodel/api/raid/core/:AlternateUrl |
| native | https://raid.org/datamodel/api/raid/core/:AlternateUrl |







## LinkML Source

<!-- TODO: investigate https://stackoverflow.com/questions/37606292/how-to-create-tabbed-code-blocks-in-mkdocs-or-sphinx -->

### Direct

<details>
```yaml
name: AlternateUrl
from_schema: https://raid.org/datamodel/api/raid/core
slots:
- url

```
</details>

### Induced

<details>
```yaml
name: AlternateUrl
from_schema: https://raid.org/datamodel/api/raid/core
attributes:
  url:
    name: url
    from_schema: https://raid.org/datamodel/api/raid/core
    rank: 1000
    alias: url
    owner: AlternateUrl
    domain_of:
    - AlternateUrl
    range: string

```
</details>