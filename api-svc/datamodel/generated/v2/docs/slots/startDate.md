

# Slot: startDate



URI: [https://raid.org/datamodel/api/raid/core/:startDate](https://raid.org/datamodel/api/raid/core/:startDate)



<!-- no inheritance hierarchy -->





## Applicable Classes

| Name | Description | Modifies Slot |
| --- | --- | --- |
| [Date](../classes/Date.md) |  |  no  |
| [OrganisationRole](../classes/OrganisationRole.md) |  |  no  |
| [Title](../classes/Title.md) |  |  no  |
| [ContributorPosition](../classes/ContributorPosition.md) |  |  no  |







## Properties

* Range: [String](../types/String.md)

* Required: True





## Identifier and Mapping Information







### Schema Source


* from schema: https://raid.org/datamodel/api/raid/core




## Mappings

| Mapping Type | Mapped Value |
| ---  | ---  |
| self | https://raid.org/datamodel/api/raid/core/:startDate |
| native | https://raid.org/datamodel/api/raid/core/:startDate |




## LinkML Source

<details>
```yaml
name: startDate
from_schema: https://raid.org/datamodel/api/raid/core
rank: 1000
alias: startDate
domain_of:
- Date
- Title
- ContributorPosition
- OrganisationRole
range: string
required: true

```
</details>