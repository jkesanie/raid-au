

# Class: Subject



URI: [https://raid.org/datamodel/api/raid/extended/:Subject](https://raid.org/datamodel/api/raid/extended/:Subject)






```mermaid
 classDiagram
    class Subject
    click Subject href "../Subject"
      Subject : id
        
      Subject : keyword
        
          
    
    
    Subject --> "*" SubjectKeyword : keyword
    click SubjectKeyword href "../SubjectKeyword"

        
      Subject : schemaUri
        
          
    
    
    Subject --> "0..1" SubjectSchemaURIEnum : schemaUri
    click SubjectSchemaURIEnum href "../SubjectSchemaURIEnum"

        
      
```




<!-- no inheritance hierarchy -->


## Slots

| Name | Cardinality and Range | Description | Inheritance |
| ---  | --- | --- | --- |
| [id](../slots/id.md) | 0..1 <br/> [String](../types/String.md) |  | direct |
| [schemaUri](../slots/schemaUri.md) | 0..1 <br/> [SubjectSchemaURIEnum](../enums/SubjectSchemaURIEnum.md) |  | direct |
| [keyword](../slots/keyword.md) | * <br/> [SubjectKeyword](../classes/SubjectKeyword.md) |  | direct |









## Identifier and Mapping Information







### Schema Source


* from schema: https://raid.org/datamodel/api/raid/extended




## Mappings

| Mapping Type | Mapped Value |
| ---  | ---  |
| self | https://raid.org/datamodel/api/raid/extended/:Subject |
| native | https://raid.org/datamodel/api/raid/extended/:Subject |







## LinkML Source

<!-- TODO: investigate https://stackoverflow.com/questions/37606292/how-to-create-tabbed-code-blocks-in-mkdocs-or-sphinx -->

### Direct

<details>
```yaml
name: Subject
from_schema: https://raid.org/datamodel/api/raid/extended
attributes:
  id:
    name: id
    from_schema: https://raid.org/datamodel/api/raid/extended
    domain_of:
    - Subject
    - SpatialCoverage
    - TraditionalKnowledgeLabel
    - Language
    range: string
  schemaUri:
    name: schemaUri
    from_schema: https://raid.org/datamodel/api/raid/extended
    rank: 1000
    domain_of:
    - Subject
    - SpatialCoverage
    - TraditionalKnowledgeLabel
    - Language
    range: SubjectSchemaURIEnum
  keyword:
    name: keyword
    from_schema: https://raid.org/datamodel/api/raid/extended
    rank: 1000
    domain_of:
    - Subject
    range: SubjectKeyword
    multivalued: true
    inlined: true
    inlined_as_list: true

```
</details>

### Induced

<details>
```yaml
name: Subject
from_schema: https://raid.org/datamodel/api/raid/extended
attributes:
  id:
    name: id
    from_schema: https://raid.org/datamodel/api/raid/extended
    alias: id
    owner: Subject
    domain_of:
    - Subject
    - SpatialCoverage
    - TraditionalKnowledgeLabel
    - Language
    range: string
  schemaUri:
    name: schemaUri
    from_schema: https://raid.org/datamodel/api/raid/extended
    rank: 1000
    alias: schemaUri
    owner: Subject
    domain_of:
    - Subject
    - SpatialCoverage
    - TraditionalKnowledgeLabel
    - Language
    range: SubjectSchemaURIEnum
  keyword:
    name: keyword
    from_schema: https://raid.org/datamodel/api/raid/extended
    rank: 1000
    alias: keyword
    owner: Subject
    domain_of:
    - Subject
    range: SubjectKeyword
    multivalued: true
    inlined_as_list: true

```
</details>