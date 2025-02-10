import { getEnv } from "@/utils/api-utils/api-utils";
const environment = getEnv();

export async function sendInvite({
  email,
  handle,
  token,
}: {
  email: string;
  handle: string;
  token: string;
}) {
  const response = await fetch(
    `https://orcid.${environment}.raid.org.au/invite`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        inviteeEmail: email,
        handle,
      }),
    }
  );
  return await response.json();
}

export async function fetchInvites({ token }: { token: string }) {
  const response = await fetch(
    `https://orcid.${environment}.raid.org.au/invite/fetch`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.json();
}
