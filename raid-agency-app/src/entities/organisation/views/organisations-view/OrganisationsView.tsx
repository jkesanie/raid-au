import { DisplayCard } from "@/components/display-card";
import { NoItemsMessage } from "@/components/no-items-message";
import type { Organisation } from "@/generated/raid";
import { Divider, Stack } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { memo, useEffect } from "react";
import { OrganisationItemView } from "@/entities/organisation/views/organisation-item-view";

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

const OrganisationsView = memo(({ data }: { data: Organisation[] }) => {
  const { data: organisationNames } = useOrganisationNames();
  const queryClient = useQueryClient();

  const { mutate: downloadAllOrgs } = useMutation({
    mutationFn: async (organisations: Organisation[]) => {
      const results = await Promise.all(
        organisations.map(async (org) => {
          // Use prefetchQuery to leverage caching
          await queryClient.prefetchQuery({
            queryKey: ["organization", org.id],
            queryFn: () => fetchOrgData(org.id),
            staleTime: 1000 * 60 * 60 * 24 * 90,
          });
          return queryClient.getQueryData(["organization", org.id]);
        })
      );
      return results;
    },
    onSuccess: (data, organisations) => {
      const currentNames =
        queryClient.getQueryData<Map<string, string>>(["organisationNames"]) ||
        new Map();
      const newNames = new Map(currentNames);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data.forEach((orgData: any, index) => {
        const orgId = organisations[index].id;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const displayName = orgData.names.find((name: any) =>
          name.types.includes("ror_display")
        ).value;
        newNames.set(orgId, {
          cachedAt: Date.now(),
          value: displayName,
        });
      });

      localStorage.setItem("organisationNames", JSON.stringify([...newNames]));
      queryClient.setQueryData(["organisationNames"], newNames);
    },
  });

  useEffect(() => {
    if (data.length > 0 && organisationNames) {
      const CACHE_EXPIRY_DAYS = 90;
      const MS_PER_DAY = 1000 * 60 * 60 * 24;

      const dataToDownload = data.filter((org) => {
        if (!org.id) return false;
        const cached = organisationNames?.size && organisationNames.get(org.id);
        if (!cached) return true;
        const cacheAge = Date.now() - cached.cachedAt;
        return cacheAge > CACHE_EXPIRY_DAYS * MS_PER_DAY;
      });

      if (dataToDownload.length > 0) {
        downloadAllOrgs(dataToDownload);
      }
    }
  }, [data, organisationNames, downloadAllOrgs]);

  return (
    <DisplayCard
      data={data}
      labelPlural="Organisations"
      children={
        <>
          {data.length === 0 && <NoItemsMessage entity="organisations" />}
          <Stack gap={2} divider={<Divider />}>
            {data?.map((organisation, i) => (
              <OrganisationItemView
                i={i}
                key={organisation.id || i}
                organisation={organisation}
                organisationName={
                  organisationNames?.size &&
                  organisationNames?.get(organisation.id)?.value
                }
              />
            ))}
          </Stack>
        </>
      }
    />
  );
});

OrganisationsView.displayName = "OrganisationsView";

export { OrganisationsView };
