import { RaidDto, Title } from "@/generated/raid";
import { getLastTwoUrlSegments } from "@/utils/string-utils/string-utils";

const BACKENDS = [
  { key: "prod", url: "https://static.prod.raid.org.au/raids/handles.json" },
  { key: "stage", url: "https://static.stage.raid.org.au/raids/handles.json" },
  { key: "demo", url: "https://static.demo.raid.org.au/raids/handles.json" },
  { key: "test", url: "https://static.test.raid.org.au/raids/handles.json" },
] as const;

export async function getEnvironmentForHandle({
  handle,
}: {
  handle: string;
}): Promise<string | null> {
  for (const { key, url } of BACKENDS) {
    try {
      const response = await fetch(url);
      const handles = await response.json();
      if (new Set(handles).has(handle)) {
        return key;
      }
    } catch (error) {
      console.error(`Failed to check ${key} environment:`, error);
    }
  }
  return null;
}

export const fetchRelatedRaidTitle = async ({
  handle,
}: {
  handle: string;
}): Promise<string> => {
  const environment = await getEnvironmentForHandle({
    handle,
  });

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
