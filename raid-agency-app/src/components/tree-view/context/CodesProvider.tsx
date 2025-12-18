import React, {useState, useCallback, ReactNode } from 'react';
import { CodesContext } from './CodesContext';

// Type definitions for your codes structure
export interface CodeItem {
  id: string;
  label?: string;
  code: string;
  name: string;
  description?: string;
  parent?: string;
  level?: number;
  selected?: boolean;
  children?: CodeItem[];
  _searchMatch?: {
    directMatch: boolean;
    hasChildMatches: boolean;
    matchedFields: {
      id: boolean;
      label: boolean;
      name: boolean;
    };
    depth: number;
  };
  // Add any other fields from your JSON structure
}

export interface CodesData {
  [key: string]: CodeItem[];
}

// Context value type
export interface CodesContextType {
  // State
  codesData: CodesData | null;
  isLoading: boolean;
  error: string | null;
  selectedCodes: string[];
  expandedNodes: string[];
  searchQuery: string;
  subjectType: string;
  
  // Actions
  setCodesData: (data: CodesData) => void;
  setSubjectType: (type: string) => void;
  getSubjectTypes: () => string[];
  loadCodesFromFile: (file: File) => Promise<void>;
  loadCodesFromUrl: (url: string) => Promise<void>;
  loadCodesFromJson: (json: any) => void;
  selectCode: (codeId: string) => void;
  deselectCode: (codeId: string) => void;
  toggleCodeSelection: (codeId: string) => void;
  clearSelectedCodes: () => void;
  setSelectedCodes: (codes: string[]) => void;
  expandNode: (nodeId: string) => void;
  collapseNode: (nodeId: string) => void;
  toggleNodeExpansion: (nodeId: string) => void;
  setExpandedNodes: (nodes: string[]) => void;
  setSearchQuery: (query: string) => void;
  getCodeById: (codeId: string) => CodeItem | undefined;
  getSelectedCodesData: () => CodeItem[];
  resetState: () => void;
  filterCodesBySearch: (items: CodeItem[], query: string) => CodeItem[];
}


// Provider component
export const CodesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Core state
  const [codesData, setCodesDataState] = useState<CodesData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // UI state
  const [selectedCodes, setSelectedCodesState] = useState<string[]>([]);
  const [expandedNodes, setExpandedNodesState] = useState<string[]>([]);
  const [searchQuery, setSearchQueryState] = useState('');
  const [subjectType, setSubjectType] = useState<string>('ANZSRC FOR');

  // Set codes data
  const setCodesData = useCallback((data: CodesData) => {
    setCodesDataState(data);
    setError(null);
    setIsLoading(false);
  }, []);
  // Load codes from file
  const loadCodesFromFile = useCallback(async (file: File) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const text = await file.text();
      const json = JSON.parse(text);
      
      // Validate the structure if needed
      if (!json.codes && !Array.isArray(json)) {
        throw new Error('Invalid JSON structure: expected codes array');
      }
      
      const data: CodesData = Array.isArray(json) 
        ? { codes: json }
        : json;
      
      setCodesData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load file');
      console.error('Error loading codes file:', err);
    } finally {
      setIsLoading(false);
    }
  }, [setCodesData]);

  // Load codes from URL
  const loadCodesFromUrl = useCallback(async (url: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const json = await response.json();
      
      // Validate the structure if needed
      if (!json.codes && !Array.isArray(json)) {
        throw new Error('Invalid JSON structure: expected codes array');
      }
      
      const data: CodesData = Array.isArray(json) 
        ? { codes: json }
        : json;
      
      setCodesData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load from URL');
      console.error('Error loading codes from URL:', err);
    } finally {
      setIsLoading(false);
    }
  }, [setCodesData]);

  // Load codes from JSON object
  const loadCodesFromJson = useCallback((json: any) => {
    try {
      const data: CodesData = Array.isArray(json) 
        ? { codes: json }
        : json;
      
      setCodesData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to parse JSON');
      console.error('Error loading codes from JSON:', err);
    }
  }, [setCodesData]);

  // Selection management
  const selectCode = useCallback((codeId: string) => {
    setSelectedCodesState(prev => 
      prev.includes(codeId) ? prev : [...prev, codeId]
    );
  }, []);

  const deselectCode = useCallback((codeId: string) => {
    setSelectedCodesState(prev => prev.filter(id => id !== codeId));
  }, []);

  const toggleCodeSelection = useCallback((codeId: string) => {
    setSelectedCodesState(prev =>
      prev.includes(codeId)
        ? prev.filter(id => id !== codeId)
        : [...prev, codeId]
    );
  }, []);

  const clearSelectedCodes = useCallback(() => {
    setSelectedCodesState([]);
  }, []);

  const setSelectedCodes = useCallback((codes: string[]) => {
    setSelectedCodesState(codes);
  }, []);

  // Expansion management
  const expandNode = useCallback((nodeId: string) => {
    setExpandedNodesState(prev => 
      prev.includes(nodeId) ? prev : [...prev, nodeId]
    );
  }, []);

  const collapseNode = useCallback((nodeId: string) => {
    setExpandedNodesState(prev => prev.filter(id => id !== nodeId));
  }, []);

  const toggleNodeExpansion = useCallback((nodeId: string) => {
    setExpandedNodesState(prev =>
      prev.includes(nodeId)
        ? prev.filter(id => id !== nodeId)
        : [...prev, nodeId]
    );
  }, []);

  const setExpandedNodes = useCallback((nodes: string[]) => {
    setExpandedNodesState(nodes);
  }, []);

  // Search
  const setSearchQuery = useCallback((query: string) => {
    setSearchQueryState(query);
  }, []);
  console.log("codesData", codesData);
const filterCodesBySearch = useCallback((items: CodeItem[], query: string): CodeItem[] => {
    if (!query) return items;
    
    const lowerQuery = query.toLowerCase();
    
    const filterWithInfo = (items: CodeItem[], depth: number = 0): CodeItem[] => {
      return items.reduce((filtered: CodeItem[], item) => {
        // Check current item for matches
        const idMatch = item.id.toLowerCase().includes(lowerQuery);
        const labelMatch = item.label?.toLowerCase().includes(lowerQuery);
        const nameMatch = item.name?.toLowerCase().includes(lowerQuery);
        const currentItemMatches = idMatch || labelMatch || nameMatch;
        
        // Recursively check children
        const filteredChildren = item.children 
          ? filterWithInfo(item.children, depth + 1)
          : [];
        
        const hasMatchingDescendants = filteredChildren.length > 0;
        
        // Include item if it matches or has matching descendants
        if (currentItemMatches || hasMatchingDescendants) {
          filtered.push({
            ...item,
            children: filteredChildren,
            // Add metadata for highlighting or styling
            _searchMatch: {
              directMatch: currentItemMatches,
              hasChildMatches: hasMatchingDescendants,
              matchedFields: {
                id: idMatch,
                label: labelMatch,
                name: nameMatch
              },
              depth: depth
            }
          });
        }
        
        return filtered;
      }, []);
    };
    
    return filterWithInfo(items);
  }, []);

  // Utility functions
  const getCodeById = useCallback((codeId: string): CodeItem | undefined => {
    if (!codesData) return undefined;
    
    const findCode = (items: CodeItem[]): CodeItem | undefined => {
      for (const item of items) {
        if (item.id === codeId || item.code === codeId) {
          return item;
        }
        if (item.children) {
          const found = findCode(item.children);
          if (found) return found;
        }
      }
      return undefined;
    };
    
    return findCode(codesData[subjectType] || []);
  }, [codesData, subjectType]);

  const getSelectedCodesData = useCallback((): CodeItem[] => {
    return selectedCodes
      .map(codeId => getCodeById(codeId))
      .filter((item): item is CodeItem => item !== undefined);
  }, [selectedCodes, getCodeById]);

  const getSubjectTypes = useCallback((): string[] => {
    return Object.keys(codesData || {});
  }, [codesData]);

  // Reset state
  const resetState = useCallback(() => {
    setCodesDataState(null);
    setSelectedCodesState([]);
    setExpandedNodesState([]);
    setSearchQueryState('');
    setError(null);
    setIsLoading(false);
  }, []);

  const value: CodesContextType = {
    // State
    codesData,
    isLoading,
    error,
    selectedCodes,
    expandedNodes,
    searchQuery,
    subjectType,
    
    // Actions
    setCodesData,
    setSubjectType,
    getSubjectTypes,
    loadCodesFromFile,
    loadCodesFromUrl,
    loadCodesFromJson,
    selectCode,
    deselectCode,
    toggleCodeSelection,
    clearSelectedCodes,
    setSelectedCodes,
    expandNode,
    collapseNode,
    toggleNodeExpansion,
    setExpandedNodes,
    setSearchQuery,
    getCodeById,
    getSelectedCodesData,
    resetState,
    filterCodesBySearch,
  };

  return (
    <CodesContext.Provider value={value}>
      {children}
    </CodesContext.Provider>
  );
};
// Custom hook to use the CodesContext