import { getEnv } from "@/utils/api-utils/api-utils";

let environment = getEnv();
environment = environment === "dev" ? "demo" : environment;
const subDomain = "api2"
const BASE_URL = `https://${subDomain}.${environment}.raid.org.au`;
export async function fetchOrcidContributors({ handle }: { handle: string }) {
  const response = await fetch(`${BASE_URL}/contributors`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ handle }),
  });
  return response.json();
}
