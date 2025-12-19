import * as React from 'react';
import { RichTreeView, TreeItemProps } from '@mui/x-tree-view';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import { BorderedTreeItem } from './TreeViewStyles';
import { TreeViewBaseItem } from '@mui/x-tree-view/models'
import { findItem } from './CustomTree';
import { useCodesContext } from './context/CodesContext';
import { Box } from '@mui/material';
import { Loader } from 'lucide-react';

export default function CustomizedTreeViewWithSelection() {
    const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
    const [treeItems, setTreeItems] = React.useState<TreeViewBaseItem[]>([]);
    const { setCodesData, codesData, isLoading, setSelectedCodes, subjectType } = useCodesContext();
    
    React.useEffect(() => {
        if(codesData && codesData[subjectType]) {
            const transformItems = (items: any[]): TreeViewBaseItem[] =>
                items.map(item => ({
                    ...item,
                    label: item.label || '',
                    children: item.children ? transformItems(item.children) : undefined
                }));
            const transformedItems = transformItems(codesData[subjectType]);
            setTreeItems(transformedItems);
        }
        
    }, [codesData, subjectType]);

    const handleSelectedItemsChange = (event: React.SyntheticEvent | null, newSelectedIds: string[]) => {
        // event is unused; update controlled selection state with the new item IDs
        event?.preventDefault();
        setSelectedIds(newSelectedIds);
        setSelectedCodes(newSelectedIds);
    };

    React.useEffect(() => {
        if (!codesData || !codesData[subjectType]) return;

        const selectedSet = new Set(selectedIds);
        
        const updateSelection = (items: any[]): any[] => 
            items.map(item => ({
                ...item,
                selected: selectedSet.has(item.id),
                children: item.children ? updateSelection(item.children) : undefined
            }));

        setCodesData({
            ...codesData,
            [subjectType]: updateSelection(codesData[subjectType])
        });
    }, [selectedIds, subjectType]);

    function CustomTreeItem(props: TreeItemProps) {
        const item = findItem(treeItems, props.itemId);
        const hasChildren = item && item.children && item.id.length <= 2;
        const isLastChild = item && item.children && item.children.length === 0;
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
        <Box sx={{ width: '100%', overflowY: 'auto', height: 270 }} >
            {isLoading ? (
                <Loader>Loading...</Loader>
            ) : (
                <RichTreeView
                    aria-label="customized tree view with selection"
                    items={treeItems}
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
                    }}
                    sx={{ overflowX: 'hidden', minHeight: 270, flexGrow: 1, maxWidth: 'auto'}}
                />
            )}
        </Box>
    );
}

