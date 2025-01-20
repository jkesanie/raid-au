export function getRaidAppUrl(): string {
  const localStaticPort = 4321;
  const apiEndpoint = import.meta.env.API_ENDPOINT;
  const environment = apiEndpoint.includes("test")
    ? "test"
    : apiEndpoint.includes("demo")
      ? "demo"
      : apiEndpoint.includes("prod")
        ? "prod"
        : apiEndpoint.includes("stage")
          ? "stage"
          : "dev";

  if (environment === "dev") {
    return `http://localhost:${localStaticPort}`;
  }

  if (environment === "test" || "dev") {
    console.log("environment", environment);
  }

  return `https://app.${environment}.raid.org.au`;
}
