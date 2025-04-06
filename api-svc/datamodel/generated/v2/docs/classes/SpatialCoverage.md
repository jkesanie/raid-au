

# Class: SpatialCoverage



URI: [https://raid.org/datamodel/api/raid/extended/:SpatialCoverage](https://raid.org/datamodel/api/raid/extended/:SpatialCoverage)






```mermaid
 classDiagram
    class SpatialCoverage
    click SpatialCoverage href "../SpatialCoverage"
      SpatialCoverage : id
        
      SpatialCoverage : place
        
          
    
    
    SpatialCoverage --> "*" SpatialCoveragePlace : place
    click SpatialCoveragePlace href "../SpatialCoveragePlace"

        
      SpatialCoverage : schemaUri
        
          
    
    
    SpatialCoverage --> "0..1" SpatialCoverageSchemaUriEnum : schemaUri
    click SpatialCoverageSchemaUriEnum href "../SpatialCoverageSchemaUriEnum"

        
      
```




<!-- no inheritance hierarchy -->


## Slots

| Name | Cardinality and Range | Description | Inheritance |
| ---  | --- | --- | --- |
| [id](../slots/id.md) | 0..1 <br/> [String](../types/String.md) |  | direct |
| [schemaUri](../slots/schemaUri.md) | 0..1 <br/> [SpatialCoverageSchemaUriEnum](../enums/SpatialCoverageSchemaUriEnum.md) |  | direct |
| [place](../slots/place.md) | * <br/> [SpatialCoveragePlace](../classes/SpatialCoveragePlace.md) |  | direct |









## Identifier and Mapping Information







### Schema Source


* from schema: https://raid.org/datamodel/api/raid/extended




## Mappings

| Mapping Type | Mapped Value |
| ---  | ---  |
| self | https://raid.org/datamodel/api/raid/extended/:SpatialCoverage |
| native | https://raid.org/datamodel/api/raid/extended/:SpatialCoverage |







## LinkML Source

<!-- TODO: investigate https://stackoverflow.com/questions/37606292/how-to-create-tabbed-code-blocks-in-mkdocs-or-sphinx -->

### Direct

<details>
```yaml
name: SpatialCoverage
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
    range: SpatialCoverageSchemaUriEnum
  place:
    name: place
    from_schema: https://raid.org/datamodel/api/raid/extended
    rank: 1000
    domain_of:
    - SpatialCoverage
    range: SpatialCoveragePlace
    multivalued: true
    inlined: true
    inlined_as_list: true

```
</details>

### Induced

<details>
```yaml
name: SpatialCoverage
from_schema: https://raid.org/datamodel/api/raid/extended
attributes:
  id:
    name: id
    from_schema: https://raid.org/datamodel/api/raid/extended
    alias: id
    owner: SpatialCoverage
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
    owner: SpatialCoverage
    domain_of:
    - Subject
    - SpatialCoverage
    - TraditionalKnowledgeLabel
    - Language
    range: SpatialCoverageSchemaUriEnum
  place:
    name: place
    from_schema: https://raid.org/datamodel/api/raid/extended
    rank: 1000
    alias: place
    owner: SpatialCoverage
    domain_of:
    - SpatialCoverage
    range: SpatialCoveragePlace
    multivalued: true
    inlined: true
    inlined_as_list: true

```
</details>