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
  const code = searchParams.get("code");
  const handleBase64 = searchParams.get("handle");
  const { openSnackbar } = useSnackbar();

  const handle = handleBase64 ? atob(handleBase64) : "";

  const { token } = useKeycloak();
  useEffect(() => {
    if (code && token && handle) {
      acceptInviteMutation.mutate({
        code: code!,
        token: token!,
        handle,
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
        }, 2000);
      }
    },
    onError: (error) => {
      console.error("error", error);
    },
  });

  return (
    <Container>
      <Loading />
    </Container>
  );
}
