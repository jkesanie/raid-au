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
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

export function InviteRedirect() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const handleBase64 = searchParams.get("handle");
  const navigate = useNavigate();

  const handle = handleBase64 ? atob(handleBase64) : "";

  const { token } = useKeycloak();

  const acceptInviteMutation = useMutation({
    mutationFn: acceptInvite,
    onSuccess: (data, variables) => {
      if (handle) {
        navigate(`/raids/${handle}`);
      }
    },
    onError: (error) => {
      console.error("error", error);
    },
  });

  const rejectInviteMutation = useMutation({
    mutationFn: rejectInvite,
    onSuccess: (data, variables) => {
      navigate(`/raids/`);
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
