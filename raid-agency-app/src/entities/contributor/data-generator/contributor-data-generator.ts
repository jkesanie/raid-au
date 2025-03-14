import { contributorPositionDataGenerator } from "@/entities/contributor-position/data-generator/contributor-position-data-generator";
import { contributorRoleDataGenerator } from "@/entities/contributor-role/data-generator/contributor-role-data-generator";
import { Contributor } from "@/generated/raid";

type ContributorExtended = Contributor &
  (
    | { uuid: string; id?: never; email?: never }
    | { id: string; uuid?: never; email?: never }
    | { email: string; uuid?: never; id?: never }
  );

export const contributorDataGenerator = (): ContributorExtended => {
  const baseData: Omit<Contributor, "id" | "email" | "uuid"> = {
    leader: true,
    contact: true,
    schemaUri: "https://orcid.org/",
    position: [contributorPositionDataGenerator()],
    role: [contributorRoleDataGenerator(), contributorRoleDataGenerator()],
  };

  return {
    ...baseData,
    id: "",
  } as unknown as ContributorExtended;
};
