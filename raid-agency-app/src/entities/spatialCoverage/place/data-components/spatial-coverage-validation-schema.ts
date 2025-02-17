import { z } from "zod";

export const spatialCoveragePlaceValidationSchema = z
  .array(
    z.object({
      text: z.string().min(1),
      language: z.object({
        id: z.string().min(1),
        schemaUri: z.string().min(1),
      }),
    })
  )
  .optional();
