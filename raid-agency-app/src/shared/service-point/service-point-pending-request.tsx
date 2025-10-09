    
    
import React from "react";
import { useAuthHelper } from "@/auth/keycloak";
import { useQuery } from "@tanstack/react-query";
import { useKeycloak } from "@/contexts/keycloak-context";
import { fetchServicePointMembersWithGroupId, fetchServicePointsWithMembers } from "@/services/service-points";
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
    //refetchOnWindowFocus: true, // Refetch when user returns to tab
    });
    /* const servicePointsQueryAdmin = useQuery({
    queryKey: ["service-point-request-admin", groupId],
    queryFn: async () => {
        return await fetchServicePointMembersWithGroupId({
            token: token || "",
            id: groupId || ""
        });
    },
    enabled: isInitialized && authenticated && !!groupId && !!token,
    refetchInterval: 30000, // Poll every 30 seconds
    //refetchOnWindowFocus: true, // Refetch when user returns to tab
    });*/

    console.log('ServicePointQuery data:', servicePointsQuery.data);
    React.useEffect(() => {
        const adminGroup = servicePointsQuery.data?.find((sp) => {
            //console.log('Checking SP:', sp);
            if (sp?.groupId && sp.groupId === groupId) {
                return sp;
            }
        });
        console.log('Admin Group:', adminGroup);
        const operatorGroup = servicePointsQuery.data?.filter((sp)=>{
            if(sp.members && sp.members.length > 0){
                isOperator && transformMemberToNotification(sp as unknown as ServicePointResponse, token as string);
            }
        })
        console.log('Operator Groups:', operatorGroup);
        // Only transform if user is operator or group admin
        //transformMemberToNotification(operatorGroup as unknown as ServicePointResponse, token as string);
        isGroupAdmin && transformMemberToNotification(adminGroup as unknown as ServicePointResponse, token as string);
    }, [servicePointsQuery.data, isOperator, isGroupAdmin]);

    const refetch = () => {
        servicePointsQuery.refetch();
    };

    return (
        refetch
    );
};

