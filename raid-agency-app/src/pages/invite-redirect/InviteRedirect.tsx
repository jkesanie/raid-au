import { useSnackbar } from "@/components/snackbar";
import { useKeycloak } from "@/contexts/keycloak-context";
import { acceptInvite } from "@/services/invite";
import { Container } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Loading } from "../loading";

export function InviteRedirect() {
  const [searchParams] = useSearchParams();
  const codeCombined = searchParams.get("code");
  const { openSnackbar } = useSnackbar();

  const [code, handle] = codeCombined?.split(":") || [];

  const { token } = useKeycloak();
  useEffect(() => {
    if (code && handle) {
      acceptInviteMutation.mutate({
        code: code!,
        token: token!,
        handle: atob(handle),
      });
    }
  }, []);

  const acceptInviteMutation = useMutation({
    mutationFn: acceptInvite,
    onSuccess: (data) => {
      if (data?.handle) {
        openSnackbar(
          `✅ You have accepted the invitation to join ${data.handle}. Redirecting now...`
        );
        setTimeout(() => {
          // we can't use react-router's navigate here, because we need a page refresh to get the new token
          window.location.href = `/raids/${data.handle}`;
        }, 500);
      }
    },
    onError: (error) => {
      console.error("error", error);
    },
  });

  return <></>;
}
