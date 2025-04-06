

# Class: RaidUpdateRequest



URI: [https://raid.org/datamodel/api/raid/core/:RaidUpdateRequest](https://raid.org/datamodel/api/raid/core/:RaidUpdateRequest)






```mermaid
 classDiagram
    class RaidUpdateRequest
    click RaidUpdateRequest href "../RaidUpdateRequest"
      RaidDto <|-- RaidUpdateRequest
        click RaidDto href "../RaidDto"
      
      RaidUpdateRequest : access
        
          
    
    
    RaidUpdateRequest --> "1" Access : access
    click Access href "../Access"

        
      RaidUpdateRequest : alternateIdentifier
        
          
    
    
    RaidUpdateRequest --> "*" AlternateIdentifier : alternateIdentifier
    click AlternateIdentifier href "../AlternateIdentifier"

        
      RaidUpdateRequest : alternateUrl
        
          
    
    
    RaidUpdateRequest --> "*" AlternateUrl : alternateUrl
    click AlternateUrl href "../AlternateUrl"

        
      RaidUpdateRequest : contributor
        
          
    
    
    RaidUpdateRequest --> "1..*" Contributor : contributor
    click Contributor href "../Contributor"

        
      RaidUpdateRequest : date
        
          
    
    
    RaidUpdateRequest --> "1" Date : date
    click Date href "../Date"

        
      RaidUpdateRequest : description
        
          
    
    
    RaidUpdateRequest --> "*" Description : description
    click Description href "../Description"

        
      RaidUpdateRequest : identifier
        
          
    
    
    RaidUpdateRequest --> "0..1" Id : identifier
    click Id href "../Id"

        
      RaidUpdateRequest : metadata
        
          
    
    
    RaidUpdateRequest --> "1" Metadata : metadata
    click Metadata href "../Metadata"

        
      RaidUpdateRequest : organisation
        
          
    
    
    RaidUpdateRequest --> "*" Organisation : organisation
    click Organisation href "../Organisation"

        
      RaidUpdateRequest : relatedObject
        
          
    
    
    RaidUpdateRequest --> "*" RelatedObject : relatedObject
    click RelatedObject href "../RelatedObject"

        
      RaidUpdateRequest : relatedRaid
        
          
    
    
    RaidUpdateRequest --> "*" RelatedRaid : relatedRaid
    click RelatedRaid href "../RelatedRaid"

        
      RaidUpdateRequest : spatialCoverage
        
          
    
    
    RaidUpdateRequest --> "*" SpatialCoverage : spatialCoverage
    click SpatialCoverage href "../SpatialCoverage"

        
      RaidUpdateRequest : subject
        
          
    
    
    RaidUpdateRequest --> "*" Subject : subject
    click Subject href "../Subject"

        
      RaidUpdateRequest : title
        
          
    
    
    RaidUpdateRequest --> "1..*" Title : title
    click Title href "../Title"

        
      RaidUpdateRequest : traditionalKnowledgeLabel
        
          
    
    
    RaidUpdateRequest --> "*" TraditionalKnowledgeLabel : traditionalKnowledgeLabel
    click TraditionalKnowledgeLabel href "../TraditionalKnowledgeLabel"

        
      
```





## Inheritance
* [RaidDto](RaidDto.md)
    * **RaidUpdateRequest**



## Slots

| Name | Cardinality and Range | Description | Inheritance |
| ---  | --- | --- | --- |
| [metadata](metadata.md) | 1 <br/> [Metadata](Metadata.md) |  | [RaidDto](RaidDto.md) |
| [title](title.md) | 1..* <br/> [Title](Title.md) |  | [RaidDto](RaidDto.md) |
| [date](date.md) | 1 <br/> [Date](Date.md) |  | [RaidDto](RaidDto.md) |
| [description](description.md) | * <br/> [Description](Description.md) |  | [RaidDto](RaidDto.md) |
| [access](access.md) | 1 <br/> [Access](Access.md) |  | [RaidDto](RaidDto.md) |
| [alternateUrl](alternateUrl.md) | * <br/> [AlternateUrl](AlternateUrl.md) |  | [RaidDto](RaidDto.md) |
| [contributor](contributor.md) | 1..* <br/> [Contributor](Contributor.md) |  | [RaidDto](RaidDto.md) |
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
| self | https://raid.org/datamodel/api/raid/core/:RaidUpdateRequest |
| native | https://raid.org/datamodel/api/raid/core/:RaidUpdateRequest |







## LinkML Source

<!-- TODO: investigate https://stackoverflow.com/questions/37606292/how-to-create-tabbed-code-blocks-in-mkdocs-or-sphinx -->

### Direct

<details>
```yaml
name: RaidUpdateRequest
from_schema: https://raid.org/datamodel/api/raid/core
is_a: RaidDto
slot_usage:
  metadata:
    name: metadata
    required: true
  title:
    name: title
    required: true
  date:
    name: date
    required: true
  contributor:
    name: contributor
    required: true
  access:
    name: access
    required: true

```
</details>

### Induced

<details>
```yaml
name: RaidUpdateRequest
from_schema: https://raid.org/datamodel/api/raid/core
is_a: RaidDto
slot_usage:
  metadata:
    name: metadata
    required: true
  title:
    name: title
    required: true
  date:
    name: date
    required: true
  contributor:
    name: contributor
    required: true
  access:
    name: access
    required: true
attributes:
  metadata:
    name: metadata
    from_schema: https://raid.org/datamodel/api/raid/core
    rank: 1000
    alias: metadata
    owner: RaidUpdateRequest
    domain_of:
    - RaidDto
    range: Metadata
    required: true
  title:
    name: title
    from_schema: https://raid.org/datamodel/api/raid/core
    rank: 1000
    alias: title
    owner: RaidUpdateRequest
    domain_of:
    - RaidDto
    range: Title
    required: true
    multivalued: true
    inlined: true
    inlined_as_list: true
  date:
    name: date
    from_schema: https://raid.org/datamodel/api/raid/core
    rank: 1000
    alias: date
    owner: RaidUpdateRequest
    domain_of:
    - RaidDto
    range: Date
    required: true
    multivalued: false
  description:
    name: description
    from_schema: https://raid.org/datamodel/api/raid/core
    rank: 1000
    alias: description
    owner: RaidUpdateRequest
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
    owner: RaidUpdateRequest
    domain_of:
    - RaidDto
    - ClosedRaid
    range: Access
    required: true
    multivalued: false
  alternateUrl:
    name: alternateUrl
    from_schema: https://raid.org/datamodel/api/raid/core
    rank: 1000
    alias: alternateUrl
    owner: RaidUpdateRequest
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
    owner: RaidUpdateRequest
    domain_of:
    - RaidDto
    - RaidPatchRequest
    range: Contributor
    required: true
    multivalued: true
    inlined: true
    inlined_as_list: true
  organisation:
    name: organisation
    from_schema: https://raid.org/datamodel/api/raid/core
    rank: 1000
    alias: organisation
    owner: RaidUpdateRequest
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
    owner: RaidUpdateRequest
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
    owner: RaidUpdateRequest
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
    owner: RaidUpdateRequest
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
    owner: RaidUpdateRequest
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
    owner: RaidUpdateRequest
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
    owner: RaidUpdateRequest
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
    owner: RaidUpdateRequest
    domain_of:
    - RaidDto
    range: Id

```
</details>