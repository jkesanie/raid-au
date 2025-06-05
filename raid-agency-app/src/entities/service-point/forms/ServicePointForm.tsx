import {Card, CardContent, CardHeader, Grid} from "@mui/material";
import {TextSelectField} from "@/fields/TextSelectField.tsx";
import {useQuery} from "@tanstack/react-query";
import {fetchServicePoints} from "@/services/service-points";
import {useKeycloak} from "@/contexts/keycloak-context";
import {FieldErrors} from "react-hook-form";
import {RaidDto} from "@/generated/raid";

export const ServicePointForm = ({errors}: { errors: FieldErrors<RaidDto>}) => {
    const { authenticated, isInitialized, token } = useKeycloak();

    const servicePointsQuery = useQuery({
        queryKey: ["service-points"],
        queryFn: () =>
            fetchServicePoints({
                token: token!,
            }),
        enabled: isInitialized && authenticated && !!token,
    });

    const options = servicePointsQuery.data?.map((servicePoint) => {
        return {
            label: servicePoint.name,
            value: servicePoint.id.toString(),
        };
    })

    const key = 'identifier.owner.servicePoint' as keyof FieldErrors<RaidDto>;

    if (servicePointsQuery.isLoading) {
        return <div>Loading service points...</div>;
    }

    if (servicePointsQuery.isError) {
        return <div>Error loading service points</div>;
    }

    return (
        <Card
            sx={{
                borderLeft: errors[key] ? "3px solid" : "none",
                borderLeftColor: "error.main",
            }}
            id={key}
        >
            <CardHeader title="Service Point"/>
            <CardContent>
                <TextSelectField
                    name="identifier.owner.servicePoint"
                    label="Service Point"
                    required={true}
                    width={3}
                    options={options || []}
                />
            </CardContent>
        </Card>
    );
};