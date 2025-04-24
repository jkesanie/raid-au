import {Card, CardContent, CardHeader, Grid} from "@mui/material";
import {TextSelectField} from "@/fields/TextSelectField.tsx";
import {useQuery} from "@tanstack/react-query";
import {fetchServicePoints} from "@/services/service-points";
import {useKeycloak} from "@/contexts/keycloak-context";

export const ServicePointForm = ({errors}) => {
    const { authenticated, isInitialized, token } = useKeycloak();


    const servicePointsQuery = useQuery({
        queryKey: ["service-points"],
        queryFn: () =>
            fetchServicePoints({
                token: token!,
            }),
        enabled: isInitialized && authenticated,
    });

    const options = servicePointsQuery.data?.map((servicePoint) => {
        return {
            label: servicePoint.name,
            value: servicePoint.id.toString(),
        };
    })

    const key = 'identifier.servicePoint';

    return (
        <Card
            sx={{
                borderLeft: errors[key] ? "3px solid" : "none",
                borderLeftColor: "error.main",
            }}
            id={key}
        >
            <CardHeader title="Service Point" />
            <CardContent>
                <Grid container spacing={2}>
                    <TextSelectField
                        name="identifier.owner.servicePoint"
                        label="Service Point"
                        required={true}
                        width={3}
                        options={options || []}
                    />
                </Grid>
            </CardContent>
        </Card>
    );
};