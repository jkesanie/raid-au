

# Slot: title



URI: [https://raid.org/datamodel/api/raid/core/:title](https://raid.org/datamodel/api/raid/core/:title)



<!-- no inheritance hierarchy -->





## Applicable Classes

| Name | Description | Modifies Slot |
| --- | --- | --- |
| [RaidDto](RaidDto.md) |  |  no  |
| [RaidUpdateRequest](RaidUpdateRequest.md) |  |  yes  |
| [RaidCreateRequest](RaidCreateRequest.md) |  |  no  |







## Properties

* Range: [Title](Title.md)

* Multivalued: True





## Identifier and Mapping Information







### Schema Source


* from schema: https://raid.org/datamodel/api/raid/core




## Mappings

| Mapping Type | Mapped Value |
| ---  | ---  |
| self | https://raid.org/datamodel/api/raid/core/:title |
| native | https://raid.org/datamodel/api/raid/core/:title |




## LinkML Source

<details>
```yaml
name: title
from_schema: https://raid.org/datamodel/api/raid/core
rank: 1000
alias: title
domain_of:
- RaidDto
range: Title
multivalued: true
inlined: true
inlined_as_list: true

```
</details>