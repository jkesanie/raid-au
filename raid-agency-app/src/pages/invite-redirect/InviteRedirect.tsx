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
  const { prefix, suffix } = useParams();
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const navigate = useNavigate();

  const { token } = useKeycloak();

  const acceptInviteMutation = useMutation({
    mutationFn: acceptInvite,
    onSuccess: (data, variables) => {
      console.log("data", data);
      console.log("variables", variables);
      if (data && data.handle) {
        navigate(`/raids/${data.handle}`);
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
                  handle: `${prefix}/${suffix}`,
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
                  handle: `${prefix}/${suffix}`,
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
