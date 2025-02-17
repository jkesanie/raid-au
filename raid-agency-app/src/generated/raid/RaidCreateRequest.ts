import type { Access } from "./Access";
import type { AlternateIdentifier } from "./AlternateIdentifier";
import type { AlternateUrl } from "./AlternateUrl";
import type { Contributor } from "./Contributor";
import type { Description } from "./Description";
import type { Id } from "./Id";
import type { Metadata } from "./Metadata";
import type { ModelDate } from "./ModelDate";
import type { Organisation } from "./Organisation";
import type { RelatedObject } from "./RelatedObject";
import type { RelatedRaid } from "./RelatedRaid";
import type { SpatialCoverage } from "./SpatialCoverage";
import type { Subject } from "./Subject";
import type { Title } from "./Title";

export interface RaidCreateRequest {
  metadata?: Metadata;
  identifier?: Id;
  title?: Array<Title>;
  date?: ModelDate;
  description?: Array<Description>;
  access: Access;
  alternateUrl?: Array<AlternateUrl>;
  contributor?: Array<Contributor>;
  organisation?: Array<Organisation>;
  subject?: Array<Subject>;
  relatedRaid?: Array<RelatedRaid>;
  relatedObject?: Array<RelatedObject>;
  alternateIdentifier?: Array<AlternateIdentifier>;
  spatialCoverage?: Array<SpatialCoverage>;
}
