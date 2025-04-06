

# Class: Metadata



URI: [https://raid.org/datamodel/api/raid/core/:Metadata](https://raid.org/datamodel/api/raid/core/:Metadata)






```mermaid
 classDiagram
    class Metadata
    click Metadata href "../Metadata"
      Metadata : created
        
      Metadata : raidModelVersion
        
      Metadata : updated
        
      
```




<!-- no inheritance hierarchy -->


## Slots

| Name | Cardinality and Range | Description | Inheritance |
| ---  | --- | --- | --- |
| [created](../slots/created.md) | 0..1 <br/> [Integer](../types/Integer.md) |  | direct |
| [updated](../slots/updated.md) | 0..1 <br/> [Integer](../types/Integer.md) |  | direct |
| [raidModelVersion](../slots/raidModelVersion.md) | 0..1 <br/> [String](../types/String.md) |  | direct |





## Usages

| used by | used in | type | used |
| ---  | --- | --- | --- |
| [RaidDto](../classes/RaidDto.md) | [metadata](../slots/metadata.md) | range | [Metadata](../classes/Metadata.md) |
| [RaidCreateRequest](../classes/RaidCreateRequest.md) | [metadata](../slots/metadata.md) | range | [Metadata](../classes/Metadata.md) |
| [RaidUpdateRequest](../classes/RaidUpdateRequest.md) | [metadata](../slots/metadata.md) | range | [Metadata](../classes/Metadata.md) |






## Identifier and Mapping Information







### Schema Source


* from schema: https://raid.org/datamodel/api/raid/core




## Mappings

| Mapping Type | Mapped Value |
| ---  | ---  |
| self | https://raid.org/datamodel/api/raid/core/:Metadata |
| native | https://raid.org/datamodel/api/raid/core/:Metadata |







## LinkML Source

<!-- TODO: investigate https://stackoverflow.com/questions/37606292/how-to-create-tabbed-code-blocks-in-mkdocs-or-sphinx -->

### Direct

<details>
```yaml
name: Metadata
from_schema: https://raid.org/datamodel/api/raid/core
attributes:
  created:
    name: created
    from_schema: https://raid.org/datamodel/api/raid/core
    rank: 1000
    domain_of:
    - Metadata
    range: integer
  updated:
    name: updated
    from_schema: https://raid.org/datamodel/api/raid/core
    rank: 1000
    domain_of:
    - Metadata
    range: integer
  raidModelVersion:
    name: raidModelVersion
    from_schema: https://raid.org/datamodel/api/raid/core
    rank: 1000
    domain_of:
    - Metadata
    range: string

```
</details>

### Induced

<details>
```yaml
name: Metadata
from_schema: https://raid.org/datamodel/api/raid/core
attributes:
  created:
    name: created
    from_schema: https://raid.org/datamodel/api/raid/core
    rank: 1000
    alias: created
    owner: Metadata
    domain_of:
    - Metadata
    range: integer
  updated:
    name: updated
    from_schema: https://raid.org/datamodel/api/raid/core
    rank: 1000
    alias: updated
    owner: Metadata
    domain_of:
    - Metadata
    range: integer
  raidModelVersion:
    name: raidModelVersion
    from_schema: https://raid.org/datamodel/api/raid/core
    rank: 1000
    alias: raidModelVersion
    owner: Metadata
    domain_of:
    - Metadata
    range: string

```
</details>