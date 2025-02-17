import { z } from "zod";
import { relatedObjectCategoryValidationSchema } from "../category/data-components/related-object-category-validation-schema";

export const relatedObjectValidationSchema = z.array(
  z.object({
    id: z.string().min(1),
    schemaUri: z.string().min(1),
    type: z.object({
      id: z.string(),
      schemaUri: z.string(),
    }),
    category: relatedObjectCategoryValidationSchema,
  })
);
