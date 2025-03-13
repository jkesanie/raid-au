import { RelatedObject, RelatedObjectType } from "@/generated/raid";
import relatedObjectTypes from "@/references/related_object_type.json";
import relatedObjectTypesSchema from "@/references/related_object_type_schema.json";
import { relatedObjectCategoryGenerator } from "../../related-object-category/data-components/related-object-category-generator";

const relatedObjectTypeGenerator = (): RelatedObjectType => {
  return {
    id: relatedObjectTypes[0].uri,
    schemaUri: relatedObjectTypesSchema[0].uri,
  };
};

export const relatedObjectGenerator = (): RelatedObject => {
  return {
    id: "",
    schemaUri: "https://doi.org/",
    type: relatedObjectTypeGenerator(),
    category: [relatedObjectCategoryGenerator()],
  };
};
