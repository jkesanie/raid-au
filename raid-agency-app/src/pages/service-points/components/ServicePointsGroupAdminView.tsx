import { ErrorAlertComponent } from "@/components/error-alert-component";
import { ServicePointsTable } from "@/components/service-points-table";
import { useKeycloak } from "@/contexts/keycloak-context";
import { Loading } from "@/pages/loading";
import {
  fetchServicePoint,
  fetchServicePoints,
} from "@/services/service-points";
import { Card, CardContent, CardHeader } from "@mui/material";

import { useQuery } from "@tanstack/react-query";

export const ServicePointsGroupAdminView = () => {
  const { token, tokenParsed } = useKeycloak();
  const servicePointGroupId = tokenParsed?.service_point_group_id;

  const fetchServicePointById = async () => {
    const data = await fetchServicePoints({
      token: token!,
    });

    const servicePointNumber = data.find(
      (sp) => sp.groupId === servicePointGroupId
    )?.id;

    return await fetchServicePoint({
      id: servicePointNumber!,
      token: token!,
    });
  };

  const fetchServicePointByIdQuery = useQuery({
    queryFn: fetchServicePointById,
    queryKey: ["servicePointDetails"],
  });

  if (fetchServicePointByIdQuery.isPending) {
    return <Loading />;
  }

  if (fetchServicePointByIdQuery.isError) {
    return <ErrorAlertComponent error={"An error has occurred"} />;
  }

  return (
    <Card>
      <CardHeader title="Service points - Group admin view" />
      <CardContent>
        <ServicePointsTable servicePoints={[fetchServicePointByIdQuery.data]} />
      </CardContent>
    </Card>
  );
};
