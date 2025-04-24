/**
 * Service Points API Module
 *
 * This module provides functions for interacting with the Service Points API.
 * It handles fetching, creating, and updating service points, as well as managing
 * users associated with service points through Keycloak integration.
 */
import { ServicePoint } from "@/generated/raid";
import {
  CreateServicePointRequest,
  ServicePointMember,
  ServicePointWithMembers,
  UpdateServicePointRequest,
} from "@/types";
import { getApiEndpoint } from "@/utils/api-utils/api-utils";

// Keycloak configuration from environment variables
const kcUrl = import.meta.env.VITE_KEYCLOAK_URL as string;
const kcRealm = import.meta.env.VITE_KEYCLOAK_REALM as string;

// Base API endpoint for service point operations
const endpoint = getApiEndpoint();

/**
 * Fetches all service points
 * 
 * @param token - Authentication token
 * @returns Promise resolving to an array of ServicePoint objects
 */
export const fetchServicePoints = async ({
  token,
}: {
  token: string;
}): Promise<ServicePoint[]> => {
  const url = new URL(`${endpoint}/service-point/`);
  console.log('Requesting service points');

  console.log(`Calling ${url}`);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const servicePoints = await response.json();

  console.log(JSON.stringify(servicePoints));

  return servicePoints;
};

/**
 * Fetches all service points with their associated members
 * 
 * This function makes multiple API calls to:
 * 1. Fetch all service points
 * 2. For each service point, fetch its members from Keycloak
 * 
 * @param token - Authentication token
 * @returns Promise resolving to an array of ServicePointWithMembers objects
 */
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

  // Fetch members for each service point that has a groupId
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

  // Combine service points with their members
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

/**
 * Fetches a single service point with its members
 * 
 * @param id - The service point ID
 * @param token - Authentication token
 * @returns Promise resolving to a ServicePointWithMembers object
 */
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

  // Fetch members if the service point has a groupId
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

  // Combine service point with its members
  const servicePointWithMembers = {
    ...servicePoint,
    members:
      servicePoint.groupId && members.has(servicePoint.groupId)
        ? members.get(servicePoint.groupId)
        : [],
  };

  return servicePointWithMembers;
};

/**
 * Fetches a single service point by ID
 * 
 * @param id - The service point ID
 * @param token - Authentication token
 * @returns Promise resolving to a ServicePoint object
 */
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

/**
 * Creates a new service point
 * 
 * @param data - The service point creation request data
 * @param token - Authentication token
 * @returns Promise resolving to the created ServicePoint
 */
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

/**
 * Updates an existing service point
 * 
 * @param id - The service point ID
 * @param data - The service point update request data
 * @param token - Authentication token
 * @returns Promise resolving to the updated ServicePoint
 */
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

/**
 * Updates a user's role in a service point
 * 
 * @param userId - The user ID
 * @param userGroupId - The group ID representing the service point
 * @param operation - The operation to perform (grant or revoke)
 * @param token - Authentication token
 * @returns Promise resolving to the updated ServicePoint
 */
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

/**
 * Adds a user to the group admins for a service point
 * 
 * @param userId - The user ID
 * @param groupId - The group ID representing the service point
 * @param token - Authentication token
 * @returns Promise resolving to the updated ServicePoint
 */
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

/**
 * Removes a user from the group admins for a service point
 * 
 * @param userId - The user ID
 * @param groupId - The group ID representing the service point
 * @param token - Authentication token
 * @returns Promise resolving to the updated ServicePoint
 */
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

/**
 * Completely removes a user from a service point
 * 
 * This function performs two operations:
 * 1. Removes the active group attribute from the user
 * 2. Removes the user from the service point group in Keycloak
 * 
 * @param userId - The user ID
 * @param groupId - The group ID representing the service point
 * @param token - Authentication token
 * @returns Promise resolving when the operations are complete
 */
export const removeUserFromServicePoint = async ({
  userId,
  groupId,
  token,
}: {
  userId: string;
  groupId: string;
  token: string;
}): Promise<void> => {
  // Step 1: Remove active group attribute
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

  // Step 2: Remove user from group
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
};
