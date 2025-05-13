import { getEnv } from "@/utils/api-utils/api-utils";
import {authService} from "@/services/auth-service.ts";

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
  const response = await authService.fetchWithAuth(
    `https://${subDomain}.${currentEnv}.raid.org.au/invite`,
    {
      method: "POST",
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
  const response = await authService.fetchWithAuth(
      `https://${subDomain}.${currentEnv}.raid.org.au/invite/fetch`
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
  const response = await authService.fetchWithAuth(
    `https://${subDomain}.${currentEnv}.raid.org.au/invite/accept`,
    {
      method: "POST",
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
  const response = await authService.fetchWithAuth(
    `https://${subDomain}.${currentEnv}.raid.org.au/invite/reject`,
    {
      method: "POST",
      body: JSON.stringify({
        code,
        handle,
      }),
    }
  );
  return await response.json();
}
