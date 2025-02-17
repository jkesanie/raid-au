import { getApiEndpoint } from "@/utils/api-utils/api-utils";

const kcUrl = import.meta.env.VITE_KEYCLOAK_URL as string;
const kcRealm = import.meta.env.VITE_KEYCLOAK_REALM as string;
const keycloakGroupEndpoint = `${kcUrl}/realms/${kcRealm}/group`;
const apiEndpoint = getApiEndpoint();

export async function joinKeycloakGroup({
  token,
  groupId,
}: {
  token: string | undefined;
  groupId: string;
}) {
  const requestUrl = `${keycloakGroupEndpoint}/join`;

  try {
    if (token === undefined) {
      throw new Error("Error: Keycloak token not set");
    }
    const response = await fetch(requestUrl, {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify({ groupId }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    const errorMessage = "Error: Keycloak group could not be joined";
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
}
export async function fetchAllKeycloakGroups({
  token,
}: {
  token: string | undefined;
}) {
  const requestUrl = `${keycloakGroupEndpoint}/all`;

  try {
    if (token === undefined) {
      throw new Error("Error: Keycloak token not set");
    }
    const response = await fetch(requestUrl, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    const errorMessage = "Error: Keycloak groups could not be fetched";
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
}

export async function fetchCurrentUserKeycloakGroups({
  token,
}: {
  token: string | undefined;
}) {
  const requestUrl = `${keycloakGroupEndpoint}/user-groups`;

  try {
    if (token === undefined) {
      throw new Error("Error: Keycloak token not set");
    }
    const response = await fetch(requestUrl, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    const errorMessage = "Error: Keycloak groups could not be fetched";
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
}

export async function setKeycloakUserAttribute({
  groupId,
  token,
}: {
  groupId: string;
  token: string | undefined;
}) {
  const requestUrl = `${keycloakGroupEndpoint}/active-group`;
  try {
    if (token === undefined) {
      throw new Error("Error: Keycloak token not set");
    }

    await fetch(requestUrl, {
      method: "PUT",
      body: JSON.stringify({ activeGroupId: groupId }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    const errorMessage = "Error: Keycloak group could not be joined";
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
}

export async function fetchCurrentUserRor({
  token,
  tokenParsed,
}: {
  token: string | undefined;
  tokenParsed: Record<string, string> | undefined;
}): Promise<string | null> {
  try {
    if (tokenParsed === undefined) {
      throw new Error("Error: Keycloak token not set");
    }

    const requestUrl = `${apiEndpoint}/service-point/`;

    const response = await fetch(requestUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const servicePointGroupId = tokenParsed.service_point_group_id;

    const data = await response.json();

    let ror = null;
    for (const servicePoint of data) {
      if (
        servicePoint.groupId &&
        servicePoint.groupId === servicePointGroupId
      ) {
        ror = servicePoint.identifierOwner;
      }
    }
    return ror;
  } catch (error) {
    const errorMessage = "Error: Curren user ROR could not be determined";
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
}
