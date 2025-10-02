    
    
import React from "react";
import { useAuthHelper } from "@/auth/keycloak";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useKeycloak } from "@/contexts/keycloak-context";
import { CircularProgress } from "@mui/material";
import { servicePointService } from "@/services/service-point-service";
import { fetchServicePointMembersWithGroupId } from "@/services/service-points";
import { Notifications } from "@/components/alert-notifications";

interface ServicePointMember {
    id: string;
    roles: string[];
    attributes: {
        firstName: (string | null)[];
        lastName: (string | null)[];
        activeGroupId: string[];
        email: (string | null)[];
        username: string[];
    };
}

interface ServicePointResponse {
    members: ServicePointMember[];
    name: string;
    attributes: {
        groupId: string[];
    };
    id: string;
}

const ServicePointPendingRequest = () => {
    const { isOperator, groupId } = useAuthHelper();
    const { authenticated, isInitialized, token } = useKeycloak();
    const [servicePointsRequest, setServicePointsRequest] = React.useState<{ count: number; status: JSX.Element | null; color?: "error" | "default" }>({ count: 0, status: null });
   
    const servicePointsQuery = useQuery({
    queryKey: ["service-point-request", groupId],
    queryFn: async () => {
        if (!groupId) {
            return {
                members: [],
                name: "",
                attributes: { groupId: [] },
                id: ""
            } as ServicePointResponse;
        }
        
        return await fetchServicePointMembersWithGroupId({ 
            id: String(groupId), // Convert to string to match the function signature
            token: token || "" 
        });
    },
    enabled: isInitialized && authenticated && !!groupId && !!token,
});

/*     if (servicePointsQuery.isLoading) {
        setServicePointsRequest({count: 0, status: <CircularProgress size={4} />});
        //return null; // or a loading spinner
    } */

 /*    if (servicePointsQuery.isError) {
        setServicePointsRequest({count: 0, status: <CircleAlert />});
        return null; // or an error icon
    } */
    React.useEffect(() => {
        if (servicePointsQuery?.data) {
        const response = servicePointsQuery.data as unknown as ServicePointResponse;
            if (Array.isArray(response.members)) {
                // Get pending users (those without service-point-user role)
                const pendingRequests = response.members.filter((member) => {
                    return !member.roles.includes("service-point-user");
                });
                setServicePointsRequest(
                    {...servicePointService,
                        count: pendingRequests.length,
                        status: null,
                        color: pendingRequests.length > 0 ? "error" : "default"
                    }
                );
            }
        }
    }, [servicePointsQuery?.data]);
    return (
        isOperator && (
            <Notifications
                count={servicePointsRequest.count}
                status={servicePointsRequest.status}
                color={servicePointsRequest.color}
                data={servicePointsQuery.data ?? []}
            />
        )
    );
};
export default ServicePointPendingRequest;
