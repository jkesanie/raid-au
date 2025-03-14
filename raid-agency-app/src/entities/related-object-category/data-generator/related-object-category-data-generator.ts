import { RelatedObjectCategory } from "@/generated/raid";
import relatedObjectCategories from "@/references/related_object_category.json";
import relatedObjectCategoriesSchema from "@/references/related_object_category_schema.json";

export const relatedObjectCategoryDataGenerator = (): RelatedObjectCategory => {
  return {
    id: relatedObjectCategories[0].uri,
    schemaUri: relatedObjectCategoriesSchema[0].uri,
  };
};
