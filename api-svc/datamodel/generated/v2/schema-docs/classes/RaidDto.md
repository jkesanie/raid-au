---
title: . RaidDto 
---
# RaidDto

**Description**:

None

**Requirement**:
optional



**Cardinality**:






##RaidDto.Metadata

**Description**:

None

**Requirement**:
optional



**Cardinality**:
0..1








###RaidDto.Metadata.created

**Description**:

None

**Requirement**:
optional



**Cardinality**:
0..1






 





###RaidDto.Metadata.updated

**Description**:

None

**Requirement**:
optional



**Cardinality**:
0..1






 





###RaidDto.Metadata.raidModelVersion

**Description**:

None

**Requirement**:
optional



**Cardinality**:






 



 




##RaidDto.Title

**Description**:

None

**Requirement**:
optional



**Cardinality**:
*








###RaidDto.Title.text

**Description**:

None

**Requirement**:
optional



**Cardinality**:
0..1






 





###RaidDto.Title.startDate

**Description**:

None

**Requirement**:
optional



**Cardinality**:






 





###RaidDto.Title.endDate

**Description**:

None

**Requirement**:
optional



**Cardinality**:






 


Language

###RaidDto.Title.Language

**Description**:

None

**Requirement**:
optional



**Cardinality**:
0..1








####RaidDto.Title.Language.id

**Description**:

None

**Requirement**:
optional



**Cardinality**:
1






 





####RaidDto.Title.Language.schemaUri

**Description**:

None

**Requirement**:
optional



**Cardinality**:







**Allowed values** (fetched at the time of the documentation generation):

* https://www.iso.org/standard/74575.html


This is a dynamic enumeration whose values are defined in externally managed vocabulary. 

Link to the vocabulary:

[https://vocabulary.raid.org/description.language.schemaUri/240](https://vocabulary.raid.org/description.language.schemaUri/240)










 





 



 



TitleType

###RaidDto.Title.TitleType

**Description**:

None

**Requirement**:
optional



**Cardinality**:








####RaidDto.Title.TitleType.id

**Description**:

None

**Requirement**:
optional



**Cardinality**:
1







**Allowed values** (fetched at the time of the documentation generation):

* https://vocabulary.raid.org/title.type.schema/156
* https://vocabulary.raid.org/title.type.schema/157
* https://vocabulary.raid.org/title.type.schema/4
* https://vocabulary.raid.org/title.type.schema/5


This is a dynamic enumeration whose values are defined in externally managed vocabulary. 

Link to the vocabulary:

[https://vocabulary.raid.org/title.type.schemaUri/382](https://vocabulary.raid.org/title.type.schemaUri/382)










 





 





####RaidDto.Title.TitleType.schemaUri

**Description**:

None

**Requirement**:
optional



**Cardinality**:







**Allowed values** (fetched at the time of the documentation generation):

* https://vocabulary.raid.org/title.type.schema/376


This is a dynamic enumeration whose values are defined in externally managed vocabulary. 

Link to the vocabulary:

[https://vocabulary.raid.org/title.type.schemaUri/377](https://vocabulary.raid.org/title.type.schemaUri/377)










 





 



 




 




##RaidDto.Date

**Description**:

Metadata schema block containing the start and end date of the RAiD.

**Requirement**:
mandatory



**Cardinality**:
1



**Examples**
```json
"date": {
    "startDate": "2009",
    "endDate": "2023-08-28"
}


```






###RaidDto.Date.startDate

**Description**:

None

**Requirement**:
optional



**Cardinality**:






 





###RaidDto.Date.endDate

**Description**:

None

**Requirement**:
optional



**Cardinality**:






 



 




##RaidDto.Description

**Description**:

None

**Requirement**:
optional



**Cardinality**:
*








###RaidDto.Description.text

**Description**:

None

**Requirement**:
optional



**Cardinality**:
0..1






 


Language

###RaidDto.Description.Language

**Description**:

None

**Requirement**:
optional



**Cardinality**:
0..1








####RaidDto.Description.Language.id

**Description**:

None

**Requirement**:
optional



**Cardinality**:
1






 





####RaidDto.Description.Language.schemaUri

**Description**:

None

**Requirement**:
optional



**Cardinality**:







**Allowed values** (fetched at the time of the documentation generation):

* https://www.iso.org/standard/74575.html


This is a dynamic enumeration whose values are defined in externally managed vocabulary. 

Link to the vocabulary:

[https://vocabulary.raid.org/description.language.schemaUri/240](https://vocabulary.raid.org/description.language.schemaUri/240)










 





 



 



DescriptionType

###RaidDto.Description.DescriptionType

**Description**:

None

**Requirement**:
optional



**Cardinality**:








####RaidDto.Description.DescriptionType.id

**Description**:

None

**Requirement**:
optional



**Cardinality**:
1







**Allowed values** (fetched at the time of the documentation generation):

* https://vocabulary.raid.org/description.type.schema/3
* https://vocabulary.raid.org/description.type.schema/318
* https://vocabulary.raid.org/description.type.schema/319
* https://vocabulary.raid.org/description.type.schema/6
* https://vocabulary.raid.org/description.type.schema/7
* https://vocabulary.raid.org/description.type.schema/8
* https://vocabulary.raid.org/description.type.schema/9


This is a dynamic enumeration whose values are defined in externally managed vocabulary. 

Link to the vocabulary:

[https://vocabulary.raid.org/description.type.schemaUri/276](https://vocabulary.raid.org/description.type.schemaUri/276)










 





 





####RaidDto.Description.DescriptionType.schemaUri

**Description**:

None

**Requirement**:
optional



**Cardinality**:







**Allowed values** (fetched at the time of the documentation generation):

* https://vocabulary.raid.org/description.type.schema/320


This is a dynamic enumeration whose values are defined in externally managed vocabulary. 

Link to the vocabulary:

[https://vocabulary.raid.org/description.type.schemaUri/275](https://vocabulary.raid.org/description.type.schemaUri/275)










 





 



 




 




##RaidDto.Access

**Description**:

None

**Requirement**:
optional



**Cardinality**:
0..1





AccessType

###RaidDto.Access.AccessType

**Description**:

None

**Requirement**:
optional



**Cardinality**:








####RaidDto.Access.AccessType.id

**Description**:

None

**Requirement**:
optional



**Cardinality**:
1







**Allowed values** (fetched at the time of the documentation generation):

* https://vocabularies.coar-repositories.org/access_rights/c_abf2/
* https://vocabularies.coar-repositories.org/access_rights/c_f1cf/


This is a dynamic enumeration whose values are defined in externally managed vocabulary. 

Link to the vocabulary:

[https://vocabulary.raid.org/access.type.schemaUri/208](https://vocabulary.raid.org/access.type.schemaUri/208)










 





 





####RaidDto.Access.AccessType.schemaUri

**Description**:

None

**Requirement**:
optional



**Cardinality**:







**Allowed values** (fetched at the time of the documentation generation):

* https://vocabularies.coar-repositories.org/access_rights/


This is a dynamic enumeration whose values are defined in externally managed vocabulary. 

Link to the vocabulary:

[https://vocabulary.raid.org/access.type.schemaUri/207](https://vocabulary.raid.org/access.type.schemaUri/207)










 





 



 



AccessStatement

###RaidDto.Access.AccessStatement

**Description**:

None

**Requirement**:
optional



**Cardinality**:








####RaidDto.Access.AccessStatement.text

**Description**:

None

**Requirement**:
optional



**Cardinality**:
0..1






 


Language

####RaidDto.Access.AccessStatement.Language

**Description**:

None

**Requirement**:
optional



**Cardinality**:
0..1








#####RaidDto.Access.AccessStatement.Language.id

**Description**:

None

**Requirement**:
optional



**Cardinality**:
1






 





#####RaidDto.Access.AccessStatement.Language.schemaUri

**Description**:

None

**Requirement**:
optional



**Cardinality**:







**Allowed values** (fetched at the time of the documentation generation):

* https://www.iso.org/standard/74575.html


This is a dynamic enumeration whose values are defined in externally managed vocabulary. 

Link to the vocabulary:

[https://vocabulary.raid.org/description.language.schemaUri/240](https://vocabulary.raid.org/description.language.schemaUri/240)










 





 



 




 






###RaidDto.Access.embargoExpiry

**Description**:

None

**Requirement**:
optional



**Cardinality**:






 



 




##RaidDto.AlternateUrl

**Description**:

None

**Requirement**:
optional



**Cardinality**:








###RaidDto.AlternateUrl.url

**Description**:

None

**Requirement**:
optional



**Cardinality**:
0..1






 



 




##RaidDto.Contributor

**Description**:

None

**Requirement**:
optional



**Cardinality**:
*








###RaidDto.Contributor.id

**Description**:

None

**Requirement**:
mandatory



**Cardinality**:
1






 





###RaidDto.Contributor.status

**Description**:

None

**Requirement**:
optional



**Cardinality**:
0..1






 





###RaidDto.Contributor.statusMessage

**Description**:

None

**Requirement**:
optional



**Cardinality**:






 





###RaidDto.Contributor.uuid

**Description**:

None

**Requirement**:
optional



**Cardinality**:
0..1






 





###RaidDto.Contributor.schemaUri

**Description**:

None

**Requirement**:
optional



**Cardinality**:







**Allowed values** (fetched at the time of the documentation generation):

* https://isni.org/
* https://orcid.org/


This is a dynamic enumeration whose values are defined in externally managed vocabulary. 

Link to the vocabulary:

[https://vocabulary.raid.org/contributor.schemaUri/215](https://vocabulary.raid.org/contributor.schemaUri/215)










 





 


ContributorPosition

###RaidDto.Contributor.ContributorPosition

**Description**:

None

**Requirement**:
optional



**Cardinality**:








####RaidDto.Contributor.ContributorPosition.startDate

**Description**:

None

**Requirement**:
optional



**Cardinality**:






 





####RaidDto.Contributor.ContributorPosition.endDate

**Description**:

None

**Requirement**:
optional



**Cardinality**:






 





####RaidDto.Contributor.ContributorPosition.schemaUri

**Description**:

None

**Requirement**:
optional



**Cardinality**:







**Allowed values** (fetched at the time of the documentation generation):

* https://vocabulary.raid.org/contributor.position.schema/305


This is a dynamic enumeration whose values are defined in externally managed vocabulary. 

Link to the vocabulary:

[https://vocabulary.raid.org/contributor.position.schemaUri/277](https://vocabulary.raid.org/contributor.position.schemaUri/277)










 





 





####RaidDto.Contributor.ContributorPosition.id

**Description**:

None

**Requirement**:
mandatory



**Cardinality**:
1







**Allowed values** (fetched at the time of the documentation generation):

* https://vocabulary.raid.org/contributor.position.schema/307
* https://vocabulary.raid.org/contributor.position.schema/308
* https://vocabulary.raid.org/contributor.position.schema/309
* https://vocabulary.raid.org/contributor.position.schema/310
* https://vocabulary.raid.org/contributor.position.schema/311


This is a dynamic enumeration whose values are defined in externally managed vocabulary. 

Link to the vocabulary:

[https://vocabulary.raid.org/contributor.position.schemaUri/306](https://vocabulary.raid.org/contributor.position.schemaUri/306)










 





 



 



ContributorRole

###RaidDto.Contributor.ContributorRole

**Description**:

None

**Requirement**:
optional



**Cardinality**:








####RaidDto.Contributor.ContributorRole.schemaUri

**Description**:

None

**Requirement**:
optional



**Cardinality**:







**Allowed values** (fetched at the time of the documentation generation):

* https://credit.niso.org/


This is a dynamic enumeration whose values are defined in externally managed vocabulary. 

Link to the vocabulary:

[https://vocabulary.raid.org/contributor.role.schemaUri/165](https://vocabulary.raid.org/contributor.role.schemaUri/165)










 





 





####RaidDto.Contributor.ContributorRole.id

**Description**:

None

**Requirement**:
mandatory



**Cardinality**:
1







**Allowed values** (fetched at the time of the documentation generation):

* https://credit.niso.org/contributor-role/conceptualization/
* https://credit.niso.org/contributor-role/data-curation/
* https://credit.niso.org/contributor-role/formal-analysis/
* https://credit.niso.org/contributor-role/funding-acquisition/
* https://credit.niso.org/contributor-role/investigation/
* https://credit.niso.org/contributor-role/methodology/
* https://credit.niso.org/contributor-role/project-administration/
* https://credit.niso.org/contributor-role/resources/
* https://credit.niso.org/contributor-role/software/
* https://credit.niso.org/contributor-role/supervision/
* https://credit.niso.org/contributor-role/validation/
* https://credit.niso.org/contributor-role/visualization/
* https://credit.niso.org/contributor-role/writing-original-draft/
* https://credit.niso.org/contributor-role/writing-review-editing/


This is a dynamic enumeration whose values are defined in externally managed vocabulary. 

Link to the vocabulary:

[https://vocabulary.raid.org/contributor.role.schemaUri/166](https://vocabulary.raid.org/contributor.role.schemaUri/166)










 





 



 






###RaidDto.Contributor.leader

**Description**:

None

**Requirement**:
optional



**Cardinality**:
0..1






 





###RaidDto.Contributor.contact

**Description**:

None

**Requirement**:
optional



**Cardinality**:
0..1






 





###RaidDto.Contributor.email

**Description**:

None

**Requirement**:
optional



**Cardinality**:
0..1






 



 




##RaidDto.Organisation

**Description**:

None

**Requirement**:
optional



**Cardinality**:
*








###RaidDto.Organisation.id

**Description**:

None

**Requirement**:
mandatory



**Cardinality**:
1






 





###RaidDto.Organisation.schemaUri

**Description**:

None

**Requirement**:
optional



**Cardinality**:







**Allowed values** (fetched at the time of the documentation generation):

* https://ror.org/


This is a dynamic enumeration whose values are defined in externally managed vocabulary. 

Link to the vocabulary:

[https://vocabulary.raid.org/organisation.schemaUri/158](https://vocabulary.raid.org/organisation.schemaUri/158)










 





 


OrganisationRole

###RaidDto.Organisation.OrganisationRole

**Description**:

None

**Requirement**:
optional



**Cardinality**:








####RaidDto.Organisation.OrganisationRole.startDate

**Description**:

None

**Requirement**:
optional



**Cardinality**:






 





####RaidDto.Organisation.OrganisationRole.endDate

**Description**:

None

**Requirement**:
optional



**Cardinality**:






 





####RaidDto.Organisation.OrganisationRole.schemaUri

**Description**:

None

**Requirement**:
optional



**Cardinality**:







**Allowed values** (fetched at the time of the documentation generation):

* https://vocabulary.raid.org/organisation.role.schema/359


This is a dynamic enumeration whose values are defined in externally managed vocabulary. 

Link to the vocabulary:

[https://vocabulary.raid.org/organisation.role.schemaUri/281](https://vocabulary.raid.org/organisation.role.schemaUri/281)










 





 





####RaidDto.Organisation.OrganisationRole.id

**Description**:

None

**Requirement**:
mandatory



**Cardinality**:
1







**Allowed values** (fetched at the time of the documentation generation):

* https://vocabulary.raid.org/organisation.role.schema/182
* https://vocabulary.raid.org/organisation.role.schema/183
* https://vocabulary.raid.org/organisation.role.schema/184
* https://vocabulary.raid.org/organisation.role.schema/185
* https://vocabulary.raid.org/organisation.role.schema/186
* https://vocabulary.raid.org/organisation.role.schema/187
* https://vocabulary.raid.org/organisation.role.schema/188


This is a dynamic enumeration whose values are defined in externally managed vocabulary. 

Link to the vocabulary:

[https://vocabulary.raid.org/organisation.schemaUri/282](https://vocabulary.raid.org/organisation.schemaUri/282)










 





 



 




 




##RaidDto.RelatedRaid

**Description**:

None

**Requirement**:
optional



**Cardinality**:








###RaidDto.RelatedRaid.id

**Description**:

None

**Requirement**:
mandatory



**Cardinality**:
1






 


RelatedRaidType

###RaidDto.RelatedRaid.RelatedRaidType

**Description**:

None

**Requirement**:
optional



**Cardinality**:








####RaidDto.RelatedRaid.RelatedRaidType.id

**Description**:

None

**Requirement**:
mandatory



**Cardinality**:
1







**Allowed values** (fetched at the time of the documentation generation):

* https://vocabulary.raid.org/relatedRaid.type.schema/198
* https://vocabulary.raid.org/relatedRaid.type.schema/199
* https://vocabulary.raid.org/relatedRaid.type.schema/200
* https://vocabulary.raid.org/relatedRaid.type.schema/201
* https://vocabulary.raid.org/relatedRaid.type.schema/202
* https://vocabulary.raid.org/relatedRaid.type.schema/203
* https://vocabulary.raid.org/relatedRaid.type.schema/204
* https://vocabulary.raid.org/relatedRaid.type.schema/205


This is a dynamic enumeration whose values are defined in externally managed vocabulary. 

Link to the vocabulary:

[https://vocabulary.raid.org/relatedRaid.type.schemaUri/286](https://vocabulary.raid.org/relatedRaid.type.schemaUri/286)










 





 





####RaidDto.RelatedRaid.RelatedRaidType.schemaUri

**Description**:

None

**Requirement**:
optional



**Cardinality**:







**Allowed values** (fetched at the time of the documentation generation):

* https://vocabulary.raid.org/relatedRaid.type.schema/367


This is a dynamic enumeration whose values are defined in externally managed vocabulary. 

Link to the vocabulary:

[https://vocabulary.raid.org/relatedRaid.type.schemaUri/285](https://vocabulary.raid.org/relatedRaid.type.schemaUri/285)










 





 



 




 




##RaidDto.RelatedObject

**Description**:

None

**Requirement**:
optional



**Cardinality**:








###RaidDto.RelatedObject.id

**Description**:

None

**Requirement**:
mandatory



**Cardinality**:
1






 





###RaidDto.RelatedObject.schemaUri

**Description**:

None

**Requirement**:
optional



**Cardinality**:







**Allowed values** (fetched at the time of the documentation generation):

* http://doi.org/
* http://hdl.handle.net/
* https://archive.org/
* https://arks.org/
* https://scicrunch.org/resolver/
* https://www.isbn-international.org/


This is a dynamic enumeration whose values are defined in externally managed vocabulary. 

Link to the vocabulary:

[https://vocabulary.raid.org/relatedObject.schemaUri/218](https://vocabulary.raid.org/relatedObject.schemaUri/218)










 





 


RelatedObjectType

###RaidDto.RelatedObject.RelatedObjectType

**Description**:

None

**Requirement**:
optional



**Cardinality**:








####RaidDto.RelatedObject.RelatedObjectType.id

**Description**:

None

**Requirement**:
mandatory



**Cardinality**:
1







**Allowed values** (fetched at the time of the documentation generation):

* https://vocabulary.raid.org/relatedObject.type.schema/247
* https://vocabulary.raid.org/relatedObject.type.schema/248
* https://vocabulary.raid.org/relatedObject.type.schema/249
* https://vocabulary.raid.org/relatedObject.type.schema/250
* https://vocabulary.raid.org/relatedObject.type.schema/251
* https://vocabulary.raid.org/relatedObject.type.schema/252
* https://vocabulary.raid.org/relatedObject.type.schema/253
* https://vocabulary.raid.org/relatedObject.type.schema/254
* https://vocabulary.raid.org/relatedObject.type.schema/255
* https://vocabulary.raid.org/relatedObject.type.schema/256
* https://vocabulary.raid.org/relatedObject.type.schema/257
* https://vocabulary.raid.org/relatedObject.type.schema/258
* https://vocabulary.raid.org/relatedObject.type.schema/259
* https://vocabulary.raid.org/relatedObject.type.schema/260
* https://vocabulary.raid.org/relatedObject.type.schema/261
* https://vocabulary.raid.org/relatedObject.type.schema/262
* https://vocabulary.raid.org/relatedObject.type.schema/263
* https://vocabulary.raid.org/relatedObject.type.schema/264
* https://vocabulary.raid.org/relatedObject.type.schema/265
* https://vocabulary.raid.org/relatedObject.type.schema/266
* https://vocabulary.raid.org/relatedObject.type.schema/267
* https://vocabulary.raid.org/relatedObject.type.schema/268
* https://vocabulary.raid.org/relatedObject.type.schema/269
* https://vocabulary.raid.org/relatedObject.type.schema/270
* https://vocabulary.raid.org/relatedObject.type.schema/271
* https://vocabulary.raid.org/relatedObject.type.schema/272
* https://vocabulary.raid.org/relatedObject.type.schema/273
* https://vocabulary.raid.org/relatedObject.type.schema/274


This is a dynamic enumeration whose values are defined in externally managed vocabulary. 

Link to the vocabulary:

[https://vocabulary.raid.org/relatedObject.type.schemaUri/284](https://vocabulary.raid.org/relatedObject.type.schemaUri/284)










 





 





####RaidDto.RelatedObject.RelatedObjectType.schemaUri

**Description**:

None

**Requirement**:
optional



**Cardinality**:







**Allowed values** (fetched at the time of the documentation generation):

* https://vocabulary.raid.org/relatedObject.type.schema/329


This is a dynamic enumeration whose values are defined in externally managed vocabulary. 

Link to the vocabulary:

[https://vocabulary.raid.org/relatedObject.type.schemaUri/283](https://vocabulary.raid.org/relatedObject.type.schemaUri/283)










 





 



 



RelatedObjectCategory

###RaidDto.RelatedObject.RelatedObjectCategory

**Description**:

None

**Requirement**:
optional



**Cardinality**:








####RaidDto.RelatedObject.RelatedObjectCategory.id

**Description**:

None

**Requirement**:
mandatory



**Cardinality**:
1







**Allowed values** (fetched at the time of the documentation generation):

* https://vocabulary.raid.org/relatedObject.category.id/190
* https://vocabulary.raid.org/relatedObject.category.id/191
* https://vocabulary.raid.org/relatedObject.category.id/192


This is a dynamic enumeration whose values are defined in externally managed vocabulary. 

Link to the vocabulary:

[https://vocabulary.raid.org/raid_placeholder/387](https://vocabulary.raid.org/raid_placeholder/387)










 





 





####RaidDto.RelatedObject.RelatedObjectCategory.schemaUri

**Description**:

None

**Requirement**:
optional



**Cardinality**:







**Allowed values** (fetched at the time of the documentation generation):

* https://vocabulary.raid.org/relatedObject.category.schema/385


This is a dynamic enumeration whose values are defined in externally managed vocabulary. 

Link to the vocabulary:

[https://vocabulary.raid.org/relatedObject.category.schemaUri/386](https://vocabulary.raid.org/relatedObject.category.schemaUri/386)










 





 



 




 




##RaidDto.AlternateIdentifier

**Description**:

None

**Requirement**:
optional



**Cardinality**:








###RaidDto.AlternateIdentifier.id

**Description**:

None

**Requirement**:
mandatory



**Cardinality**:
1






 





###RaidDto.AlternateIdentifier.type

**Description**:

None

**Requirement**:
optional



**Cardinality**:
0..1






 



 




##RaidDto.Subject

**Description**:

None

**Requirement**:
optional



**Cardinality**:
*








###RaidDto.Subject.id

**Description**:

None

**Requirement**:
mandatory



**Cardinality**:
1






 





###RaidDto.Subject.schemaUri

**Description**:

None

**Requirement**:
optional



**Cardinality**:













 





 


SubjectKeyword

###RaidDto.Subject.SubjectKeyword

**Description**:

None

**Requirement**:
optional



**Cardinality**:








####RaidDto.Subject.SubjectKeyword.text

**Description**:

None

**Requirement**:
optional



**Cardinality**:
0..1






 


Language

####RaidDto.Subject.SubjectKeyword.Language

**Description**:

None

**Requirement**:
optional



**Cardinality**:
0..1








#####RaidDto.Subject.SubjectKeyword.Language.id

**Description**:

None

**Requirement**:
mandatory



**Cardinality**:
1






 





#####RaidDto.Subject.SubjectKeyword.Language.schemaUri

**Description**:

None

**Requirement**:
optional



**Cardinality**:







**Allowed values** (fetched at the time of the documentation generation):

* https://www.iso.org/standard/74575.html


This is a dynamic enumeration whose values are defined in externally managed vocabulary. 

Link to the vocabulary:

[https://vocabulary.raid.org/description.language.schemaUri/240](https://vocabulary.raid.org/description.language.schemaUri/240)










 





 



 




 




 




##RaidDto.SpatialCoverage

**Description**:

None

**Requirement**:
optional



**Cardinality**:








###RaidDto.SpatialCoverage.id

**Description**:

None

**Requirement**:
mandatory



**Cardinality**:
1






 





###RaidDto.SpatialCoverage.schemaUri

**Description**:

None

**Requirement**:
optional



**Cardinality**:













 





 


SpatialCoveragePlace

###RaidDto.SpatialCoverage.SpatialCoveragePlace

**Description**:

None

**Requirement**:
optional



**Cardinality**:








####RaidDto.SpatialCoverage.SpatialCoveragePlace.text

**Description**:

None

**Requirement**:
optional



**Cardinality**:
0..1






 


Language

####RaidDto.SpatialCoverage.SpatialCoveragePlace.Language

**Description**:

None

**Requirement**:
optional



**Cardinality**:
0..1








#####RaidDto.SpatialCoverage.SpatialCoveragePlace.Language.id

**Description**:

None

**Requirement**:
mandatory



**Cardinality**:
1






 





#####RaidDto.SpatialCoverage.SpatialCoveragePlace.Language.schemaUri

**Description**:

None

**Requirement**:
optional



**Cardinality**:







**Allowed values** (fetched at the time of the documentation generation):

* https://www.iso.org/standard/74575.html


This is a dynamic enumeration whose values are defined in externally managed vocabulary. 

Link to the vocabulary:

[https://vocabulary.raid.org/description.language.schemaUri/240](https://vocabulary.raid.org/description.language.schemaUri/240)










 





 



 




 




 




##RaidDto.TraditionalKnowledgeLabel

**Description**:

None

**Requirement**:
optional



**Cardinality**:








###RaidDto.TraditionalKnowledgeLabel.id

**Description**:

None

**Requirement**:
mandatory



**Cardinality**:
1






 





###RaidDto.TraditionalKnowledgeLabel.schemaUri

**Description**:

None

**Requirement**:
optional



**Cardinality**:






 



 




##RaidDto.Id

**Description**:

None

**Requirement**:
mandatory



**Cardinality**:
1








###RaidDto.Id.id

**Description**:

The identifier of the raid, e.g. https://raid.org.au/102.100.100/zzz

**Requirement**:
mandatory



**Cardinality**:
1






 





###RaidDto.Id.schemaUri

**Description**:

None

**Requirement**:
optional



**Cardinality**:










## Slots

| Name | Description |
| ---  | --- |
| [schemaUri](../slots/schemaUri.md) |  |




 





 


RegistrationAgency

###RaidDto.Id.RegistrationAgency

**Description**:

None

**Requirement**:
optional



**Cardinality**:








####RaidDto.Id.RegistrationAgency.id

**Description**:

None

**Requirement**:
mandatory



**Cardinality**:
1






 





####RaidDto.Id.RegistrationAgency.schemaUri

**Description**:

None

**Requirement**:
optional



**Cardinality**:













 





 



 



Owner

###RaidDto.Id.Owner

**Description**:

None

**Requirement**:
optional



**Cardinality**:
0..1








####RaidDto.Id.Owner.id

**Description**:

None

**Requirement**:
mandatory



**Cardinality**:
1






 





####RaidDto.Id.Owner.schemaUri

**Description**:

None

**Requirement**:
optional



**Cardinality**:













 





 





####RaidDto.Id.Owner.servicePoint

**Description**:

None

**Requirement**:
optional



**Cardinality**:






 



 






###RaidDto.Id.raidAgencyUrl

**Description**:

The URL for the raid via the minting raid agency system


**Requirement**:
optional



**Cardinality**:






 





###RaidDto.Id.license

**Description**:

The license under which the RAiD Metadata Record associated with this Identifier has been issued.

**Requirement**:
optional



**Cardinality**:
0..1






 





###RaidDto.Id.version

**Description**:

The version of the resource. Read-only. Increments automatically on update.

**Requirement**:
optional



**Cardinality**:
0..1






 



 



