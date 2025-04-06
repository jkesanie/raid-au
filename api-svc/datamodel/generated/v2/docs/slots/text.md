

# Slot: text



URI: [https://raid.org/datamodel/api/raid/core/:text](https://raid.org/datamodel/api/raid/core/:text)



<!-- no inheritance hierarchy -->





## Applicable Classes

| Name | Description | Modifies Slot |
| --- | --- | --- |
| [SubjectKeyword](../classes/SubjectKeyword.md) |  |  no  |
| [AccessStatement](../classes/AccessStatement.md) |  |  no  |
| [Title](../classes/Title.md) |  |  no  |
| [SpatialCoveragePlace](../classes/SpatialCoveragePlace.md) |  |  no  |
| [Description](../classes/Description.md) |  |  no  |







## Properties

* Range: [String](../types/String.md)





## Identifier and Mapping Information







### Schema Source


* from schema: https://raid.org/datamodel/api/raid/core




## Mappings

| Mapping Type | Mapped Value |
| ---  | ---  |
| self | https://raid.org/datamodel/api/raid/core/:text |
| native | https://raid.org/datamodel/api/raid/core/:text |




## LinkML Source

<details>
```yaml
name: text
from_schema: https://raid.org/datamodel/api/raid/core
rank: 1000
alias: text
domain_of:
- Title
- Description
- AccessStatement
- SubjectKeyword
- SpatialCoveragePlace
range: string

```
</details>