import { subjectKeywordDataGenerator } from "@/entities/subject-keyword/data-generator/subject-keyword-data-generator";
import { Subject } from "@/generated/raid";
import subjectType from "@/references/subject_type.json";

export const subjectDataGenerator = (id:string, subject_type: string): Subject => {
  return {
    id: `https://linked.data.gov.au/def/${subject_type}/2020/${id}`,
    schemaUri: `https://vocabs.ardc.edu.au/viewById/316`,
    keyword: [subjectKeywordDataGenerator()],
  };
};
