

# Slot: startDate



URI: [https://raid.org/datamodel/api/raid/core/:startDate](https://raid.org/datamodel/api/raid/core/:startDate)



<!-- no inheritance hierarchy -->





## Applicable Classes

| Name | Description | Modifies Slot |
| --- | --- | --- |
| [ContributorPosition](ContributorPosition.md) |  |  no  |
| [OrganisationRole](OrganisationRole.md) |  |  no  |
| [Date](Date.md) |  |  no  |
| [Title](Title.md) |  |  no  |







## Properties

* Range: [String](String.md)

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