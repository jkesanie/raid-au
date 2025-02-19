import { Title } from "@/generated/raid";
import { getEnv } from "@/utils/api-utils/api-utils";
const environment = getEnv();

export async function sendInvite({
  email,
  handle,
  token,
  title,
}: {
  email: string;
  handle: string;
  token: string;
  title: string;
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
        title,
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

export async function acceptInvite({
  code,
  token,
}: {
  code: string;
  token: string;
}) {
  console.log("code", code);
  console.log("token", token);
  const response = await fetch(
    `https://orcid.${environment}.raid.org.au/invite/accept`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        code,
      }),
    }
  );
  return await response.json();
}

export async function rejectInvite({
  code,
  token,
}: {
  code: string;
  token: string;
}) {
  const response = await fetch(
    `https://orcid.${environment}.raid.org.au/invite/reject`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        code,
      }),
    }
  );
  return await response.json();
}
