import { SpatialCoverage } from "@/generated/raid";
import spatialCoveragePlaceGenerator from "../place/data-components/spatial-coverage-place-generator";

const spatialCoverageGenerator = (): SpatialCoverage => {
  return {
    // https://www.geonames.org/2172517
    id: "https://www.openstreetmap.org/relation/2456176#map=14/-38.14814/144.36288",
    schemaUri: "https://www.openstreetmap.org/",
    place: [spatialCoveragePlaceGenerator()],
  };
};

export default spatialCoverageGenerator;
