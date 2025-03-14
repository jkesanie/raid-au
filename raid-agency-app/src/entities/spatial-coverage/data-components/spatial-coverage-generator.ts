import { spatialCoveragePlaceGenerator } from "@/entities/spatial-coverage-place/data-components/spatial-coverage-place-generator";
import { SpatialCoverage } from "@/generated/raid";

export const spatialCoverageGenerator = (): SpatialCoverage => {
  return {
    id: "https://www.openstreetmap.org/relation/2456176#map=14/-38.14814/144.36288",
    schemaUri: "https://www.openstreetmap.org/",
    place: [spatialCoveragePlaceGenerator()],
  };
};
