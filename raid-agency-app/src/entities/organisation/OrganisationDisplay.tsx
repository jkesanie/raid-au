import { DisplayCard } from "@/components/display-card";
import { DisplayItem } from "@/components/display-item";
import OrganisationRoleItem from "@/entities/organisation/role/OrganisationRoleItem";
import type { Organisation } from "@/generated/raid";
import { Divider, Grid, Stack, Typography } from "@mui/material";
import { memo, useEffect } from "react";
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
    i,
    organisation,
    organisationName,
  }: {
    i: number;
    organisation: Organisation;
    organisationName?: string | null;
  }) => {
    return (
      <Stack gap={2}>
        <Typography variant="h6">
          {organisationName ? organisationName : `Organisation #{${i + 1}}`}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <DisplayItem
              label="Organisation ID"
              value={organisation.id}
              width={6}
            />
          </Grid>
        </Grid>
        <Stack sx={{ pl: 3 }} gap={1}>
          <Stack direction="row" alignItems="baseline">
            <Typography variant="body1" sx={{ mr: 0.5 }}>
              Roles
            </Typography>
            <Typography variant="caption" color="text.disabled">
              {organisationName ? organisationName : `Organisation #{${i + 1}}`}
            </Typography>
          </Stack>
          <Stack gap={2} divider={<Divider />}>
            {organisation.role.map((role, i) => (
              <OrganisationRoleItem key={organisation.id || i} item={role} />
            ))}
          </Stack>
        </Stack>
      </Stack>
    );
  }
);

const OrganisationDisplay = memo(({ data }: { data: Organisation[] }) => {
  const { data: organisationNames } = useOrganisationNames();
  const queryClient = useQueryClient();

  const { mutate: downloadAllOrgs } = useMutation({
    mutationFn: async (organisations: Organisation[]) => {
      // Only fetch for organizations not in cache
      const results = await Promise.all(
        organisations.map((org) => fetchOrgData(org.id))
      );
      return results;
    },
    onSuccess: (data, organisations) => {
      const currentNames =
        queryClient.getQueryData<Map<string, string>>(["organisationNames"]) ||
        new Map();
      const newNames = new Map(currentNames);

      data.forEach((orgData, index) => {
        const orgId = organisations[index].id;
        const displayName = orgData.names.find((name: any) =>
          name.types.includes("ror_display")
        ).value;
        newNames.set(orgId, displayName);
      });

      localStorage.setItem("organisationNames", JSON.stringify([...newNames]));
      queryClient.setQueryData(["organisationNames"], newNames);
    },
  });

  useEffect(() => {
    if (data.length > 0 && organisationNames) {
      // Filter out organisations that are already in the cache
      const orgsToDownload = data.filter(
        (org) => !organisationNames.has(org.id)
      );

      if (orgsToDownload.length > 0) {
        downloadAllOrgs(orgsToDownload);
      }
    }
  }, [data, organisationNames, downloadAllOrgs]);

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
                i={i}
                key={organisation.id || i}
                organisation={organisation}
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
