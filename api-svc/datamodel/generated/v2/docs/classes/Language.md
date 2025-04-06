

# Class: Language



URI: [https://raid.org/datamodel/api/raid/extended/:Language](https://raid.org/datamodel/api/raid/extended/:Language)






```mermaid
 classDiagram
    class Language
    click Language href "../Language"
      Language : id
        
      Language : schemaUri
        
          
    
    
    Language --> "0..1" LanguageSchemaURIEnum : schemaUri
    click LanguageSchemaURIEnum href "../LanguageSchemaURIEnum"

        
      
```




<!-- no inheritance hierarchy -->


## Slots

| Name | Cardinality and Range | Description | Inheritance |
| ---  | --- | --- | --- |
| [id](../slots/id.md) | 0..1 <br/> [String](../types/String.md) |  | direct |
| [schemaUri](../slots/schemaUri.md) | 0..1 <br/> [LanguageSchemaURIEnum](../enums/LanguageSchemaURIEnum.md) |  | direct |





## Usages

| used by | used in | type | used |
| ---  | --- | --- | --- |
| [SubjectKeyword](../classes/SubjectKeyword.md) | [language](../slots/language.md) | range | [Language](../classes/Language.md) |
| [SpatialCoveragePlace](../classes/SpatialCoveragePlace.md) | [language](../slots/language.md) | range | [Language](../classes/Language.md) |






## Identifier and Mapping Information







### Schema Source


* from schema: https://raid.org/datamodel/api/raid/extended




## Mappings

| Mapping Type | Mapped Value |
| ---  | ---  |
| self | https://raid.org/datamodel/api/raid/extended/:Language |
| native | https://raid.org/datamodel/api/raid/extended/:Language |







## LinkML Source

<!-- TODO: investigate https://stackoverflow.com/questions/37606292/how-to-create-tabbed-code-blocks-in-mkdocs-or-sphinx -->

### Direct

<details>
```yaml
name: Language
from_schema: https://raid.org/datamodel/api/raid/extended
attributes:
  id:
    name: id
    from_schema: https://raid.org/datamodel/api/raid/shared
    domain_of:
    - Subject
    - SpatialCoverage
    - TraditionalKnowledgeLabel
    - Language
    range: string
  schemaUri:
    name: schemaUri
    from_schema: https://raid.org/datamodel/api/raid/shared
    domain_of:
    - Subject
    - SpatialCoverage
    - TraditionalKnowledgeLabel
    - Language
    range: LanguageSchemaURIEnum

```
</details>

### Induced

<details>
```yaml
name: Language
from_schema: https://raid.org/datamodel/api/raid/extended
attributes:
  id:
    name: id
    from_schema: https://raid.org/datamodel/api/raid/shared
    alias: id
    owner: Language
    domain_of:
    - Subject
    - SpatialCoverage
    - TraditionalKnowledgeLabel
    - Language
    range: string
  schemaUri:
    name: schemaUri
    from_schema: https://raid.org/datamodel/api/raid/shared
    alias: schemaUri
    owner: Language
    domain_of:
    - Subject
    - SpatialCoverage
    - TraditionalKnowledgeLabel
    - Language
    range: LanguageSchemaURIEnum

```
</details>