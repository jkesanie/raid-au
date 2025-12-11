import { styled, alpha } from '@mui/material/styles';
import { TreeItem, treeItemClasses, TreeItemProps } from '@mui/x-tree-view/TreeItem'

/* export const BorderedTreeItem = styled(TreeItem)(({ theme }) => ({
  // Styles for the content and padding
  [`& .${treeItemClasses.content}`]: {
    padding: theme.spacing(0.5, 1),
    margin: theme.spacing(0.2, 0),
    color: alpha(theme.palette.primary.main, 0.9),
    '&.Mui-collapse-wrapper': {
      color: alpha(theme.palette.primary.main, 0.1),
    },
    [`& .${treeItemClasses.label}`]: {
      fontSize: '0.8rem',
      fontWeight: 500,
    },
    // The new horizontal connector segment
    '&::before': {
      content: '""',
      position: 'absolute',
      // Creates a 16px wide line to span the gap
      top: '50%',
      left: '-18px',
      width: '20px',
      height: '1px', // Thickness of the connector line
      backgroundColor: alpha(theme.palette.text.primary, 0.6),
      transform: 'translateY(-50%)',
      zIndex: 1,
    },
  },
  // Styles for the end icon when it's just a placeholder
  [`& .${treeItemClasses.iconContainer}`]: {
    '& .close': {
      opacity: 0.3,
    },
  },
  // Styles for the solid vertical line (the "border")
  [`& .${treeItemClasses.groupTransition}`]: {
    marginLeft: 15,
    paddingLeft: 15,
    borderLeft: `1px solid ${alpha(theme.palette.text.primary, 0.4)}`,
  },
  [`& .${treeItemClasses.iconContainer}:empty`]: {
    width: '4px',
    marginRight: 0,
  },
  [`& .${treeItemClasses.checkbox}`]: {
    color: alpha(theme.palette.primary.main, 0.9),
  }
})) */

/* 1. Define the styled component that holds all the visual customizations */
export const BorderedTreeItem = styled(TreeItem, {
  shouldForwardProp: (prop) => prop !== 'data-iscustomparent' && prop !== 'data-isLastChild',
})<TreeItemProps & { 'data-iscustomparent'?: 'true' | 'false'; 'data-isLastChild'?: 'true' | 'false' }>(({ theme, ...props }) => ({
  color: theme.palette.grey[200],
  
  // Base content styles for all nodes
  [`& .${treeItemClasses.content}`]: {
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(0.5, 1),
    margin: theme.spacing(0.2, 0),
    position: 'relative',
    [`& .${treeItemClasses.label}`]: {
      fontSize: '0.8rem',
      fontWeight: 500,
    },
    
    // Horizontal connector segment: ONLY on leaf nodes (data-iscustomparent='false')
    ...(props['data-iscustomparent'] === 'false' && {
      '&::before': {
        content: '""',
        position: 'absolute',
        top: '50%',
        left: '-18px',
        width: '20px',
        height: '1px',
        backgroundColor: alpha(theme.palette.text.primary, 0.6),
        transform: 'translateY(-50%)',
        zIndex: 1,
      },
    }),
  },

  // Custom styling for the icon container: ONLY on parent nodes (data-iscustomparent='true')
  ...(props['data-iscustomparent'] === 'true' && {
    [`& .${treeItemClasses.iconContainer}`]: {
      borderRadius: '50%',
      padding: theme.spacing(0, 1.2),
      ...theme.applyStyles('dark', {
        color: theme.palette.primary.contrastText,
      }),
    },
  }),
  // Icon container styling for LEAF nodes (data-iscustomparent='false'): HIDE IT
  ...(props['data-isLastChild'] === 'true' && {
    [`& .${treeItemClasses.iconContainer}`]: {
      display: 'none',
    },
  }),
  // Vertical connection border for the children group (independent of node type)
  [`& .${treeItemClasses.groupTransition}`]: {
    marginLeft: 17,
    paddingLeft: 18,
    borderLeft: `1px solid ${alpha(theme.palette.text.primary, 0.6)}`,
  },
  
  // Theme-specific color for all nodes
  ...theme.applyStyles('light', {
    color: theme.palette.grey[800],
  }),
}))