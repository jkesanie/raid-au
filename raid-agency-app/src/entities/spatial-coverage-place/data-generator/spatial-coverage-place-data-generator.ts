import { SpatialCoveragePlace } from "@/generated/raid";
import languageSchema from "@/references/language_schema.json";

export const spatialCoveragePlaceDataGenerator = (): SpatialCoveragePlace => {
  return {
    text: "Canberra",
    language: {
      id: "eng",
      schemaUri: languageSchema[0].uri,
    },
  };
};
