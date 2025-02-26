import { DisplayCard } from "@/components/display-card";
import { DisplayItem } from "@/components/display-item";
import { ErrorAlertComponent } from "@/components/error-alert-component";
import ContributorPositionItem from "@/entities/contributor/position/ContributorPositionItem";
import ContributorRoleItem from "@/entities/contributor/role/ContributorRoleItem";
import { Contributor } from "@/generated/raid";
import { fetchOrcidContributors } from "@/services/contributor";
import {
  Button,
  Divider,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { memo } from "react";
import { useParams } from "react-router-dom";

function OrcidButton({
  contributor,
  orcidData,
}: {
  contributor: Contributor;
  orcidData: any;
}) {
  const isAuthenticated =
    orcidData &&
    orcidData.hasOwnProperty("status") &&
    orcidData.status === "AUTHENTICATED";

  return (
    <Button
      variant="contained"
      color="inherit"
      href={contributor.id ? `https://sandbox.orcid.org/${contributor.id}` : ""}
      target="_blank"
      startIcon={
        <img
          src={
            isAuthenticated
              ? "/orcid-authenticated.svg"
              : "/orcid-unauthenticated.svg"
          }
          alt={isAuthenticated ? "authenticated" : "unauthenticated"}
          height={24}
          width="auto"
        />
      }
      sx={{ textTransform: "none" }}
    >
      {isAuthenticated
        ? orcidData.name
        : `${
            orcidData?.email ? orcidData?.email : ""
          } (awaiting authentication)`}
    </Button>
  );
}

const NoItemsMessage = memo(() => (
  <Typography variant="body2" color="text.secondary" textAlign="center">
    No contributors defined
  </Typography>
));

const ContributorItem = memo(
  ({
    contributor,
    orcidData,
    i,
  }: {
    contributor: Contributor;
    orcidData?: any;
    i: number;
  }) => {
    return (
      <Stack gap={2}>
        <Typography variant="body1">Contributor #{i + 1}</Typography>

        <Stack direction="row" alignItems="center" gap={1}>
          <OrcidButton contributor={contributor} orcidData={orcidData} />
        </Stack>

        <Grid container spacing={2}>
          {orcidData && orcidData.orcid && (
            <DisplayItem
              label="ORCID"
              value={orcidData ? orcidData.orcid : <Skeleton width={150} />}
              width={6}
            />
          )}
          <DisplayItem
            label="Leader"
            value={contributor.leader ? "Yes" : "No"}
            width={2}
          />
          <DisplayItem
            label="Contact"
            value={contributor.contact ? "Yes" : "No"}
            width={2}
          />
        </Grid>

        <Stack gap={2} sx={{ pl: 3 }}>
          <Stack direction="row" alignItems="baseline">
            <Typography variant="body1" sx={{ mr: 0.5 }}>
              Roles
            </Typography>
            <Typography variant="caption" color="text.disabled">
              Contributor #{i + 1}
            </Typography>
          </Stack>
          <Grid container spacing={1}>
            {contributor?.role ? (
              contributor.role
                .sort((a, b) => a.id.localeCompare(b.id))
                .map((role) => (
                  <ContributorRoleItem
                    key={crypto.randomUUID()}
                    contributorRole={role}
                  />
                ))
            ) : (
              <Grid item xs={12}>
                <Skeleton variant="rectangular" height={40} />
              </Grid>
            )}
          </Grid>

          <Stack direction="row" alignItems="baseline">
            <Typography variant="body1" sx={{ mr: 0.5 }}>
              Positions
            </Typography>
            <Typography variant="caption" color="text.disabled">
              Contributor #{i + 1}
            </Typography>
          </Stack>
          <Stack gap={2} divider={<Divider />}>
            {contributor?.position ? (
              contributor.position.map((position) => (
                <ContributorPositionItem
                  key={crypto.randomUUID()}
                  contributorPosition={position}
                />
              ))
            ) : (
              <Skeleton variant="rectangular" height={60} />
            )}
          </Stack>
        </Stack>
      </Stack>
    );
  }
);

const ContributorDisplay = memo(({ data }: { data: Contributor[] }) => {
  const { prefix, suffix } = useParams<{ prefix: string; suffix: string }>();
  const orcidDataQuery = useQuery({
    queryFn: () => fetchOrcidContributors({ handle: `${prefix}/${suffix}` }),
    queryKey: ["orcid-contributors"],
  });

  if (orcidDataQuery.isPending) {
    return <Skeleton variant="rectangular" height={200} />;
  }

  if (orcidDataQuery.isError) {
    return <ErrorAlertComponent error="Error loading contributor details" />;
  }

  const orcidData = orcidDataQuery.data;

  const fetchCurrentOrcidData = ({
    contributor,
  }: {
    contributor: Contributor;
  }) => {
    return "uuid" in contributor
      ? orcidData?.find((orcid: any) => orcid?.uuid === contributor.uuid)
      : null;
  };

  return (
    <DisplayCard data={data} labelPlural="Contributors">
      {data.length === 0 ? (
        <NoItemsMessage />
      ) : (
        <Stack gap={2} divider={<Divider />}>
          {data?.map((contributor, i) => (
            <ContributorItem
              contributor={contributor}
              orcidData={fetchCurrentOrcidData({ contributor })}
              key={contributor.id || i}
              i={i}
            />
          ))}
        </Stack>
      )}
    </DisplayCard>
  );
});

NoItemsMessage.displayName = "NoItemsMessage";
ContributorItem.displayName = "ContributorItem";
ContributorDisplay.displayName = "ContributorDisplay";

export default ContributorDisplay;
