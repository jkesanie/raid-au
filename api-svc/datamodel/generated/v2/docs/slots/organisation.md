

# Slot: organisation



URI: [https://raid.org/datamodel/api/raid/core/:organisation](https://raid.org/datamodel/api/raid/core/:organisation)



<!-- no inheritance hierarchy -->





## Applicable Classes

| Name | Description | Modifies Slot |
| --- | --- | --- |
| [RaidUpdateRequest](../classes/RaidUpdateRequest.md) |  |  no  |
| [RaidDto](../classes/RaidDto.md) |  |  no  |
| [RaidCreateRequest](../classes/RaidCreateRequest.md) |  |  no  |







## Properties

* Range: [Organisation](../classes/Organisation.md)

* Multivalued: True





## Identifier and Mapping Information







### Schema Source


* from schema: https://raid.org/datamodel/api/raid/core




## Mappings

| Mapping Type | Mapped Value |
| ---  | ---  |
| self | https://raid.org/datamodel/api/raid/core/:organisation |
| native | https://raid.org/datamodel/api/raid/core/:organisation |




## LinkML Source

<details>
```yaml
name: organisation
from_schema: https://raid.org/datamodel/api/raid/core
rank: 1000
alias: organisation
domain_of:
- RaidDto
range: Organisation
multivalued: true
inlined: true
inlined_as_list: true

```
</details>