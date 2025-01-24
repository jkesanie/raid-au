import { AnchorButtons } from "@/components/anchor-buttons";
import type { Breadcrumb } from "@/components/breadcrumbs-bar";
import { BreadcrumbsBar } from "@/components/breadcrumbs-bar";
import { ErrorAlertComponent } from "@/components/error-alert-component";
import { RaidDto } from "@/generated/raid";
import { Loading } from "@/pages/loading";
import {
  ExternalLinksDisplay,
  RaidDisplayMenu,
  RawDataDisplay,
} from "@/pages/raid-display/components";
import { fetchRaid } from "@/services/raid";
import { getApiEndpoint } from "@/utils/api-utils/api-utils";
import { displayItems } from "@/utils/data-utils/data-utils";
import {
  DocumentScanner as DocumentScannerIcon,
  HistoryEdu as HistoryEduIcon,
  Home as HomeIcon,
} from "@mui/icons-material";
import { Box, Container, Stack } from "@mui/material";
import { useKeycloak } from "@react-keycloak/web";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";

export const RaidDisplay = () => {
  const endpoint = getApiEndpoint();
  const { keycloak, initialized } = useKeycloak();
  const { prefix, suffix } = useParams() as { prefix: string; suffix: string };
  const [searchParams] = useSearchParams();
  const verify = searchParams.get("verify");
  const handle = `${prefix}/${suffix}`;

  const readQuery = useQuery<RaidDto>({
    queryKey: ["raids", prefix, suffix],
    queryFn: () =>
      fetchRaid({
        id: handle,
        token: keycloak.token || "",
      }),
    enabled: initialized && keycloak.authenticated,
  });

  const updateOrcidStatus = async (verify: string) => {
    try {
      const [orcid, uuid] = atob(verify).split("|");
      if (!readQuery.data?.contributor) return;
      const contributors = readQuery.data.contributor;
      for (const contributor of contributors) {
        if (contributor.uuid === uuid) {
          contributor.id = orcid;
          contributor.status = "VERIFIED";
        } else {
          contributor.id = contributor.id || "";
        }
      }

      const response = await fetch(`${endpoint}/raid/${prefix}/${suffix}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${keycloak.token}`,
        },
        body: JSON.stringify({
          contributor: contributors,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      window.location.href = window.location.pathname;
      return data;
    } catch (error) {
      console.error("Error updating ORCID status:", error);
    }
  };

  useEffect(() => {
    if (verify && readQuery.data) {
      updateOrcidStatus(verify);
    }
  }, [verify, readQuery.data, prefix, suffix, endpoint, keycloak.token]);

  if (readQuery.isPending) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  if (readQuery.isError) {
    return <ErrorAlertComponent error={readQuery.error} />;
  }

  const raidData = readQuery.data;

  const breadcrumbs: Breadcrumb[] = [
    {
      label: "Home",
      to: "/",
      icon: <HomeIcon />,
    },
    {
      label: "RAiDs",
      to: "/raids",
      icon: <HistoryEduIcon />,
    },
    {
      label: `RAiD ${prefix}/${suffix}`,
      to: `/raids/${prefix}/${suffix}`,
      icon: <DocumentScannerIcon />,
    },
  ];

  return (
    <>
      <RaidDisplayMenu prefix={prefix} suffix={suffix} />
      <Container>
        <Stack direction="column" spacing={2}>
          <BreadcrumbsBar breadcrumbs={breadcrumbs} />
          <AnchorButtons raidData={raidData} />
          {displayItems.map(({ itemKey, Component, emptyValue }) => {
            const data =
              raidData[itemKey as keyof RaidDto] || (emptyValue as any);
            return (
              <Box id={itemKey} key={itemKey} className="scroll">
                <Component data={data} />
              </Box>
            );
          })}
          <Box id="externalLinks" className="scroll">
            <ExternalLinksDisplay prefix={prefix} suffix={suffix} />
          </Box>
          <Box id="rawData" className="scroll">
            <RawDataDisplay raidData={raidData} />
          </Box>
        </Stack>
      </Container>
    </>
  );
};
