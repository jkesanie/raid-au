import { SpatialCoveragePlace } from "@/generated/raid";
import languageSchema from "@/references/language_schema.json";

const spatialCoveragePlaceGenerator = (): SpatialCoveragePlace => {
  return {
    text: "Canberra",
    language: {
      id: "eng",
      schemaUri: languageSchema[0].uri,
    },
  };
};

export default spatialCoveragePlaceGenerator;
