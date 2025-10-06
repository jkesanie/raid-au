import React from 'react';
import { IconButton } from '@mui/material';
import { 
  PersonAdd as PersonAddIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';
import { useNotificationContext } from '@/components/alert-notifications/notification-context/NotificationsContext';
import { useModifyUserAccess, useRemoveUserFromServicePoint } from '@/containers/header/service-point-users/useServicePointMutation';
import { useSnackbar } from '@/components/snackbar/hooks/useSnackbar';
import { SnackbarContextInterface } from '@/components/snackbar';

export interface ServicePointMember {
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
        groupId: string[];
    };
    id: string;
}

export const useServicePointNotification = () => {
  const { addNotification, removeNotification } = useNotificationContext();
  const snackbar: SnackbarContextInterface = useSnackbar();
  const IsnackBar = snackbar as { openSnackbar: (message: string, duration?: number, severity?: string) => void };
  const modifyUserAccessMutation = useModifyUserAccess(IsnackBar);
  const removeUserFromServicePointMutation = useRemoveUserFromServicePoint(IsnackBar);
  const transformMemberToNotification = (data: ServicePointResponse[], token: string) => {
    // Filter members without 'service-point-user' role
    const pendingMembers = data?.[0]?.members.filter(
      member => !member.roles.includes('service-point-user')
    );

    if (pendingMembers?.length === 0) {
      // Remove notification if no pending members
      removeNotification('servicePointRequests');
      return;
    }

    // Transform to notification structure
    const notification = {
      title: 'Service Point Requests',
      categories: pendingMembers?.map(member => ({
        titleIcon: <PersonAddIcon />,
        name: `${member.attributes.username[0]} ${member.attributes.firstName[0]} ${member.attributes.lastName[0]}`,
        actions: [
          <IconButton
            key="approve"
            size="small"
            color="success"
            onClick={() => handleApprove(data as unknown as ServicePointResponse, token as string)}
            aria-label="Approve"
            sx={{
              bgcolor: 'success.lighter',
              '&:hover': {
                bgcolor: 'success.light',
              },
            }}
          >
            <CheckCircleIcon fontSize="small" />
          </IconButton>,
          <IconButton
            key="reject"
            size="small"
            color="error"
            onClick={() => handleReject(data as unknown as ServicePointResponse, token as string)}
            aria-label="Reject"
            sx={{
              bgcolor: 'error.lighter',
              '&:hover': {
                bgcolor: 'error.light',
              },
            }}
          >
            <CancelIcon fontSize="small" />
          </IconButton>,
        ],
        // Additional data for future use
        email: member.attributes.email[0],
        username: member.attributes.username[0],
      })),
    };

    addNotification('servicePointRequests', notification);
  };

  const handleApprove = (data: ServicePointResponse, token: string) => {
    modifyUserAccessMutation.mutate({
      userId: data?.members[0].id,
      userGroupId: data?.attributes.groupId[0],
      operation: "grant",
      token: token as string,
    });
  };

  const handleReject = (data: ServicePointResponse, token: string) => {
   removeUserFromServicePointMutation.mutate({
        userId: data?.members[0].id,
        groupId: data?.attributes.groupId[0],
        token: token as string,
    });
  };

  return {
    transformMemberToNotification,
    handleApprove,
    handleReject,
  };
};
