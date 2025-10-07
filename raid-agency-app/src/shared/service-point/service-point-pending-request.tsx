    
    
import React from "react";
import { useAuthHelper } from "@/auth/keycloak";
import { useQuery } from "@tanstack/react-query";
import { useKeycloak } from "@/contexts/keycloak-context";
import { fetchServicePointMembersWithGroupId } from "@/services/service-points";
import { useServicePointNotification } from "./servicePointNotificationService";

interface ServicePointMember {
    id: string;
    roles: string[];
    attributes: {
        firstName: string[];
        lastName: string[];
        username: string[];
        email: string[];
    };
}

interface ServicePointResponse {
    members: ServicePointMember[];
    name: string;
    attributes: {
        groupId: string;
    };
    id: string;
}

export const useServicePointPendingRequest = () => {
    const { isOperator, groupId, isGroupAdmin } = useAuthHelper();
    const { authenticated, isInitialized, token } = useKeycloak();
    const { transformMemberToNotification } = useServicePointNotification();
    const servicePointsQuery = useQuery({
    queryKey: ["service-point-request", groupId],
    queryFn: async () => {
        if (!groupId) {
            return {
                members: [],
                name: "",
                attributes: { groupId: "" },
                id: "",
                data: []
            } as ServicePointResponse;
        }
        
        return await fetchServicePointMembersWithGroupId({ 
            id: String(groupId), // Convert to string to match the function signature
            token: token || "" 
        });
    },
        enabled: isInitialized && authenticated && !!groupId && !!token,
        //refetchInterval: 30000, // Poll every 30 seconds
        //refetchOnWindowFocus: true, // Refetch when user returns to tab
    });

    React.useEffect(() => {
        isOperator || isGroupAdmin ? transformMemberToNotification(servicePointsQuery.data as unknown as ServicePointResponse, token as string) : null;
        }, [servicePointsQuery.data]);
      const refetch = () => {
            servicePointsQuery.refetch();
        };
    return (
        refetch
    );
};

