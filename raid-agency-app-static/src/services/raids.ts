/// <reference types="astro/client" />

import type { RaidDto, ServicePoint } from "@/generated/raid";
import fs from "fs";

const apiEndpoint = import.meta.env.API_ENDPOINT;
const iamEndpoint = import.meta.env.IAM_ENDPOINT;

const iamClientId = import.meta.env.IAM_CLIENT_ID;
const iamClientSecret = import.meta.env.IAM_CLIENT_SECRET;

import { createCustomKeyDiff } from "@/utils/diff-utils";

async function getAuthToken(): Promise<string> {
  const TOKEN_PARAMS = {
    grant_type: "client_credentials",
    client_id: iamClientId,
    client_secret: iamClientSecret,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(TOKEN_PARAMS),
  };

  try {
    const response = await fetch(
      `${iamEndpoint}/realms/raid/protocol/openid-connect/token`,
      requestOptions
    );

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `Authentication failed: ${response.status} - ${errorBody}`
      );
    }

    const { access_token } = await response.json();

    return access_token;
  } catch (error) {
    console.error(
      "Authentication token fetch failed. ",
      error instanceof Error ? error.message : ""
    );
    throw new Error("Failed to obtain authentication token");
  }
}

export async function fetchRaids(): Promise<RaidDto[]> {
  try {
    const response = await fetch(
      `https://static.${import.meta.env.RAID_ENV || "test"}.raid.org.au/api/raids.json/`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    fs.writeFileSync(
      "src/temp/before.json",
      JSON.stringify(data, null, 2),
      "utf-8"
    );

    const token = await getAuthToken();

    const servicePoints = await fetchServicePoints({ token });
    const ids = servicePoints.map((sp) => sp.id);

    const raidsFromAllSps: RaidDto[] = [];

    for (const id of ids) {
      console.log(
        `Fetching data from ${apiEndpoint}/raid/?servicePointId=${id}`
      );
      const response = await fetch(
        `${apiEndpoint}/raid/?servicePointId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = (await response.json()) as RaidDto[];

      console.log(`SP ${id}: ${data.length} raids`);
      raidsFromAllSps.push(...data);
    }

    fs.writeFileSync(
      "src/temp/after.json",
      JSON.stringify(raidsFromAllSps, null, 2),
      "utf-8"
    );

    const before = fs.readFileSync("src/temp/before.json", "utf-8");
    const after = fs.readFileSync("src/temp/after.json", "utf-8");

    const customDiff = createCustomKeyDiff(
      JSON.parse(before),
      JSON.parse(after),
      (index, item, _) => {
        return item?.id || `${index === 0 ? index : item?.identifier?.id}`;
      }
    );

    fs.writeFileSync(
      "src/temp/diff.json",
      JSON.stringify(customDiff, null, 2),
      "utf-8"
    );
    return raidsFromAllSps;
  } catch (error) {
    console.error("There was a problem fetching the raids:", error);
    throw error;
  }
}

export async function fetchServicePoints({
  token,
}: {
  token: string;
}): Promise<ServicePoint[]> {
  try {
    const response = await fetch(`${apiEndpoint}/service-point/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return (await response.json()) as ServicePoint[];
  } catch (error) {
    console.error("There was a problem fetching the raids:", error);
    throw error;
  }
}
