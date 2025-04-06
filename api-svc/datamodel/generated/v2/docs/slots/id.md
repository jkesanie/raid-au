

# Slot: id



URI: [https://raid.org/datamodel/api/raid/core/:id](https://raid.org/datamodel/api/raid/core/:id)



<!-- no inheritance hierarchy -->





## Applicable Classes

| Name | Description | Modifies Slot |
| --- | --- | --- |
| [Id](../classes/Id.md) |  |  no  |
| [TraditionalKnowledgeLabel](../classes/TraditionalKnowledgeLabel.md) |  |  no  |
| [DescriptionType](../classes/DescriptionType.md) |  |  no  |
| [ContributorPosition](../classes/ContributorPosition.md) |  |  no  |
| [Subject](../classes/Subject.md) |  |  no  |
| [Owner](../classes/Owner.md) |  |  no  |
| [ClosedRaid](../classes/ClosedRaid.md) |  |  no  |
| [RegistrationAgency](../classes/RegistrationAgency.md) |  |  no  |
| [RelatedObject](../classes/RelatedObject.md) |  |  no  |
| [ContributorRole](../classes/ContributorRole.md) |  |  no  |
| [RelatedRaid](../classes/RelatedRaid.md) |  |  no  |
| [RelatedObjectType](../classes/RelatedObjectType.md) |  |  no  |
| [Contributor](../classes/Contributor.md) |  |  no  |
| [OrganisationRole](../classes/OrganisationRole.md) |  |  no  |
| [RelatedObjectCategory](../classes/RelatedObjectCategory.md) |  |  no  |
| [Language](../classes/Language.md) |  |  no  |
| [RelatedRaidType](../classes/RelatedRaidType.md) |  |  no  |
| [SpatialCoverage](../classes/SpatialCoverage.md) |  |  no  |
| [AccessType](../classes/AccessType.md) |  |  no  |
| [AlternateIdentifier](../classes/AlternateIdentifier.md) |  |  no  |
| [TitleType](../classes/TitleType.md) |  |  no  |
| [Organisation](../classes/Organisation.md) |  |  no  |







## Properties

* Range: [String](../types/String.md)

* Required: True





## Identifier and Mapping Information







### Schema Source


* from schema: https://raid.org/datamodel/api/raid/core




## Mappings

| Mapping Type | Mapped Value |
| ---  | ---  |
| self | https://raid.org/datamodel/api/raid/core/:id |
| native | https://raid.org/datamodel/api/raid/core/:id |




## LinkML Source

<details>
```yaml
name: id
from_schema: https://raid.org/datamodel/api/raid/core
rank: 1000
identifier: true
alias: id
domain_of:
- ClosedRaid
- Id
- Contributor
- Organisation
- RelatedRaid
- RelatedObject
- AlternateIdentifier
- Owner
- RegistrationAgency
- TitleType
- DescriptionType
- AccessType
- ContributorPosition
- ContributorRole
- OrganisationRole
- RelatedRaidType
- RelatedObjectType
- RelatedObjectCategory
- Language
- Subject
- SpatialCoverage
- TraditionalKnowledgeLabel
range: string
required: true

```
</details>