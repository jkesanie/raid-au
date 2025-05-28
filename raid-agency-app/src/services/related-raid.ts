import { API_CONSTANTS } from "@/constants/apiConstants";

async function getEnvironmentForHandle(handle: string): Promise<string> {
  try {
    const response = await fetch(
      API_CONSTANTS.RAID.GET_ENV_FOR_HANDLE
    );
    const handles = await response.json();
    const handlesMap = new Map<string, string>(handles);
    return handlesMap.get(handle) ?? "";
  } catch (error) {
    console.error(`Failed to check`, error);
  }
  return "";
}

export const fetchRelatedRaidTitle = async ({
  handle,
}: {
  handle: string;
}): Promise<string> => {
  const environment = await getEnvironmentForHandle(handle);

  let result = "";

  if (environment) {
    const url = API_CONSTANTS.RAID.RELATED_RAID_TITLE(handle, environment);
    console.log(`Fetching related RAID title from: ${url}`);
    // Fetch the related RAID title from the static URL
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const { raid } = data;

    result =
      raid.title?.map((el: { text: string }) => el.text).join(", ") || "";
  }

  return result;
};
