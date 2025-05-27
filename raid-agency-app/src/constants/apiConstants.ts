import { getApiEndpoint } from "@/utils/api-utils/api-utils";

export const BASE_URL = getApiEndpoint();

// Reusable endpoint path builder

export const API_CONSTANTS = {
  SERVICE_POINT: {
    ALL: `${BASE_URL}/service-point/`,
    BY_ID: (id:number) => `${BASE_URL}/service-point/${id}`,
  },
};