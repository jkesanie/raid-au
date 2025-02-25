import { Organisation } from "@/generated/raid";
import organisationRoleGenerator from "@/entities/organisation/role/data-components/organisation-role-generator";
import organisations from "@/references/organisation.json";
import organisationSchemas from "@/references/organisation_schema.json";
import { fetchCurrentUserRor } from "@/services/keycloak-groups";

const organisationGenerator = async ({
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
    role: [organisationRoleGenerator()],
  };
};

export default organisationGenerator;
