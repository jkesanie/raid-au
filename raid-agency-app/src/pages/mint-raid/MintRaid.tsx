import { useErrorDialog } from "@/components/error-dialog";
import { RaidForm } from "@/components/raid-form";
import { RaidFormErrorMessage } from "@/components/raid-form-error-message";
import { useKeycloak } from "@/contexts/keycloak-context";
import { RaidDto } from "@/generated/raid";
import { createOneRaid } from "@/services/raid";
import { newRaid, raidRequest } from "@/utils/data-utils";
import { Container, Stack } from "@mui/material";

import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const MintRaid = () => {
  const { openErrorDialog } = useErrorDialog();
  const { token } = useKeycloak();
  const navigate = useNavigate();

  const mintMutation = useMutation({
    mutationFn: createOneRaid,
    onSuccess: async (data) => {
      const resultHandle = new URL(data.identifier?.id ?? "");
      const [prefix, suffix] = resultHandle.pathname.split("/").filter(Boolean);
      navigate(`/raids/${prefix}/${suffix}`);
    },
    onError: (error: Error) => {
      RaidFormErrorMessage(error, openErrorDialog);
    },
  });

  const handleSubmit = async (data: RaidDto) => {
    mintMutation.mutate({
      raid: raidRequest(data),
      token: token!,
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Stack gap={2}>
        <RaidForm
          raidData={newRaid}
          onSubmit={handleSubmit}
          isSubmitting={mintMutation.isPending}
          prefix={""}
          suffix={""}
        />
      </Stack>
    </Container>
  );
};
