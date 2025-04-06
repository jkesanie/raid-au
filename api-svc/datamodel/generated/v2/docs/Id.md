

# Slot: id



URI: [https://raid.org/datamodel/api/raid/core/:id](https://raid.org/datamodel/api/raid/core/:id)



<!-- no inheritance hierarchy -->





## Applicable Classes

| Name | Description | Modifies Slot |
| --- | --- | --- |
| [RelatedObjectType](RelatedObjectType.md) |  |  no  |
| [RelatedObject](RelatedObject.md) |  |  no  |
| [TitleType](TitleType.md) |  |  no  |
| [OrganisationRole](OrganisationRole.md) |  |  no  |
| [RelatedObjectCategory](RelatedObjectCategory.md) |  |  no  |
| [Contributor](Contributor.md) |  |  no  |
| [SpatialCoverage](SpatialCoverage.md) |  |  no  |
| [ContributorPosition](ContributorPosition.md) |  |  no  |
| [AccessType](AccessType.md) |  |  no  |
| [AlternateIdentifier](AlternateIdentifier.md) |  |  no  |
| [RelatedRaidType](RelatedRaidType.md) |  |  no  |
| [ClosedRaid](ClosedRaid.md) |  |  no  |
| [RelatedRaid](RelatedRaid.md) |  |  no  |
| [Subject](Subject.md) |  |  no  |
| [Owner](Owner.md) |  |  no  |
| [ContributorRole](ContributorRole.md) |  |  no  |
| [Organisation](Organisation.md) |  |  no  |
| [Language](Language.md) |  |  no  |
| [RegistrationAgency](RegistrationAgency.md) |  |  no  |
| [Id](Id.md) |  |  no  |
| [TraditionalKnowledgeLabel](TraditionalKnowledgeLabel.md) |  |  no  |
| [DescriptionType](DescriptionType.md) |  |  no  |







## Properties

* Range: [String](String.md)

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