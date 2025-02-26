import packageJson from "@/../package.json";
import { RaidDto } from "@/generated/raid";
import { RaidHistoryType } from "@/pages/raid-history";
import { getApiEndpoint } from "@/utils/api-utils/api-utils";

const endpoint = getApiEndpoint();
const API_ENDPOINT = `${endpoint}/raid`;

const getDefaultHeaders = (token: string) => ({
  "Content-Type": "application/json",
  "X-Raid-Api-Version": packageJson.apiVersion,
  Authorization: `Bearer ${token}`,
});

export const fetchAllRaids = async ({
  fields,
  token,
}: {
  fields?: string[];
  token: string;
}): Promise<RaidDto[]> => {
  // the trailing slash is required for the API to work
  const url = new URL(`${API_ENDPOINT}/`);

  if (fields?.length) {
    url.searchParams.set("includeFields", fields.join(","));
  }

  const response = await fetch(url, {
    headers: getDefaultHeaders(token),
  });

  if (!response.ok) {
    throw new Error(`RAiDs could not be fetched`);
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));
  return response.json();
};

export const fetchOneRaid = async ({
  handle,
  token,
}: {
  handle: string;
  token: string;
}): Promise<RaidDto> => {
  const url = `${API_ENDPOINT}/${handle}`;
  const response = await fetch(url, {
    method: "GET",
    headers: getDefaultHeaders(token),
  });

  if (!response.ok) {
    throw new Error(`RAiD could not be fetched`);
  }

  return await response.json();
};

export const fetchOneRaidHistory = async ({
  handle,
  token,
}: {
  handle: string;
  token: string;
}): Promise<RaidHistoryType[]> => {
  const url = `${API_ENDPOINT}/${handle}/history`;
  const response = await fetch(url, {
    method: "GET",
    headers: getDefaultHeaders(token),
  });

  if (!response.ok) {
    throw new Error(`RAiD history could not be fetched`);
  }

  return await response.json();
};

export const createOneRaid = async ({
  raid,
  token,
}: {
  raid: RaidDto;
  token: string;
}): Promise<RaidDto> => {
  const url = `${API_ENDPOINT}/`;
  const response = await fetch(url, {
    method: "POST",
    headers: getDefaultHeaders(token),
    body: JSON.stringify(raid),
  });

  if (!response.ok) {
    throw new Error(`RAiD could not be created`);
  }

  return await response.json();
};

export const updateOneRaid = async ({
  data,
  handle,
  token,
}: {
  data: RaidDto;
  handle: string;
  token: string;
}): Promise<RaidDto> => {
  const raidToBeUpdated = transformBeforeUpdate(data);
  const url = `${API_ENDPOINT}/${handle}`;
  const response = await fetch(url, {
    method: "PUT",
    headers: getDefaultHeaders(token),
    body: JSON.stringify(raidToBeUpdated),
  });

  if (!response.ok) {
    throw new Error(`RAiD could not be created`);
  }

  return await response.json();
};

export const transformBeforeUpdate = (raid: RaidDto): RaidDto => {
  // set all endDates to `undefined` if the value is an empty string
  if (raid?.date?.endDate === "") {
    raid.date.endDate = undefined;
  }

  if (raid?.title) {
    raid.title.forEach((title) => {
      if (title.endDate === "") {
        title.endDate = undefined;
      }
    });
  }

  if (raid?.contributor) {
    raid.contributor.forEach((contributor) => {
      if (contributor.position) {
        contributor.position.forEach((position) => {
          if (position.endDate === "") {
            position.endDate = undefined;
          }
        });
      }
    });
  }

  if (raid?.organisation) {
    raid.organisation.forEach((organisation) => {
      if (organisation.role) {
        organisation.role.forEach((role) => {
          if (role.endDate === "") {
            role.endDate = undefined;
          }
        });
      }
    });
  }

  return raid;
};
