import { organisationRoleDataGenerator } from "@/entities/organisation-role/data-generator/organisation-role-data-generator";
import { Organisation } from "@/generated/raid";
import organisations from "@/references/organisation.json";
import organisationSchemas from "@/references/organisation_schema.json";
import { fetchCurrentUserRor } from "@/services/keycloak-groups";

export const organisationDataGenerator = async ({
  token,
  tokenParsed,
}: {
  token: string;
  tokenParsed: Record<string, string>;
}): Promise<Organisation> => {
  if (organisations.length === 0 || organisationSchemas.length === 0) {
    throw new Error("Organisation or schema data is empty");
  }

  if (!token || Object.keys(tokenParsed).length === 0) {
    throw new Error("Token or parsed token data is empty");
  }

  const currentUserRor = await fetchCurrentUserRor({
    token,
    tokenParsed,
  });

  return {
    id: currentUserRor ? currentUserRor : "",
    schemaUri: organisationSchemas[0].uri,
    role: [organisationRoleDataGenerator()],
  };
};
