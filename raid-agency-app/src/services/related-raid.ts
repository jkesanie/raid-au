async function getEnvironmentForHandle(handle: string): Promise<string> {
  try {
    const response = await fetch(
      "https://static.prod.raid.org.au/api/all-handles.json"
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
    const url = `https://static.${environment}.raid.org.au/raids/${handle}.json`;
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
