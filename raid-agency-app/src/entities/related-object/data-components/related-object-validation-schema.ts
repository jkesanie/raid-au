import { z } from "zod";
import { relatedObjectCategoryValidationSchema } from "../../related-object-category/data-components/related-object-category-validation-schema";

const doiUrlSchema = z.string().url().startsWith("https://doi.org", {
  message: "URL must be a DOI link starting with https://doi.org",
});
export const relatedObjectValidationSchema = z.array(
  z.object({
    id: doiUrlSchema,
    schemaUri: z.string().min(1),
    type: z.object({
      id: z.string(),
      schemaUri: z.string(),
    }),
    category: relatedObjectCategoryValidationSchema,
  })
);
