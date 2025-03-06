import { getEnv } from "@/utils/api-utils/api-utils";

export async function fetchOrcidContributors({ handle }: { handle: string }) {
  let environment = getEnv();
  environment = environment === "dev" ? "test" : environment;
  const subDomain = "orcid";
  try {
    const url = `https://${subDomain}.${environment}.raid.org.au`;
    const response = await fetch(`${url}/contributors`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ handle }),
    });

    return response.json();
  } catch (error) {
    // Handle any other errors
    console.error("Error fetching contributors:", error);
    throw error;
  }
}
