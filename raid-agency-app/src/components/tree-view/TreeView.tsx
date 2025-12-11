import * as React from 'react';
import { RichTreeView, TreeItemProps } from '@mui/x-tree-view';

// Custom icons for tree view
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import { BorderedTreeItem } from './TreeViewStyles';
import { TreeViewBaseItem } from '@mui/x-tree-view/models'

export default function CustomizedTreeViewWithSelection() {
    const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
    const [treeItems, setTreeItems] = React.useState<any[]>([]);

    React.useEffect(() => {
        fetch('/SubjectSample.JSON')
            .then(res => res.json())
            .then(data => {setTreeItems(data["ANZSRC FOR"]); console.log("tree items", data["ANZSRC FOR"])});
    }, []);

    const handleSelectedItemsChange = (event: React.SyntheticEvent | null, newSelectedIds: string[]) => {
        // event is unused; update controlled selection state with the new item IDs
        setSelectedIds(newSelectedIds);
    };
    const findItem = (items: TreeViewBaseItem[], id: string): TreeViewBaseItem | null => {
        for (const item of items) {
            if (item.id === id) {
                return item
            }
            if (item.children) {
                const found = findItem(item.children, id)
                if (found) {
                    return found;
                }
            }
        }
        return null
    }
    function CustomTreeItem(props: TreeItemProps) {
        const item = findItem(treeItems, props.itemId);
        const hasChildren = item && item.children && item.id.length === 2;
        const isLastChild = item && item.id.length === 6;
        return (
            <BorderedTreeItem
                {...props}
                // Pass a custom data attribute to allow for prop-based conditional styling in StyledTreeItem
                data-iscustomparent={hasChildren ? 'true' : 'false'}
                data-isLastChild={isLastChild ? 'true' : 'false'}
                // Override the endIcon slot to render nothing, removing the icon from leaf nodes.
                slots={{ endIcon: () => <></> }}
            />
        )
    }

    return (
        <RichTreeView
            aria-label="customized tree view with selection"
            items={treeItems}
            defaultExpandedItems={['1', '3']}

            // --- Make selection controlled to retrieve values ---
            checkboxSelection
            multiSelect
            selectedItems={selectedIds}
            onSelectedItemsChange={handleSelectedItemsChange}
            
            // --- Enable selection propagation for full feature implementation ---
            selectionPropagation={{
            parents: false, // Select parent if all children are selected
            descendants: false, // Select all children if parent is selected
            }}
            
            slots={{
                item: CustomTreeItem,
                expandIcon: AddBoxOutlinedIcon,
                collapseIcon: IndeterminateCheckBoxOutlinedIcon,
                //endIcon: MinusIcon,
            }}
            sx={{ overflowX: 'hidden', minHeight: 270, flexGrow: 1, maxWidth: 'auto', '& .MuiTreeItem-content:has(.MuiTreeItem-group) .MuiCheckbox-root': {
                visibility: 'hidden'
            } }}
        />
    );
}
