import { RaidDto } from "@/generated/raid";

async function getEnvironmentForHandle(handle: string): Promise<string> {
  try {
    const response = await fetch(
      "https://static.test.raid.org.au/api/handles.json"
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

  const url = `https://static.${environment}.raid.org.au/raids/${handle}.json`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: {
    raid: RaidDto;
  } = await response.json();

  return (
    data.raid.title?.map((el: { text: string }) => el.text).join(", ") || ""
  );
};
