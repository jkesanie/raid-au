import { Access } from "@/generated/raid";
import accessType from "@/references/access_type.json";
import accessTypeSchema from "@/references/access_type_schema.json";
import languageSchema from "@/references/language_schema.json";

export function accessDataGenerator(): Access {
  return {
    type: {
      id: accessType[0].uri,
      schemaUri: accessTypeSchema[0].uri,
    },
    statement: {
      text: "",
      language: {
        id: "eng",
        schemaUri:
          languageSchema.find((el) => el.status === "active")?.uri || "",
      },
    },
    embargoExpiry: undefined,
  };
}
