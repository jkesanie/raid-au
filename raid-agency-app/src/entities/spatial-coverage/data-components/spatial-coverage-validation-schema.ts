import { spatialCoveragePlaceValidationSchema } from "@/entities/spatial-coverage-place/data-components/spatial-coverage-validation-schema";
import { z } from "zod";

export const spatialCoverageValidationSchema = z
  .array(
    z.object({
      id: z.string().min(1),
      schemaUri: z.string().min(1),
      place: spatialCoveragePlaceValidationSchema,
    })
  )
  .optional();
