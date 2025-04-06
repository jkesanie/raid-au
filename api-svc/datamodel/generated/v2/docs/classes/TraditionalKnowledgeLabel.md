

# Class: TraditionalKnowledgeLabel



URI: [https://raid.org/datamodel/api/raid/extended/:TraditionalKnowledgeLabel](https://raid.org/datamodel/api/raid/extended/:TraditionalKnowledgeLabel)






```mermaid
 classDiagram
    class TraditionalKnowledgeLabel
    click TraditionalKnowledgeLabel href "../TraditionalKnowledgeLabel"
      TraditionalKnowledgeLabel : id
        
      TraditionalKnowledgeLabel : schemaUri
        
      
```




<!-- no inheritance hierarchy -->


## Slots

| Name | Cardinality and Range | Description | Inheritance |
| ---  | --- | --- | --- |
| [id](../slots/id.md) | 0..1 <br/> [String](../types/String.md) |  | direct |
| [schemaUri](../slots/schemaUri.md) | 0..1 <br/> [String](../types/String.md) |  | direct |









## Identifier and Mapping Information







### Schema Source


* from schema: https://raid.org/datamodel/api/raid/extended




## Mappings

| Mapping Type | Mapped Value |
| ---  | ---  |
| self | https://raid.org/datamodel/api/raid/extended/:TraditionalKnowledgeLabel |
| native | https://raid.org/datamodel/api/raid/extended/:TraditionalKnowledgeLabel |







## LinkML Source

<!-- TODO: investigate https://stackoverflow.com/questions/37606292/how-to-create-tabbed-code-blocks-in-mkdocs-or-sphinx -->

### Direct

<details>
```yaml
name: TraditionalKnowledgeLabel
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
    domain_of:
    - Subject
    - SpatialCoverage
    - TraditionalKnowledgeLabel
    - Language
    range: string

```
</details>

### Induced

<details>
```yaml
name: TraditionalKnowledgeLabel
from_schema: https://raid.org/datamodel/api/raid/extended
attributes:
  id:
    name: id
    from_schema: https://raid.org/datamodel/api/raid/extended
    alias: id
    owner: TraditionalKnowledgeLabel
    domain_of:
    - Subject
    - SpatialCoverage
    - TraditionalKnowledgeLabel
    - Language
    range: string
  schemaUri:
    name: schemaUri
    from_schema: https://raid.org/datamodel/api/raid/extended
    alias: schemaUri
    owner: TraditionalKnowledgeLabel
    domain_of:
    - Subject
    - SpatialCoverage
    - TraditionalKnowledgeLabel
    - Language
    range: string

```
</details>