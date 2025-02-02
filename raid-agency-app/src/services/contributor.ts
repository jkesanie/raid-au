const BASE_URL = "https://orcid.test.raid.org.au";
export async function fetchOrcidContributors({ handle }: { handle: string }) {
  const response = await fetch(`${BASE_URL}/contributors`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ handle }),
  });
  return response.json();
}
