

# Slot: subject



URI: [https://raid.org/datamodel/api/raid/core/:subject](https://raid.org/datamodel/api/raid/core/:subject)



<!-- no inheritance hierarchy -->





## Applicable Classes

| Name | Description | Modifies Slot |
| --- | --- | --- |
| [RaidUpdateRequest](../classes/RaidUpdateRequest.md) |  |  no  |
| [RaidDto](../classes/RaidDto.md) |  |  no  |
| [RaidCreateRequest](../classes/RaidCreateRequest.md) |  |  no  |







## Properties

* Range: [Subject](../classes/Subject.md)

* Multivalued: True





## Identifier and Mapping Information







### Schema Source


* from schema: https://raid.org/datamodel/api/raid/core




## Mappings

| Mapping Type | Mapped Value |
| ---  | ---  |
| self | https://raid.org/datamodel/api/raid/core/:subject |
| native | https://raid.org/datamodel/api/raid/core/:subject |




## LinkML Source

<details>
```yaml
name: subject
from_schema: https://raid.org/datamodel/api/raid/core
rank: 1000
alias: subject
domain_of:
- RaidDto
range: Subject
multivalued: true
inlined: true
inlined_as_list: true

```
</details>