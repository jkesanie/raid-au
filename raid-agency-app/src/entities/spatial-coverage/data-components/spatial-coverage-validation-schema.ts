import { z } from "zod";
import { spatialCoveragePlaceValidationSchema } from "../../spatial-coverage-place/data-components/spatial-coverage-validation-schema";

export const spatialCoverageValidationSchema = z
  .array(
    z.object({
      id: z.string().min(1),
      schemaUri: z.string().min(1),
      place: spatialCoveragePlaceValidationSchema,
    })
  )
  .optional();
