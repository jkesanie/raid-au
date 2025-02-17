import {
  RelatedObject,
  RelatedObjectType
} from "@/generated/raid";
import relatedObjectTypes from "@/references/related_object_type.json";
import relatedObjectTypesSchema from "@/references/related_object_type_schema.json";
import relatedObjectCategoryGenerator from "../category/data-components/related-object-category-generator";

const relatedObjectTypeGenerator = (): RelatedObjectType => {
  const randomIndex = Math.floor(Math.random() * relatedObjectTypes.length);
  return {
    id: relatedObjectTypes[randomIndex].uri,
    schemaUri: relatedObjectTypesSchema[0].uri,
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
