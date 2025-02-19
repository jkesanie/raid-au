import { useSnackbar } from "@/components/snackbar";
import { useKeycloak } from "@/contexts/keycloak-context";
import { acceptInvite, rejectInvite } from "@/services/invite";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Stack,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";

export function InviteRedirect() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const handleBase64 = searchParams.get("handle");
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();

  const handle = handleBase64 ? atob(handleBase64) : "";

  const { token } = useKeycloak();

  const acceptInviteMutation = useMutation({
    mutationFn: acceptInvite,
    onSuccess: (data, variables) => {
      if (data?.handle) {
        openSnackbar(
          `✅ You have accepted the invitation to join ${data.handle}. Redirecting now...`
        );
        setTimeout(() => {
          // we can't use react-router's navigate here, because we need a page refresh to get the new token
          window.location.href = `/raids/${data.handle}`;
        }, 3000);
      }
    },
    onError: (error) => {
      console.error("error", error);
    },
  });

  const rejectInviteMutation = useMutation({
    mutationFn: rejectInvite,
    onSuccess: (data, variables) => {
      openSnackbar(
        `✅ You have rejected the invitation to join ${data.handle}. Redirecting now...`
      );
      setTimeout(() => {
        navigate(`/raids`);
      }, 3000);
    },
    onError: (error) => {
      console.error("error", error);
    },
  });

  return (
    <Container>
      <Card>
        <CardHeader
          title="You are invited"
          subheader="Please accept or reject the invitation"
        />
        <CardContent>
          <Stack spacing={2} direction="row">
            <Button
              variant="outlined"
              color="success"
              onClick={() => {
                acceptInviteMutation.mutate({
                  code: code!,
                  token: token!,
                  handle,
                });
              }}
            >
              Accept
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                rejectInviteMutation.mutate({
                  code: code!,
                  token: token!,
                  handle,
                });
              }}
            >
              Reject
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}
