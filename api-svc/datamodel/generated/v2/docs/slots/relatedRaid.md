

# Slot: relatedRaid



URI: [https://raid.org/datamodel/api/raid/core/:relatedRaid](https://raid.org/datamodel/api/raid/core/:relatedRaid)



<!-- no inheritance hierarchy -->





## Applicable Classes

| Name | Description | Modifies Slot |
| --- | --- | --- |
| [RaidUpdateRequest](../classes/RaidUpdateRequest.md) |  |  no  |
| [RaidDto](../classes/RaidDto.md) |  |  no  |
| [RaidCreateRequest](../classes/RaidCreateRequest.md) |  |  no  |







## Properties

* Range: [RelatedRaid](../classes/RelatedRaid.md)

* Multivalued: True





## Identifier and Mapping Information







### Schema Source


* from schema: https://raid.org/datamodel/api/raid/core




## Mappings

| Mapping Type | Mapped Value |
| ---  | ---  |
| self | https://raid.org/datamodel/api/raid/core/:relatedRaid |
| native | https://raid.org/datamodel/api/raid/core/:relatedRaid |




## LinkML Source

<details>
```yaml
name: relatedRaid
from_schema: https://raid.org/datamodel/api/raid/core
rank: 1000
alias: relatedRaid
domain_of:
- RaidDto
range: RelatedRaid
multivalued: true
inlined: true
inlined_as_list: true

```
</details>