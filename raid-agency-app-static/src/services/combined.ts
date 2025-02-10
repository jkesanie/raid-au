/// <reference types="astro/client" />

const BACKENDS = [
  { key: "prod", url: "https://static.prod.raid.org.au/raids/handles.json" },
  { key: "stage", url: "https://static.stage.raid.org.au/raids/handles.json" },
  { key: "demo", url: "https://static.demo.raid.org.au/raids/handles.json" },
  { key: "test", url: "https://static.test.raid.org.au/raids/handles.json" },
] as const;

export async function combinedHandles(): Promise<Map<string, string>> {
  const handles = new Map<string, string>();
  const fetchPromises = BACKENDS.map((backend) =>
    fetch(backend.url)
      .then((response) => response.json())
      .then((data) => {
        for (const handle of data) {
          handles.set(handle, backend.key);
        }
      })
  );

  await Promise.all(fetchPromises);
  return handles;
}
