import { accessDataGenerator } from "@/entities/access/data-generator/access-data-generator";
import { dateCleaner } from "@/utils/date-cleaner";
import { dateDataGenerator } from "@/entities/date/data-generator/date-data-generator";
import { titleDataGenerator } from "@/entities/title/data-generator/title-data-generator";
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

import { AccessView } from "@/entities/access/views/access-view";
import { AlternateIdentifiersView } from "@/entities/alternate-identifier/views/alternate-identifiers-view";
import { AlternateUrlsView } from "@/entities/alternate-url/views/alternate-urls-view";
import { ContributorsView } from "@/entities/contributor/views/contributors-view";
import { DateView } from "@/entities/date/views/date-view";
import { DescriptionsView } from "@/entities/description/views/descriptions-view";
import { OrganisationsView } from "@/entities/organisation/views/organisations-view";
import { RelatedObjectsView } from "@/entities/related-object/views/related-objects-view";
import { RelatedRaidsView } from "@/entities/related-raid/views/related-raids-view";
import { SpatialCoveragesView } from "@/entities/spatial-coverage/views/spatial-coverages-view";
import { SubjectsView } from "@/entities/subject/views/subjects-view";
import { TitlesView } from "@/entities/title/views/titles-view";

export const displayItems = [
  {
    itemKey: "date",
    label: "Dates",
    Component: DateView,
    emptyValue: {},
  },
  {
    itemKey: "title",
    label: "Titles",
    Component: TitlesView,
    emptyValue: [],
  },
  {
    itemKey: "description",
    label: "Descriptions",
    Component: DescriptionsView,
    emptyValue: [],
  },
  {
    itemKey: "contributor",
    label: "Contributors",
    Component: ContributorsView,
    emptyValue: [],
  },
  {
    itemKey: "organisation",
    label: "Organisations",
    Component: OrganisationsView,
    emptyValue: [],
  },
  {
    itemKey: "relatedObject",
    label: "Related Objects",
    Component: RelatedObjectsView,
    emptyValue: [],
  },
  {
    itemKey: "alternateIdentifier",
    label: "Alternate Identifiers",
    Component: AlternateIdentifiersView,
    emptyValue: [],
  },
  {
    itemKey: "alternateUrl",
    label: "Alternate URLs",
    Component: AlternateUrlsView,
    emptyValue: [],
  },
  {
    itemKey: "relatedRaid",
    label: "Related RAiDs",
    Component: RelatedRaidsView,
    emptyValue: [],
  },
  {
    itemKey: "access",
    label: "Access",
    Component: AccessView,
    emptyValue: {},
  },
  {
    itemKey: "subject",
    label: "Subjects",
    Component: SubjectsView,
    emptyValue: [],
  },
  {
    itemKey: "spatialCoverage",
    label: "Spatial Coverages",
    Component: SpatialCoveragesView,
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
  title: [titleDataGenerator()],
  date: dateDataGenerator(),
  access: accessDataGenerator(),
  organisation: [],
  contributor: [],
  alternateUrl: [],
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
