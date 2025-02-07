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
