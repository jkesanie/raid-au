import {Card, CardContent, CardHeader, Grid} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import {fetchServicePoints} from "@/services/service-points";
import {useKeycloak} from "@/contexts/keycloak-context";
import {DisplayItem} from "@/components/display-item";


interface ServicePointViewProps {
    servicePointId: number;
}

export const ServicePointView = ({servicePointId}: ServicePointViewProps) => {
    const {authenticated, isInitialized, token} = useKeycloak();

    console.log("ServicePointView auth:", {authenticated, isInitialized, tokenAvailable: !!token});

    // Use the same pattern as your working component
    const servicePointsQuery = useQuery({
        queryKey: ["service-points"],
        queryFn: () => fetchServicePoints({token: token!}),
        enabled: isInitialized && authenticated && !!token, // Add explicit token check
    });

    // Add defensive checks to prevent the error
    console.log("service points:", servicePointsQuery.data);

    // If still loading, show loading state
    if (servicePointsQuery.isLoading) {
        return <div>Loading service points...</div>;
    }

    // Ensure data exists before passing it to ServicePointDisplay
    const servicePoint = servicePointsQuery.data.find((servicePoint) => {
        return servicePoint.id === servicePointId;
    });

    return (
        <Card>
            <CardHeader title="Service Point"/>
            <CardContent>
                <Grid container spacing={2}>
                    <DisplayItem
                        label="Service Point"
                        value={servicePoint.name || ''}
                        width={6}
                    />
                </Grid>
            </CardContent>
        </Card>
    );
};