import React, { useState } from "react";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PropTypes from "prop-types";
import { Avatar, Box, Button, ClickAwayListener, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper, Popper, Typography } from "@mui/material";
import { Cancel, CheckCircle, Close, PersonAdd } from "@mui/icons-material";
import { ServicePointUsersList } from "@/containers/header/service-point-users";
import { ServicePointWithMembers } from "@/types";

interface INotifications {
    status?: React.ReactNode;
    count?: number;
    color?: "error" | "default" | "primary" | "secondary" | "info" | "success" | "warning";
    IconColor?: string | undefined;
    data? : ServicePointWithMembers[] | any;
}

export const Notifications = (props: INotifications) => {
      const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
        props.data.name = "";
        const pendingMembers = props?.data.members || []; // Replace with actual data fetching logic
        const open = Boolean(anchorEl);

        const handleClick = (event: React.MouseEvent<HTMLElement>) => {
            setAnchorEl(anchorEl ? null : event.currentTarget);
        };

        const handleClose = () => {
            setAnchorEl(null);
        };

        const handleApprove = (memberId: any) => {
            console.log('Approve:', memberId);
        };

        const handleReject = (memberId: any) => {
            console.log('Reject:', memberId);
        };
    return (
    <>
      <Box>
        <IconButton onClick={handleClick} color="primary">
            <Badge badgeContent={props.count} color="error">
                <NotificationsIcon sx={{ color: props.IconColor || "grey" }} />
            </Badge>
        </IconButton>
        <Popper open={open} anchorEl={anchorEl} placement="bottom-end" sx={{ zIndex: 1300 }}>
            <ClickAwayListener onClickAway={handleClose}>
            <Paper 
                elevation={8} 
                sx={{ 
                width: 360, 
                maxHeight: 500,
                mt: 1,
                borderRadius: 2,
                overflow: 'hidden'
                }}
            >
                {/* Header */}
                <Box sx={{
                    p: 2, 
                    bgcolor: 'primary.main', 
                    color: 'white',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Box>
                        <Typography variant="h6" fontWeight={600}>
                            Service Point Requests
                        </Typography>
                        <Typography variant="caption" sx={{ opacity: 0.9 }}>
                            {props.count} pending approval{props.count !== 1 ? 's' : ''}
                        </Typography>
                    </Box>
                    <IconButton size="small" onClick={handleClose} sx={{ color: 'white' }}>
                        <Close fontSize="small" />
                    </IconButton>
                </Box>

                {/* Content */}
                <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
                {pendingMembers.length === 0 ? (
                    <Box sx={{ p: 4, textAlign: 'center' }}>
                    <Typography color="text.secondary">
                        No pending requests
                    </Typography>
                    </Box>
                ) : (
                    <List sx={{ p: 0 }}>
                    {pendingMembers.map((member, index) => (
                        <React.Fragment key={member.id}>
                        <ListItem 
                            sx={{ 
                            py: 2,
                            '&:hover': { bgcolor: 'action.hover' }
                            }}
                        >
                            <ListItemAvatar>
                            <Avatar sx={{ bgcolor: 'secondary.main' }}>
                                <PersonAdd />
                            </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                            primary={
                                <Typography fontWeight={500}>
                                {member.attributes.firstName[0]} {member.attributes.lastName[0]}
                                </Typography>
                            }
                            secondary={
                                <>
                                <Typography variant="body2" color="text.secondary">
                                    @{member.attributes.username[0]}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {member.attributes.email[0]}
                                </Typography>
                                </>
                            }
                            />
                            <Box sx={{ display: 'flex', gap: 0.5, ml: 1 }}>
                            <IconButton 
                                size="small" 
                                color="success"
                                onClick={() => handleApprove(member.id)}
                            >
                                <CheckCircle fontSize="small" />
                            </IconButton>
                            <IconButton 
                                size="small" 
                                color="error"
                                onClick={() => handleReject(member.id)}
                            >
                                <Cancel fontSize="small" />
                            </IconButton>
                            </Box>
                        </ListItem>
                        {index < pendingMembers.length - 1 && <Divider />}
                        {/* If each 'member' is a ServicePointWithMembers, pass 'member' instead of 'pendingMembers' */}
                        </React.Fragment>
                    ))}
                    </List>
                )}
                <ServicePointUsersList
                    key={pendingMembers[0]?.id}
                    servicePointWithMembers={props.data} // Just an example, replace with actual logic
                />
                </Box>

                {/* Footer */}
                {pendingMembers.length > 0 && (
                <>
                    <Divider />
                    <Box sx={{ p: 1.5, textAlign: 'center' }}>
                    <Button size="small" fullWidth>
                        <a href="/service-points/" style={{ textDecoration: 'none', color: 'inherit' }}>View All Requests</a>
                    </Button>
                    </Box>
                </>
                )}
            </Paper>
            </ClickAwayListener>
        </Popper>
    </Box>
    </>
    );
};

Notifications.propTypes = {
    status: PropTypes.node,
    count: PropTypes.number,
    color: PropTypes.oneOf([
        "error",
        "default",
        "primary",
        "secondary",
        "info",
        "success",
        "warning"
    ]),
    IconColor: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.object),
};
