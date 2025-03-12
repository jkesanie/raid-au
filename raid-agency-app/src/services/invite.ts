import { getEnv } from "@/utils/api-utils/api-utils";

let currentEnv = getEnv();
if (currentEnv === "dev") {
  currentEnv = "test";
}
const subDomain = "invite";

export async function sendInvite({
  email,
  handle,
  orcid,
  title,
  token,
}: {
  email?: string;
  handle: string;
  orcid?: string;
  title: string;
  token: string;
} & ({ email: string } | { orcid: string })) {
  const response = await fetch(
    `https://${subDomain}.${currentEnv}.raid.org.au/invite`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        inviteeEmail: email || "",
        inviteeOrcid: orcid || "",
        title,
        handle,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to send invite");
  }

  return await response.json();
}

export async function fetchInvites({ token }: { token: string }) {
  const response = await fetch(
    `https://${subDomain}.${currentEnv}.raid.org.au/invite/fetch`,
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
  handle,
}: {
  code: string;
  token: string;
  handle: string;
}) {
  const response = await fetch(
    `https://orcid.${currentEnv}.raid.org.au/invite/accept`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        code,
        handle,
      }),
    }
  );
  return await response.json();
}

export async function rejectInvite({
  code,
  token,
  handle,
}: {
  code: string;
  token: string;
  handle: string;
}) {
  const response = await fetch(
    `https://orcid.${currentEnv}.raid.org.au/invite/reject`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        code,
        handle,
      }),
    }
  );
  return await response.json();
}
