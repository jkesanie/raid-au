

# Class: RaidCreateRequest



URI: [https://raid.org/datamodel/api/raid/core/:RaidCreateRequest](https://raid.org/datamodel/api/raid/core/:RaidCreateRequest)






```mermaid
 classDiagram
    class RaidCreateRequest
    click RaidCreateRequest href "../RaidCreateRequest"
      RaidDto <|-- RaidCreateRequest
        click RaidDto href "../RaidDto"
      
      RaidCreateRequest : access
        
          
    
    
    RaidCreateRequest --> "0..1" Access : access
    click Access href "../Access"

        
      RaidCreateRequest : alternateIdentifier
        
          
    
    
    RaidCreateRequest --> "*" AlternateIdentifier : alternateIdentifier
    click AlternateIdentifier href "../AlternateIdentifier"

        
      RaidCreateRequest : alternateUrl
        
          
    
    
    RaidCreateRequest --> "*" AlternateUrl : alternateUrl
    click AlternateUrl href "../AlternateUrl"

        
      RaidCreateRequest : contributor
        
          
    
    
    RaidCreateRequest --> "*" Contributor : contributor
    click Contributor href "../Contributor"

        
      RaidCreateRequest : date
        
          
    
    
    RaidCreateRequest --> "0..1" Date : date
    click Date href "../Date"

        
      RaidCreateRequest : description
        
          
    
    
    RaidCreateRequest --> "*" Description : description
    click Description href "../Description"

        
      RaidCreateRequest : identifier
        
          
    
    
    RaidCreateRequest --> "0..1" Id : identifier
    click Id href "../Id"

        
      RaidCreateRequest : metadata
        
          
    
    
    RaidCreateRequest --> "0..1" Metadata : metadata
    click Metadata href "../Metadata"

        
      RaidCreateRequest : organisation
        
          
    
    
    RaidCreateRequest --> "*" Organisation : organisation
    click Organisation href "../Organisation"

        
      RaidCreateRequest : relatedObject
        
          
    
    
    RaidCreateRequest --> "*" RelatedObject : relatedObject
    click RelatedObject href "../RelatedObject"

        
      RaidCreateRequest : relatedRaid
        
          
    
    
    RaidCreateRequest --> "*" RelatedRaid : relatedRaid
    click RelatedRaid href "../RelatedRaid"

        
      RaidCreateRequest : spatialCoverage
        
          
    
    
    RaidCreateRequest --> "*" SpatialCoverage : spatialCoverage
    click SpatialCoverage href "../SpatialCoverage"

        
      RaidCreateRequest : subject
        
          
    
    
    RaidCreateRequest --> "*" Subject : subject
    click Subject href "../Subject"

        
      RaidCreateRequest : title
        
          
    
    
    RaidCreateRequest --> "*" Title : title
    click Title href "../Title"

        
      RaidCreateRequest : traditionalKnowledgeLabel
        
          
    
    
    RaidCreateRequest --> "*" TraditionalKnowledgeLabel : traditionalKnowledgeLabel
    click TraditionalKnowledgeLabel href "../TraditionalKnowledgeLabel"

        
      
```





## Inheritance
* [RaidDto](RaidDto.md)
    * **RaidCreateRequest**



## Slots

| Name | Cardinality and Range | Description | Inheritance |
| ---  | --- | --- | --- |
| [metadata](metadata.md) | 0..1 <br/> [Metadata](Metadata.md) |  | [RaidDto](RaidDto.md) |
| [title](title.md) | * <br/> [Title](Title.md) |  | [RaidDto](RaidDto.md) |
| [date](date.md) | 0..1 <br/> [Date](Date.md) |  | [RaidDto](RaidDto.md) |
| [description](description.md) | * <br/> [Description](Description.md) |  | [RaidDto](RaidDto.md) |
| [access](access.md) | 0..1 <br/> [Access](Access.md) |  | [RaidDto](RaidDto.md) |
| [alternateUrl](alternateUrl.md) | * <br/> [AlternateUrl](AlternateUrl.md) |  | [RaidDto](RaidDto.md) |
| [contributor](contributor.md) | * <br/> [Contributor](Contributor.md) |  | [RaidDto](RaidDto.md) |
| [organisation](organisation.md) | * <br/> [Organisation](Organisation.md) |  | [RaidDto](RaidDto.md) |
| [relatedRaid](relatedRaid.md) | * <br/> [RelatedRaid](RelatedRaid.md) |  | [RaidDto](RaidDto.md) |
| [relatedObject](relatedObject.md) | * <br/> [RelatedObject](RelatedObject.md) |  | [RaidDto](RaidDto.md) |
| [alternateIdentifier](alternateIdentifier.md) | * <br/> [AlternateIdentifier](AlternateIdentifier.md) |  | [RaidDto](RaidDto.md) |
| [subject](subject.md) | * <br/> [Subject](Subject.md) |  | [RaidDto](RaidDto.md) |
| [spatialCoverage](spatialCoverage.md) | * <br/> [SpatialCoverage](SpatialCoverage.md) |  | [RaidDto](RaidDto.md) |
| [traditionalKnowledgeLabel](traditionalKnowledgeLabel.md) | * <br/> [TraditionalKnowledgeLabel](TraditionalKnowledgeLabel.md) |  | [RaidDto](RaidDto.md) |
| [identifier](identifier.md) | 0..1 <br/> [Id](Id.md) |  | [RaidDto](RaidDto.md) |









## Identifier and Mapping Information







### Schema Source


* from schema: https://raid.org/datamodel/api/raid/core




## Mappings

| Mapping Type | Mapped Value |
| ---  | ---  |
| self | https://raid.org/datamodel/api/raid/core/:RaidCreateRequest |
| native | https://raid.org/datamodel/api/raid/core/:RaidCreateRequest |







## LinkML Source

<!-- TODO: investigate https://stackoverflow.com/questions/37606292/how-to-create-tabbed-code-blocks-in-mkdocs-or-sphinx -->

### Direct

<details>
```yaml
name: RaidCreateRequest
from_schema: https://raid.org/datamodel/api/raid/core
is_a: RaidDto

```
</details>

### Induced

<details>
```yaml
name: RaidCreateRequest
from_schema: https://raid.org/datamodel/api/raid/core
is_a: RaidDto
attributes:
  metadata:
    name: metadata
    from_schema: https://raid.org/datamodel/api/raid/core
    rank: 1000
    alias: metadata
    owner: RaidCreateRequest
    domain_of:
    - RaidDto
    range: Metadata
  title:
    name: title
    from_schema: https://raid.org/datamodel/api/raid/core
    rank: 1000
    alias: title
    owner: RaidCreateRequest
    domain_of:
    - RaidDto
    range: Title
    multivalued: true
    inlined: true
    inlined_as_list: true
  date:
    name: date
    from_schema: https://raid.org/datamodel/api/raid/core
    rank: 1000
    alias: date
    owner: RaidCreateRequest
    domain_of:
    - RaidDto
    range: Date
    multivalued: false
  description:
    name: description
    from_schema: https://raid.org/datamodel/api/raid/core
    rank: 1000
    alias: description
    owner: RaidCreateRequest
    domain_of:
    - RaidDto
    range: Description
    multivalued: true
    inlined: true
    inlined_as_list: true
  access:
    name: access
    from_schema: https://raid.org/datamodel/api/raid/core
    rank: 1000
    alias: access
    owner: RaidCreateRequest
    domain_of:
    - RaidDto
    - ClosedRaid
    range: Access
    multivalued: false
  alternateUrl:
    name: alternateUrl
    from_schema: https://raid.org/datamodel/api/raid/core
    rank: 1000
    alias: alternateUrl
    owner: RaidCreateRequest
    domain_of:
    - RaidDto
    range: AlternateUrl
    multivalued: true
    inlined: true
    inlined_as_list: true
  contributor:
    name: contributor
    from_schema: https://raid.org/datamodel/api/raid/core
    rank: 1000
    slot_uri: schema:author
    alias: contributor
    owner: RaidCreateRequest
    domain_of:
    - RaidDto
    - RaidPatchRequest
    range: Contributor
    multivalued: true
    inlined: true
    inlined_as_list: true
  organisation:
    name: organisation
    from_schema: https://raid.org/datamodel/api/raid/core
    rank: 1000
    alias: organisation
    owner: RaidCreateRequest
    domain_of:
    - RaidDto
    range: Organisation
    multivalued: true
    inlined: true
    inlined_as_list: true
  relatedRaid:
    name: relatedRaid
    from_schema: https://raid.org/datamodel/api/raid/core
    rank: 1000
    alias: relatedRaid
    owner: RaidCreateRequest
    domain_of:
    - RaidDto
    range: RelatedRaid
    multivalued: true
    inlined: true
    inlined_as_list: true
  relatedObject:
    name: relatedObject
    from_schema: https://raid.org/datamodel/api/raid/core
    rank: 1000
    alias: relatedObject
    owner: RaidCreateRequest
    domain_of:
    - RaidDto
    range: RelatedObject
    multivalued: true
    inlined: true
    inlined_as_list: true
  alternateIdentifier:
    name: alternateIdentifier
    from_schema: https://raid.org/datamodel/api/raid/core
    rank: 1000
    alias: alternateIdentifier
    owner: RaidCreateRequest
    domain_of:
    - RaidDto
    range: AlternateIdentifier
    multivalued: true
    inlined: true
    inlined_as_list: true
  subject:
    name: subject
    from_schema: https://raid.org/datamodel/api/raid/core
    rank: 1000
    alias: subject
    owner: RaidCreateRequest
    domain_of:
    - RaidDto
    range: Subject
    multivalued: true
    inlined: true
    inlined_as_list: true
  spatialCoverage:
    name: spatialCoverage
    from_schema: https://raid.org/datamodel/api/raid/core
    rank: 1000
    alias: spatialCoverage
    owner: RaidCreateRequest
    domain_of:
    - RaidDto
    range: SpatialCoverage
    multivalued: true
    inlined: true
    inlined_as_list: true
  traditionalKnowledgeLabel:
    name: traditionalKnowledgeLabel
    from_schema: https://raid.org/datamodel/api/raid/core
    rank: 1000
    alias: traditionalKnowledgeLabel
    owner: RaidCreateRequest
    domain_of:
    - RaidDto
    range: TraditionalKnowledgeLabel
    multivalued: true
    inlined: true
    inlined_as_list: true
  identifier:
    name: identifier
    from_schema: https://raid.org/datamodel/api/raid/core
    alias: identifier
    owner: RaidCreateRequest
    domain_of:
    - RaidDto
    range: Id

```
</details>