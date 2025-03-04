import { getEnv } from "@/utils/api-utils/api-utils";

export async function fetchOrcidContributors({ handle }: { handle: string }) {
  let environment = getEnv();
  environment = environment === "dev" ? "test" : environment;
  const subDomain = "orcid";
  const subDomainAlt = "api2";

  // First try with the primary subdomain
  const primaryUrl = `https://${subDomain}.${environment}.raid.org.au`;

  try {
    const primaryResponse = await fetch(`${primaryUrl}/contributors`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ handle }),
    });

    // If response is not ok and it's a 404, try the alternative subdomain
    if (!primaryResponse.ok) {
      const alternativeUrl = `https://${subDomainAlt}.${environment}.raid.org.au`;
      const alternativeResponse = await fetch(
        `${alternativeUrl}/contributors`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ handle }),
        }
      );

      return alternativeResponse.json();
    }

    // If primary response was successful or error was not 404, return its result
    return primaryResponse.json();
  } catch (error) {
    // Handle any other errors
    console.error("Error fetching contributors:", error);
    throw error;
  }
}
