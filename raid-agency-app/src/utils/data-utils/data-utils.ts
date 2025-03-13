import accessGenerator from "@/entities/access/data-components/access-generator";
import dateCleaner from "@/entities/date/data-components/date-cleaner";
import dateGenerator from "@/entities/date/data-components/date-generator";
import titleGenerator from "@/entities/title/data-components/title-generator";
import {
  Access,
  AlternateIdentifier,
  AlternateUrl,
  Contributor,
  Description,
  Id,
  ModelDate,
  Organisation,
  RaidCreateRequest,
  RaidDto,
  RelatedObject,
  RelatedRaid,
  SpatialCoverage,
  Subject,
  Title,
} from "@/generated/raid";

import { AccessDisplay } from "@/entities/access/display-components/access-display";
import { AlternateIdentifiersDisplay } from "@/entities/alternate-identifier/display-components/alternate-identifiers-display";
import { AlternateUrlsDisplay } from "@/entities/alternate-url/display-components/alternate-urls-display";
import { ContributorsDisplay } from "@/entities/contributor/display-components/contributors-display";
import { DateDisplay } from "@/entities/date/display-components/date-display";
import { DescriptionsDisplay } from "@/entities/description/display-components/descriptions-display";
import { OrganisationsDisplay } from "@/entities/organisation/display-component/organisations-display";
import { RelatedObjectsDisplay } from "@/entities/related-object/display-components/related-objects-display";
import { RelatedRaidsDisplay } from "@/entities/related-raid/display-components/related-raids-display";
import { SpatialCoveragesDisplay } from "@/entities/spatial-coverage/display-components/spatial-coverages-display";
import { SubjectsDisplay } from "@/entities/subject/display-components/subjects-display";
import { TitlesDisplay } from "@/entities/title/display-components/titles-display";

export const displayItems = [
  {
    itemKey: "date",
    label: "Dates",
    Component: DateDisplay,
    emptyValue: {},
  },
  {
    itemKey: "title",
    label: "Titles",
    Component: TitlesDisplay,
    emptyValue: [],
  },
  {
    itemKey: "description",
    label: "Descriptions",
    Component: DescriptionsDisplay,
    emptyValue: [],
  },
  {
    itemKey: "contributor",
    label: "Contributors",
    Component: ContributorsDisplay,
    emptyValue: [],
  },
  {
    itemKey: "organisation",
    label: "Organisations",
    Component: OrganisationsDisplay,
    emptyValue: [],
  },
  {
    itemKey: "relatedObject",
    label: "Related Objects",
    Component: RelatedObjectsDisplay,
    emptyValue: [],
  },
  {
    itemKey: "alternateIdentifier",
    label: "Alternate Identifiers",
    Component: AlternateIdentifiersDisplay,
    emptyValue: [],
  },
  {
    itemKey: "alternateUrl",
    label: "Alternate URLs",
    Component: AlternateUrlsDisplay,
    emptyValue: [],
  },
  {
    itemKey: "relatedRaid",
    label: "Related RAiDs",
    Component: RelatedRaidsDisplay,
    emptyValue: [],
  },
  {
    itemKey: "access",
    label: "Access",
    Component: AccessDisplay,
    emptyValue: {},
  },
  {
    itemKey: "subject",
    label: "Subjects",
    Component: SubjectsDisplay,
    emptyValue: [],
  },
  {
    itemKey: "spatialCoverage",
    label: "Spatial Coverages",
    Component: SpatialCoveragesDisplay,
    emptyValue: [],
  },
];

export const raidRequest = (data: RaidDto): RaidDto => {
  return {
    identifier: data?.identifier || ({} as Id),
    description: data?.description || ([] as Description[]),
    title: data?.title || ([] as Title[]),
    access: data?.access || ({} as Access),
    alternateUrl: data?.alternateUrl || ([] as AlternateUrl[]),
    relatedRaid: data?.relatedRaid || ([] as RelatedRaid[]),
    date: dateCleaner(data?.date) || ({} as ModelDate),
    contributor: data?.contributor || ([] as Contributor[]),
    alternateIdentifier:
      data?.alternateIdentifier || ([] as AlternateIdentifier[]),
    organisation: data?.organisation || ([] as Organisation[]),
    relatedObject: data?.relatedObject || ([] as RelatedObject[]),
    spatialCoverage: data?.spatialCoverage || ([] as SpatialCoverage[]),
    subject: data?.subject || ([] as Subject[]),
  };
};

export const newRaid: RaidCreateRequest = {
  title: [titleGenerator()],
  // description: [descriptionGenerator()],
  date: dateGenerator(),
  access: accessGenerator(),
  organisation: [],
  contributor: [],
  // subject: [subjectGenerator()],
  // relatedRaid: [],
  alternateUrl: [],
  // spatialCoverage: [spatialCoverageGenerator()],
  // relatedObject: [
  //   relatedObjectGenerator(),
  //   relatedObjectGenerator(),
  //   relatedObjectGenerator(),
  // ],
  // alternateIdentifier: [
  //   alternateIdentifierGenerator(),
  //   alternateIdentifierGenerator(),
  //   alternateIdentifierGenerator(),
  // ],
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getErrorMessageForField(obj: any, keyString: string): any {
  const keys = keyString.split("."); // Split the keyString into an array of keys
  let value = obj;

  for (const key of keys) {
    if (value && key in value) {
      value = value[key]; // Traverse the object
    } else {
      return undefined; // Return undefined if any key is not found
    }
  }

  return value;
}
