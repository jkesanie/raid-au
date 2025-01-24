import { DisplayCard } from "@/components/display-card";
import { DisplayItem } from "@/components/display-item";
import ContributorPositionItem from "@/entities/contributor/position/ContributorPositionItem";
import ContributorRoleItem from "@/entities/contributor/role/ContributorRoleItem";
import { Contributor } from "@/generated/raid";
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
import { fetchOrcidContributors } from "./service";

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
          {orcidData ? (
            <Button
              href={
                contributor.id
                  ? `https://sandbox.orcid.org/${contributor.id}`
                  : ""
              }
              target="_blank"
              startIcon={
                <img
                  src={
                    contributor.status === "VERIFIED"
                      ? "/orcid-authenticated.svg"
                      : "/orcid-unauthenticated.svg"
                  }
                  alt="orcid-unauthenticated"
                  height={24}
                  width="auto"
                />
              }
              sx={{ textTransform: "none" }}
            >
              {contributor.status === "VERIFIED"
                ? `${orcidData.name}`
                : `${orcidData.email} (awaiting authentication)`}
            </Button>
          ) : (
            <Skeleton variant="rectangular" width={200} height={36} />
          )}
        </Stack>

        <Grid container spacing={2}>
          {orcidData && orcidData.name && (
            <DisplayItem
              label="Name"
              value={orcidData ? orcidData.name : <Skeleton width={150} />}
              width={6}
            />
          )}
          {orcidData && orcidData.name && (
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
  const { data: orcidData, isError } = useQuery({
    queryFn: () => fetchOrcidContributors({ handle: `${prefix}/${suffix}` }),
    queryKey: ["contributors"],
  });

  if (isError) {
    return (
      <Typography variant="body1" color="error" textAlign="center">
        Error loading contributor details
      </Typography>
    );
  }

  return (
    <DisplayCard data={data} labelPlural="Contributors">
      {data.length === 0 ? (
        <NoItemsMessage />
      ) : (
        <Stack gap={2} divider={<Divider />}>
          {data?.map((contributor, i) => (
            <ContributorItem
              contributor={contributor}
              orcidData={orcidData?.find(
                (orcid: any) => orcid.contributorUuid === contributor.uuid
              )}
              key={crypto.randomUUID()}
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
