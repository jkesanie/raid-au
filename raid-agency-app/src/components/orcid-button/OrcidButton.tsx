import { Contributor } from "@/generated/raid";
import { Button } from "@mui/material";

interface ContributorWithStatus extends Contributor {
  uuid: string;
  status: string;
}

export function OrcidButton({
  contributor,
  orcidData,
}: {
  contributor: ContributorWithStatus;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  orcidData: any;
}) {
  // Define status constants
  const STATUS = {
    AUTHENTICATED: "AUTHENTICATED",
    UNAUTHENTICATED: "UNAUTHENTICATED",
    AWAITING_AUTHENTICATION: "AWAITING_AUTHENTICATION",
    AUTHENTICATION_FAILED: "AUTHENTICATION_FAILED",
  };

  // Get status directly
  const status = contributor.status || "";
  const isAuthenticated = status === STATUS.AUTHENTICATED;

  // Create a mapping for status display texts
  const statusDisplayText = {
    [STATUS.UNAUTHENTICATED]: `${contributor.id} (unauthenticated)`,
    [STATUS.AWAITING_AUTHENTICATION]: `${contributor.id} (awaiting authentication)`,
    [STATUS.AUTHENTICATION_FAILED]: `${contributor.id} (authentication failed)`,
  };

  // Determine button label based on authentication status
  const buttonLabel = isAuthenticated
    ? orcidData?.name
      ? orcidData.name
      : contributor.id
    : statusDisplayText[status] || "";

  return (
    <Button
      variant="contained"
      color="inherit"
      href={contributor.id ? `${contributor.id}` : ""}
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
      {buttonLabel}
    </Button>
  );
}
