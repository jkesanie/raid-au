

# Slot: date



URI: [https://raid.org/datamodel/api/raid/core/:date](https://raid.org/datamodel/api/raid/core/:date)



<!-- no inheritance hierarchy -->





## Applicable Classes

| Name | Description | Modifies Slot |
| --- | --- | --- |
| [RaidUpdateRequest](../classes/RaidUpdateRequest.md) |  |  yes  |
| [RaidDto](../classes/RaidDto.md) |  |  no  |
| [RaidCreateRequest](../classes/RaidCreateRequest.md) |  |  no  |







## Properties

* Range: [Date](../classes/Date.md)

## Usages

| used by | used in | type | used |
| ---  | --- | --- | --- |
| [Access](../classes/Access.md) | [embargoExpiry](../slots/embargoExpiry.md) | range | [date](../slots/date.md) |






## Identifier and Mapping Information







### Schema Source


* from schema: https://raid.org/datamodel/api/raid/core




## Mappings

| Mapping Type | Mapped Value |
| ---  | ---  |
| self | https://raid.org/datamodel/api/raid/core/:date |
| native | https://raid.org/datamodel/api/raid/core/:date |




## LinkML Source

<details>
```yaml
name: date
from_schema: https://raid.org/datamodel/api/raid/core
rank: 1000
alias: date
domain_of:
- RaidDto
range: Date
multivalued: false

```
</details>