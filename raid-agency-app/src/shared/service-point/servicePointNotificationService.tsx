import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { 
  PersonAdd as PersonAddIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  GroupRemove as GroupRemoveIcon,
} from '@mui/icons-material';
import { useNotificationContext } from '@/components/alert-notifications/notification-context/NotificationsContext';
import { useModifyUserAccess, useRemoveUserFromServicePoint } from '@/containers/header/service-point-users/useServicePointMutation';
import { useSnackbar } from '@/components/snackbar/hooks/useSnackbar';
import { SnackbarContextInterface } from '@/components/snackbar';

export interface ServicePointMember {
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

export const useServicePointNotification = () => {
  const { addNotification, removeNotification } = useNotificationContext();
  const snackbar: SnackbarContextInterface = useSnackbar();
  const IsnackBar = snackbar as { openSnackbar: (message: string, duration?: number, severity?: string) => void };
  const modifyUserAccessMutation = useModifyUserAccess(IsnackBar);
  const removeUserFromServicePointMutation = useRemoveUserFromServicePoint(IsnackBar);
  const transformMemberToNotification = (data: ServicePointResponse, token: string) => {
    // Filter members without 'service-point-user' role
    const pendingMembers = data?.members.filter(
      member => !member.roles.includes('service-point-user')
    );

    if (pendingMembers?.length === 0) {
      // Remove notification if no pending members
      removeNotification('servicePointRequests');
      return;
    }

    // Transform to notification structure
    const notification = {
      title: 'Service Point Pending Requests',
      categories: pendingMembers?.map(member => ({
        titleIcon: <PersonAddIcon />,
        name: `${member.attributes.username || ''} (${member.attributes.firstName || ''} ${member.attributes.lastName || ''})`.replace(/\(\s*\)/g, '').trim(),
        actions: [
          <Tooltip title="Grant membership" placement="top" key="approve">
            <span>
            <IconButton
              key="approve"
              size="small"
              color="success"
              onClick={() => handleApprove(data as unknown as ServicePointResponse, member as ServicePointMember, token as string)}
              aria-label="Approve"
              sx={{
                bgcolor: 'success.lighter',
                '&:hover': {
                  bgcolor: 'success.veryLighter',
                },
              }}
            >
              <CheckCircleOutlineIcon />
            </IconButton>
          </span>
          </Tooltip>,
          <Tooltip title="Permanently remove from SP" placement="top" key="reject">
            <span>
            <IconButton
              key="reject"
              size="small"
              color="error"
              onClick={() => handleReject(data as unknown as ServicePointResponse, member as ServicePointMember, token as string)}
              aria-label="Reject"
              sx={{
                bgcolor: 'error.lighter',
                '&:hover': {
                  bgcolor: 'error.veryLighter',
                },
              }}
            >
              <GroupRemoveIcon />
            </IconButton>
          </span>
          </Tooltip>
        ],
        // Additional data for future use
        email: member.attributes.email[0],
        username: member.attributes.username[0],
      })),
    };

    addNotification('servicePointRequests', notification);
  };

  const handleApprove = (data: ServicePointResponse, member: ServicePointMember, token: string) => {
    modifyUserAccessMutation.mutate({
      userId: member.id,
      userGroupId: data?.attributes.groupId,
      operation: "grant",
      token: token as string,
    });
  };

  const handleReject = (data: ServicePointResponse, member: ServicePointMember, token: string) => {
   removeUserFromServicePointMutation.mutate({
        userId: member.id,
        groupId: data?.id,
        token: token as string,
    });
  };

  return {
    transformMemberToNotification,
    handleApprove,
    handleReject,
  };
};
