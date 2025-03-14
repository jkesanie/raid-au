import { RelatedRaid } from "@/generated/raid";
import relatedRaidType from "@/references/related_raid_type.json";
import relatedRaidTypeSchema from "@/references/related_raid_type_schema.json";

export const relatedRaidGenerator = (): RelatedRaid => {
  return {
    id: `https://raid.org/`,
    type: {
      id: relatedRaidType[0].uri,
      schemaUri: relatedRaidTypeSchema[0].uri,
    },
  };
};
