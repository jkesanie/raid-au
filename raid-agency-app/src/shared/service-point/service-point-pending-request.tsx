    
    
import React from "react";
import { useAuthHelper } from "@/auth/keycloak";
import { useQuery } from "@tanstack/react-query";
import { useKeycloak } from "@/contexts/keycloak-context";
import { fetchServicePointsWithMembers } from "@/services/service-points";
import { useServicePointNotification } from "./servicePointNotificationService";

interface ServicePointMember {
    id: string;
    roles: string[];
    attributes: {
        firstName: string;
        lastName: string;
        username: string;
        email: string;
    };
    groupId?: string;
}

interface ServicePointResponse {
    members: ServicePointMember[];
    name: string;
    attributes?: {
        groupId: string;
    };
    id: string;
    groupId?: string;
}

export const useServicePointPendingRequest = () => {
    const { isOperator, groupId, isGroupAdmin } = useAuthHelper();
    const { authenticated, isInitialized, token } = useKeycloak();
    const { transformMemberToNotification } = useServicePointNotification();

    const servicePointsQuery = useQuery({
    queryKey: ["service-point-request"],
    queryFn: async () => {
        return await fetchServicePointsWithMembers({ 
            token: token || "" 
        });
    },
    enabled: isInitialized && authenticated && !!groupId && !!token,
    refetchInterval: 30000, // Poll every 30 seconds
    });

    React.useEffect(() => {
        // Find the service point where the user is an admin or operator
        const adminGroup = servicePointsQuery.data?.find((sp) => {
            if (sp?.groupId === groupId) {
                sp.members.forEach((member) => {
                    member.groupId = groupId;
                });
                return sp.members;
            }
        });
        const accumulatedMembers = servicePointsQuery.data?.reduce((acc, sp) => {
            //console.log('Checking service point:', sp);
            if (sp.members && sp.members.length > 0) {
                const members = sp.members.map(member => ({
                    ...member,
                    groupId: sp.groupId
                }));
                return [...acc, ...members];
            }
            return acc;
        }, [] as ServicePointMember[]);
        isOperator && transformMemberToNotification(accumulatedMembers as unknown as ServicePointMember[], token as string);
        isGroupAdmin && transformMemberToNotification(adminGroup?.members  as unknown as ServicePointMember[] || [], token as string);
    }, [servicePointsQuery.data, isOperator, isGroupAdmin]);

    const refetch = () => {
        servicePointsQuery.refetch();
    };

    return (
        refetch
    );
};
