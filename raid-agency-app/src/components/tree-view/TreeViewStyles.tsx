import { styled, alpha } from '@mui/material/styles';
import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem'

export const BorderedTreeItem = styled(TreeItem)(({ theme }) => ({
  // Styles for the content and padding
  [`& .${treeItemClasses.content}`]: {
    padding: theme.spacing(0.5, 1),
    margin: theme.spacing(0.2, 0),
  },
  // Styles for the end icon when it's just a placeholder
  [`& .${treeItemClasses.iconContainer}`]: {
    '& .close': {
      opacity: 0.3,
    },
  },
  // Styles for the dashed vertical line (the "border")
  [`& .${treeItemClasses.groupTransition}`]: {
    marginLeft: 15,
    paddingLeft: 15,
    borderLeft: `1px solid ${alpha(theme.palette.text.primary, 0.4)}`,
  },
}))
