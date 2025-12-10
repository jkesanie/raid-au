import * as React from 'react';
import { RichTreeView } from '@mui/x-tree-view';

// Custom icons for tree view
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import EndIcon from '@mui/icons-material/InsertDriveFile';
import { BorderedTreeItem } from './TreeViewStyles';

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
    console.log('Selected IDs:', selectedIds);
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
            item: BorderedTreeItem,
            expandIcon: AddBoxOutlinedIcon,
            collapseIcon: IndeterminateCheckBoxOutlinedIcon,
            //endIcon: EndIcon,
            }}
            sx={{ overflowX: 'hidden', minHeight: 270, flexGrow: 1, maxWidth: 300 }}
        />
    );
}
