

# Slot: contributor



URI: [schema:author](http://schema.org/author)



<!-- no inheritance hierarchy -->





## Applicable Classes

| Name | Description | Modifies Slot |
| --- | --- | --- |
| [RaidPatchRequest](../classes/RaidPatchRequest.md) |  |  no  |
| [RaidUpdateRequest](../classes/RaidUpdateRequest.md) |  |  yes  |
| [RaidDto](../classes/RaidDto.md) |  |  no  |
| [RaidCreateRequest](../classes/RaidCreateRequest.md) |  |  no  |







## Properties

* Range: [Contributor](../classes/Contributor.md)

* Multivalued: True





## Identifier and Mapping Information







### Schema Source


* from schema: https://raid.org/datamodel/api/raid/core




## Mappings

| Mapping Type | Mapped Value |
| ---  | ---  |
| self | schema:author |
| native | https://raid.org/datamodel/api/raid/core/:contributor |




## LinkML Source

<details>
```yaml
name: contributor
from_schema: https://raid.org/datamodel/api/raid/core
rank: 1000
slot_uri: schema:author
alias: contributor
domain_of:
- RaidDto
- RaidPatchRequest
range: Contributor
multivalued: true
inlined: true
inlined_as_list: true

```
</details>