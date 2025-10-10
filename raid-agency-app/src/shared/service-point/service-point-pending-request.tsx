    
    
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
}

interface ServicePointResponse {
    members: ServicePointMember[];
    name: string;
    attributes: {
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
        //console.log('Service Points Data:', servicePointsQuery.data);
/*         const adminGroup = servicePointsQuery.data?.find((sp) => {
            console.log('Checking group:', sp);
            if (!sp?.roles?.includes(['group-admin', 'operator']) && sp?.groupId === groupId) {
                return sp;
            }
        }); */
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
        console.log('Operator Groups:', accumulatedMembers);
        isOperator && transformMemberToNotification(accumulatedMembers as unknown as ServicePointMember[], token as string);
        //isGroupAdmin && transformMemberToNotification(adminGroup as unknown as ServicePointResponse, token as string, groupId as string);
    }, [servicePointsQuery.data, isOperator, isGroupAdmin]);

    const refetch = () => {
        servicePointsQuery.refetch();
    };

    return (
        refetch
    );
};
