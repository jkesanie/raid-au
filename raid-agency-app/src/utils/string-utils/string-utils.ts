export function removeNumberInBrackets(str: string) {
  return str.replace(/\[\d+\](?![^[]*\])/, "");
}

export function isValidNumber(value: unknown) {
  return typeof value === "number" && value !== null && !isNaN(value);
}

export function getLastTwoUrlSegments(url: string): string | null {
  const parts = url.split("/").filter((part) => part.length > 0);
  if (parts.length < 2) {
    return null;
  }
  return parts.slice(-2).join("/");
}

export function extractOrcidId(url: string): string | null {
  const regex =
    /(?:https?:\/\/(?:sandbox\.)?orcid\.org\/)?(\d{4}-\d{4}-\d{4}-\d{3}[\dX])/;
  const match = url.match(regex);
  return match ? match[1] : null;
}
