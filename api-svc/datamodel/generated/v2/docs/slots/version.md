

# Slot: version


_The version of the resource. Read-only. Increments automatically on update._





URI: [https://raid.org/datamodel/api/raid/core/:version](https://raid.org/datamodel/api/raid/core/:version)



<!-- no inheritance hierarchy -->





## Applicable Classes

| Name | Description | Modifies Slot |
| --- | --- | --- |
| [Id](../classes/Id.md) |  |  no  |







## Properties

* Range: [Integer](../types/Integer.md)





## Identifier and Mapping Information







### Schema Source


* from schema: https://raid.org/datamodel/api/raid/core




## Mappings

| Mapping Type | Mapped Value |
| ---  | ---  |
| self | https://raid.org/datamodel/api/raid/core/:version |
| native | https://raid.org/datamodel/api/raid/core/:version |




## LinkML Source

<details>
```yaml
name: version
description: The version of the resource. Read-only. Increments automatically on update.
from_schema: https://raid.org/datamodel/api/raid/core
rank: 1000
alias: version
owner: Id
domain_of:
- Id
range: integer

```
</details>