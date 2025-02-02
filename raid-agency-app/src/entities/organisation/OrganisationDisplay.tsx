import { DisplayCard } from "@/components/display-card";
import { DisplayItem } from "@/components/display-item";
import OrganisationRoleItem from "@/entities/organisation/role/OrganisationRoleItem";
import type { Organisation } from "@/generated/raid";
import {
  Divider,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { memo } from "react";
import { CloudDownload as CloudDownloadIcon } from "@mui/icons-material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const fetchOrgData = async (id: string) => {
  const response = await fetch(`https://api.ror.org/v2/organizations/${id}`, {
    headers: { Accept: "application/json" },
  });
  return response.json();
};

const useOrganisationNames = () => {
  return useQuery({
    queryKey: ["organisationNames"],
    queryFn: () => {
      const stored = localStorage.getItem("organisationNames");
      return stored ? new Map(JSON.parse(stored)) : new Map();
    },
  });
};

const NoItemsMessage = memo(() => (
  <Typography variant="body2" color="text.secondary" textAlign="center">
    No organisations defined
  </Typography>
));

const OrganisationItem = memo(
  ({
    organisation,
    i,
    organisationName,
  }: {
    organisation: Organisation;
    i: number;
    organisationName?: string | null;
  }) => {
    const queryClient = useQueryClient();

    const { mutate: downloadOrg } = useMutation({
      mutationFn: fetchOrgData,
      onSuccess: (data, id) => {
        const currentNames =
          queryClient.getQueryData<Map<string, string>>([
            "organisationNames",
          ]) || new Map();
        const newNames = new Map(currentNames);

        if (!newNames.has(id)) {
          const displayName = data.names.find((name: any) =>
            name.types.includes("ror_display")
          ).value;
          newNames.set(id, displayName);
          localStorage.setItem(
            "organisationNames",
            JSON.stringify([...newNames])
          );
          queryClient.setQueryData(["organisationNames"], newNames);
        }
      },
    });

    return (
      <Stack gap={2}>
        <Typography variant="body1">Organisation #{i + 1}</Typography>
        <Grid container spacing={2}>
          {(organisationName && (
            <DisplayItem
              label="Organisation Name"
              value={organisationName}
              width={6}
            />
          )) || (
            <Grid item xs={12} sm={12}>
              <Stack direction="row" alignItems="center" width="100%" gap={2}>
                <DisplayItem
                  label="Organisation ID"
                  value={organisation.id}
                  width={6}
                />
                <Tooltip title="Download organisation data to local cache" placement="top">
                  <IconButton onClick={() => downloadOrg(organisation.id)}>
                    <CloudDownloadIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Grid>
          )}
        </Grid>
        <Stack sx={{ pl: 3 }} gap={1}>
          <Stack direction="row" alignItems="baseline">
            <Typography variant="body1" sx={{ mr: 0.5 }}>
              Roles
            </Typography>
            <Typography variant="caption" color="text.disabled">
              Organisation #{i + 1}
            </Typography>
          </Stack>
          <Stack gap={2} divider={<Divider />}>
            {organisation.role.map((role) => (
              <OrganisationRoleItem key={crypto.randomUUID()} item={role} />
            ))}
          </Stack>
        </Stack>
      </Stack>
    );
  }
);

const OrganisationDisplay = memo(({ data }: { data: Organisation[] }) => {
  const { data: organisationNames } = useOrganisationNames();

  return (
    <DisplayCard
      data={data}
      labelPlural="Organisations"
      children={
        <>
          {data.length === 0 && <NoItemsMessage />}
          <Stack gap={2} divider={<Divider />}>
            {data?.map((organisation, i) => (
              <OrganisationItem
                organisation={organisation}
                key={crypto.randomUUID()}
                i={i}
                organisationName={organisationNames?.get(organisation.id)}
              />
            ))}
          </Stack>
        </>
      }
    />
  );
});

NoItemsMessage.displayName = "NoItemsMessage";
OrganisationItem.displayName = "OrganisationItem";
OrganisationDisplay.displayName = "OrganisationDisplay";

export default OrganisationDisplay;
