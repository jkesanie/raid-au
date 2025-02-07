import {
  RelatedObject,
  RelatedObjectCategory,
  RelatedObjectType,
} from "@/generated/raid";
import relatedObjectCategories from "@/references/related_object_category.json";
import relatedObjectCategoriesSchema from "@/references/related_object_category_schema.json";
import relatedObjectTypes from "@/references/related_object_type.json";
import relatedObjectTypesSchema from "@/references/related_object_type_schema.json";

const relatedObjectTypeGenerator = (): RelatedObjectType => {
  const randomIndex = Math.floor(Math.random() * relatedObjectTypes.length);
  return {
    id: relatedObjectTypes[randomIndex].uri,
    schemaUri: relatedObjectTypesSchema[0].uri,
  };
};

const relatedObjectCategoryGenerator = (): RelatedObjectCategory => {
  const randomIndex = Math.floor(
    Math.random() * relatedObjectCategories.length
  );
  return {
    id: relatedObjectCategories[randomIndex].uri,
    schemaUri: relatedObjectCategoriesSchema[0].uri,
  };
};

const relatedObjectGenerator = (): RelatedObject => {
  return {
    id: ``,
    schemaUri: "https://doi.org/",
    type: relatedObjectTypeGenerator(),
    category: [relatedObjectCategoryGenerator()],
  };
};

export default relatedObjectGenerator;
