import { ServicePoint } from "@/generated/raid";
import {
  CreateServicePointRequest,
  ServicePointMember,
  ServicePointWithMembers,
  UpdateServicePointRequest,
} from "@/types";
import { getApiEndpoint } from "@/utils/api-utils/api-utils";

const kcUrl = import.meta.env.VITE_KEYCLOAK_URL as string;
const kcRealm = import.meta.env.VITE_KEYCLOAK_REALM as string;

const endpoint = getApiEndpoint();

export const fetchServicePoints = async ({
  token,
}: {
  token: string;
}): Promise<ServicePoint[]> => {
  const url = new URL(`${endpoint}/service-point/`);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
};

export const fetchServicePointsWithMembers = async ({
  token,
}: {
  token: string;
}): Promise<ServicePointWithMembers[]> => {
  const servicePointUrl = new URL(`${endpoint}/service-point/`);
  const servicePointMembersUrl = `${kcUrl}/realms/${kcRealm}/group`;

  const members = new Map<string, ServicePointMember[]>();

  const servicePointResponse = await fetch(servicePointUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const servicePoints = await servicePointResponse.json();

  for (const servicePoint of servicePoints) {
    if (servicePoint.groupId) {
      const servicePointMembersResponse = await fetch(
        `${servicePointMembersUrl}?groupId=${servicePoint.groupId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const servicePointMembers = await servicePointMembersResponse.json();
      members.set(
        servicePoint.groupId,
        servicePointMembers.members as ServicePointMember[]
      );
    }
  }

  const servicePointsWithMembers = servicePoints.map(
    (servicePoint: ServicePoint) => {
      return {
        ...servicePoint,
        members: members.has(servicePoint?.groupId as string)
          ? members.get(servicePoint.groupId as string)
          : [],
      };
    }
  );

  return servicePointsWithMembers;
};

export const fetchServicePointWithMembers = async ({
  id,
  token,
}: {
  id: number;
  token: string;
}): Promise<ServicePointWithMembers> => {
  const servicePointUrl = new URL(`${endpoint}/service-point/${id}`);
  const servicePointMembersUrl = `${kcUrl}/realms/${kcRealm}/group`;
  const members = new Map<string, ServicePointMember[]>();

  const servicePointResponse = await fetch(servicePointUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!servicePointResponse.ok) {
    throw new Error(
      `Failed to fetch service point: ${servicePointResponse.status}`
    );
  }

  const servicePoint = await servicePointResponse.json();

  if (servicePoint.groupId) {
    const servicePointMembersResponse = await fetch(
      `${servicePointMembersUrl}?groupId=${servicePoint.groupId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!servicePointMembersResponse.ok) {
      throw new Error(
        `Failed to fetch service point members: ${servicePointMembersResponse.status}`
      );
    }

    const servicePointMembers = await servicePointMembersResponse.json();
    members.set(
      servicePoint.groupId,
      servicePointMembers.members as ServicePointMember[]
    );
  }

  const servicePointWithMembers = {
    ...servicePoint,
    members:
      servicePoint.groupId && members.has(servicePoint.groupId)
        ? members.get(servicePoint.groupId)
        : [],
  };

  return servicePointWithMembers;
};

export const fetchServicePoint = async ({
  id,
  token,
}: {
  id: number;
  token: string;
}): Promise<ServicePoint> => {
  const url = new URL(`${endpoint}/service-point/${id}`);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
};

export const createServicePoint = async ({
  data,
  token,
}: {
  data: CreateServicePointRequest;
  token: string;
}): Promise<ServicePoint> => {
  const url = new URL(`${endpoint}/service-point/`);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data.servicePointCreateRequest),
  });
  return await response.json();
};

export const updateServicePoint = async ({
  id,
  data,
  token,
}: {
  id: number;
  data: UpdateServicePointRequest;
  token: string;
}): Promise<ServicePoint> => {
  const url = new URL(`${endpoint}/service-point/${id}`);

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data.servicePointUpdateRequest),
  });
  return await response.json();
};

export const updateUserServicePointUserRole = async ({
  userId,
  userGroupId,
  operation,
  token,
}: {
  userId: string;
  userGroupId: string;
  operation: "grant" | "revoke";
  token: string;
}): Promise<ServicePoint> => {
  const url = `${kcUrl}/realms/${kcRealm}/group`;

  const response = await fetch(`${url}/${operation}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, groupId: userGroupId }),
  });
  if (!response.ok) {
    throw new Error(`Failed to ${operation}`);
  }
  return response.json();
};

export const addUserToGroupAdmins = async ({
  userId,
  groupId,
  token,
}: {
  userId: string;
  groupId: string;
  token: string;
}): Promise<ServicePoint> => {
  const url = `${kcUrl}/realms/${kcRealm}/group`;

  const response = await fetch(`${url}/group-admin`, {
    method: "PUT",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, groupId }),
  });
  if (!response.ok) {
    throw new Error(`Failed to promote user to group admin`);
  }
  return response.json();
};

export const removeUserFromGroupAdmins = async ({
  userId,
  groupId,
  token,
}: {
  userId: string;
  groupId: string;
  token: string;
}): Promise<ServicePoint> => {
  const url = `${kcUrl}/realms/${kcRealm}/group`;

  const response = await fetch(`${url}/group-admin`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, groupId }),
  });
  if (!response.ok) {
    throw new Error(`Failed to remove user from group admins`);
  }
  return response.json();
};

export const removeUserFromServicePoint = async ({
  userId,
  groupId,
  token,
}: {
  userId: string;
  groupId: string;
  token: string;
}): Promise<void> => {
  // remove active group attribute
  const activeGroupUrl = `${kcUrl}/realms/${kcRealm}/group/active-group`;
  const activeGroupResponse = await fetch(`${activeGroupUrl}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });
  if (!activeGroupResponse.ok) {
    throw new Error(`Failed to remove active group`);
  }

  // remove user from group
  const removeFromGroupUrl = `${kcUrl}/realms/${kcRealm}/group/leave`;
  const removeFromGroupResponse = await fetch(`${removeFromGroupUrl}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, groupId }),
  });
  if (!removeFromGroupResponse.ok) {
    throw new Error(`Failed to remove user from SP`);
  }

  console.log("✅ User removed from SP");
};
