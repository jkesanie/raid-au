

# Class: SubjectKeyword



URI: [https://raid.org/datamodel/api/raid/extended/:SubjectKeyword](https://raid.org/datamodel/api/raid/extended/:SubjectKeyword)






```mermaid
 classDiagram
    class SubjectKeyword
    click SubjectKeyword href "../SubjectKeyword"
      SubjectKeyword : language
        
          
    
    
    SubjectKeyword --> "0..1" Language : language
    click Language href "../Language"

        
      SubjectKeyword : text
        
      
```




<!-- no inheritance hierarchy -->


## Slots

| Name | Cardinality and Range | Description | Inheritance |
| ---  | --- | --- | --- |
| [text](../slots/text.md) | 0..1 <br/> [String](../types/String.md) |  | direct |
| [language](../slots/language.md) | 0..1 <br/> [Language](../classes/Language.md) |  | direct |





## Usages

| used by | used in | type | used |
| ---  | --- | --- | --- |
| [Subject](../classes/Subject.md) | [keyword](../slots/keyword.md) | range | [SubjectKeyword](../classes/SubjectKeyword.md) |






## Identifier and Mapping Information







### Schema Source


* from schema: https://raid.org/datamodel/api/raid/extended




## Mappings

| Mapping Type | Mapped Value |
| ---  | ---  |
| self | https://raid.org/datamodel/api/raid/extended/:SubjectKeyword |
| native | https://raid.org/datamodel/api/raid/extended/:SubjectKeyword |







## LinkML Source

<!-- TODO: investigate https://stackoverflow.com/questions/37606292/how-to-create-tabbed-code-blocks-in-mkdocs-or-sphinx -->

### Direct

<details>
```yaml
name: SubjectKeyword
from_schema: https://raid.org/datamodel/api/raid/extended
slots:
- text
- language

```
</details>

### Induced

<details>
```yaml
name: SubjectKeyword
from_schema: https://raid.org/datamodel/api/raid/extended
attributes:
  text:
    name: text
    from_schema: https://raid.org/datamodel/api/raid/extended
    rank: 1000
    alias: text
    owner: SubjectKeyword
    domain_of:
    - SubjectKeyword
    - SpatialCoveragePlace
    range: string
  language:
    name: language
    from_schema: https://raid.org/datamodel/api/raid/extended
    rank: 1000
    alias: language
    owner: SubjectKeyword
    domain_of:
    - SubjectKeyword
    - SpatialCoveragePlace
    range: Language

```
</details>