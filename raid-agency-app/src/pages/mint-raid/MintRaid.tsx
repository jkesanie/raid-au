import { useErrorDialog } from "@/components/error-dialog";
import { RaidForm } from "@/components/raid-form";
import { RaidFormErrorMessage } from "@/components/raid-form-error-message";
import { RaidDto } from "@/generated/raid";
import { createRaid } from "@/services/raid";
import { newRaid, raidRequest } from "@/utils/data-utils";
import { Container, Stack } from "@mui/material";
import { useKeycloak } from "@react-keycloak/web";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const MintRaid = () => {
  const { openErrorDialog } = useErrorDialog();
  const { keycloak } = useKeycloak();
  const navigate = useNavigate();

  const mintMutation = useMutation({
    mutationFn: createRaid,
    onSuccess: async (data, variables) => {
      const resultHandle = new URL(data.identifier?.id ?? "");
      const [prefix, suffix] = resultHandle.pathname.split("/").filter(Boolean);

      const contributors: {
        uuid: string;
        email: string;
      }[] = [];

      if (data.contributor) {
        for (let i = 0; i < data.contributor.length; i++) {
          contributors.push({
            uuid: data.contributor[i].uuid ?? "",
            email: variables.data.contributor?.[i]?.email ?? "",
          });
        }
      }

      const response = await fetch(
        `https://orcid.test.raid.org.au/raid-update`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            handle: data?.identifier?.id,
            contributors,
          }),
        }
      );
      console.log("response", response);

      navigate(`/raids/${prefix}/${suffix}`);
    },
    onError: (error: Error) => {
      RaidFormErrorMessage(error, openErrorDialog);
    },
  });

  const handleSubmit = async (data: RaidDto) => {
    mintMutation.mutate({
      data: raidRequest(data),
      token: keycloak.token || "",
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
