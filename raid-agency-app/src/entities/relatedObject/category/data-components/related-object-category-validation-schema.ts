import { z } from "zod";

export const relatedObjectCategoryValidationSchema = z
  .object({
    id: z.string(),
    schemaUri: z.string(),
  })
  .array();
