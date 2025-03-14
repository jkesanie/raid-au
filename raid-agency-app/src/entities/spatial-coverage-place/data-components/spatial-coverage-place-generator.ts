import { SpatialCoveragePlace } from "@/generated/raid";
import languageSchema from "@/references/language_schema.json";

export const spatialCoveragePlaceGenerator = (): SpatialCoveragePlace => {
  return {
    text: "Canberra",
    language: {
      id: "eng",
      schemaUri: languageSchema[0].uri,
    },
  };
};
