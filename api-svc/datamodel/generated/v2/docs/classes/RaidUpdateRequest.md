

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
* [RaidDto](../classes/RaidDto.md)
    * **RaidUpdateRequest**



## Slots

| Name | Cardinality and Range | Description | Inheritance |
| ---  | --- | --- | --- |
| [metadata](../slots/metadata.md) | 1 <br/> [Metadata](../classes/Metadata.md) |  | [RaidDto](../classes/RaidDto.md) |
| [title](../slots/title.md) | 1..* <br/> [Title](../classes/Title.md) |  | [RaidDto](../classes/RaidDto.md) |
| [date](../slots/date.md) | 1 <br/> [Date](../classes/Date.md) |  | [RaidDto](../classes/RaidDto.md) |
| [description](../slots/description.md) | * <br/> [Description](../classes/Description.md) |  | [RaidDto](../classes/RaidDto.md) |
| [access](../slots/access.md) | 1 <br/> [Access](../classes/Access.md) |  | [RaidDto](../classes/RaidDto.md) |
| [alternateUrl](../slots/alternateUrl.md) | * <br/> [AlternateUrl](../classes/AlternateUrl.md) |  | [RaidDto](../classes/RaidDto.md) |
| [contributor](../slots/contributor.md) | 1..* <br/> [Contributor](../classes/Contributor.md) |  | [RaidDto](../classes/RaidDto.md) |
| [organisation](../slots/organisation.md) | * <br/> [Organisation](../classes/Organisation.md) |  | [RaidDto](../classes/RaidDto.md) |
| [relatedRaid](../slots/relatedRaid.md) | * <br/> [RelatedRaid](../classes/RelatedRaid.md) |  | [RaidDto](../classes/RaidDto.md) |
| [relatedObject](../slots/relatedObject.md) | * <br/> [RelatedObject](../classes/RelatedObject.md) |  | [RaidDto](../classes/RaidDto.md) |
| [alternateIdentifier](../slots/alternateIdentifier.md) | * <br/> [AlternateIdentifier](../classes/AlternateIdentifier.md) |  | [RaidDto](../classes/RaidDto.md) |
| [subject](../slots/subject.md) | * <br/> [Subject](../classes/Subject.md) |  | [RaidDto](../classes/RaidDto.md) |
| [spatialCoverage](../slots/spatialCoverage.md) | * <br/> [SpatialCoverage](../classes/SpatialCoverage.md) |  | [RaidDto](../classes/RaidDto.md) |
| [traditionalKnowledgeLabel](../slots/traditionalKnowledgeLabel.md) | * <br/> [TraditionalKnowledgeLabel](../classes/TraditionalKnowledgeLabel.md) |  | [RaidDto](../classes/RaidDto.md) |
| [identifier](../slots/identifier.md) | 0..1 <br/> [Id](../classes/Id.md) |  | [RaidDto](../classes/RaidDto.md) |









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