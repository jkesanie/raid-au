import * as React from 'react'
import Checkbox from '@mui/material/Checkbox'
import { TreeItemContent, TreeItemLabel, TreeItemIconContainer } from '@mui/x-tree-view/TreeItem'
import { useTreeItem } from '@mui/x-tree-view'
import { alpha, useTheme } from '@mui/material/styles' // Added useTheme

export const CustomTreeItem = React.forwardRef(function CustomTreeItem(props: any, ref) {
  const { disabled, expanded, selected, handleExpansion, handleSelection, preventSelection, label, icon, ...contentProps } = useTreeItem(props.id)
  const theme = useTheme()
  const isParent = !!(props.children) // If children is truthy, it's a parent node
  
  // Parent label color to blue (using primary color from theme)
  // Non-parent (child) label color to black
  const labelColor = isParent ? theme.palette.primary.main : 'black'

  const checkboxProps = {
    // CRITICAL FIX: Explicitly set indeterminate to false.
    // This prevents the 'minus' icon from ever appearing on the parent.
    indeterminate: false, 
    checked: selected,
    onClick: (event: React.MouseEvent) => {
      // Prevent selection event from bubbling to the content click handler
      event.stopPropagation()
      handleSelection(event)
    },
    disabled: disabled,
    tabIndex: -1,
  }

  return (
    <TreeItemContent
      {...contentProps}
      onMouseDown={preventSelection}
      onClick={handleExpansion}
      style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '4px 8px' }}
      sx={(theme) => ({
        // Custom styling for the focused state
        '&.Mui-focused': {
          backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.hoverOpacity),
        },
      })}
    >
      {/* Icon Container for the expand/collapse icon */}
      <TreeItemIconContainer>{icon}</TreeItemIconContainer>
      
      {/* Custom Checkbox implementation */}
      <Checkbox {...checkboxProps} sx={{ ml: 1 }}/>

      {/* Item Label: Apply custom color and weight */}
      <TreeItemLabel sx={{ ml: 1, color: labelColor, fontWeight: isParent ? 'bold' : 'normal' }}>
        {label}
      </TreeItemLabel>
    </TreeItemContent>
  )
})