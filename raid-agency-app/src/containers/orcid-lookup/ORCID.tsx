import React, { useState } from 'react';
import {
  Box,
  TextField,
  Paper,
  Typography,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
  InputBase,
  Divider,
  FormHelperText,
  Popover
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { AlertCircle, CheckCircle, CircleCheck, Search } from 'lucide-react';
import { ClipLoader } from 'react-spinners';
import { useMutation } from '@tanstack/react-query';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import PulseLoader from "react-spinners/PulseLoader";


const searchAPI = async ({ query, mode }: { query: string; mode: string }): Promise<any> => {
  const response = await fetch(
    `https://researchdata.edu.au/api/v2.0/orcid.jsonp/${mode}&q=${encodeURIComponent(query)}`
  );
  if (!response.ok) {
    throw new Error('Search failed');
  }
  return response.json();
};

export default function ORCIDLookup() {
  const [searchMode, setSearchMode] = useState('lookup');
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [searchText, clearSearchText] = useState(false);
  const [dropBox, setDropBox] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const searchConfig = {
    lookup: {
      placeholder: 'Enter ORCID ID (e.g., 0000-0002-1825-0097)',
      endpoint: 'https://pub.orcid.org/v3.0/',
      label: 'ORCID ID',
      description: 'Search by unique ORCID identifier',
      icon: <FingerprintIcon />
    },
    search: {
      placeholder: 'Enter contributor name (e.g., John Smith)',
      endpoint: 'https://pub.orcid.org/v3.0/search/',
      label: 'Custom Search',
      description: 'Search by name or keywords',
      icon: <PersonIcon />
    }
  };
  const currentConfig = searchConfig[searchMode];

  const handleSearchModeChange = (event, newMode) => {
    if (newMode !== null) {
      setSearchMode(newMode);
      setSearchValue('');
      setResults(null);
      setError('');
    }
  };

  const handleSearch = async () => {
    if (!searchValue.trim()) {
      setError('Please enter a search term');
      return;
    }
    // Pass a single object matching the mutationFn signature
    searchMutation.mutate({ query: searchValue.trim(), mode: searchMode });
    setDropBox(true);
    setLoading(true);
    setError('');
    setResults(null);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const searchMutation = useMutation({
    mutationFn: searchAPI,
    onError: (error) => {
        console.error('Search error:', error);
    },
  });

    const groupedData = React.useMemo(() => {
        //return transformToGroupedData(searchMutation.data?.items);
    }, [searchMutation.data]);

    const getStatusColor = () => {
        switch (searchMutation.status) {
        case 'pending':
            return '#36a5dd';
        case 'success':
            return '#4caf50';
        case 'error':
            return '#f44336';
        case 'idle':
            return '#e0e0e0';
        default:
            return '#e0e0e0';
        }
    };
    const getStatusIcon = () => {
        switch (searchMutation.status) {
          case 'pending':
            return <ClipLoader color="#36a5dd" size={25}/>;
          case 'success':
            return <CheckCircle color="green" />;
          case 'error':
            return <AlertCircle color="red" />;
          case 'idle':
            return <Search color="gray" />;
          default:
            return <Search color="gray" />;
        }
    };

  return (
    <Box sx={{ p: 1 }}>
      <Paper elevation={0} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ mb: 3 }}>
          <ToggleButtonGroup
            value={searchMode}
            exclusive
            onChange={(event, newMode) => handleSearchModeChange(event, newMode)}
            aria-label="search mode"
            sx={{
              '& .MuiToggleButton-root': {
                px: 3,
                py: 1.5,
                textTransform: 'none',
                fontWeight: 500,
                border: '1px solid',
                borderColor: 'divider',
                '&.Mui-selected': {
                  bgcolor: 'white',
                  color: 'primary.main',
                  borderColor: 'primary.main',
                },
                '&:hover': {
                    color: 'primary.main',
                },
                width: '250px',
              }
            }}
          >
            <ToggleButton value="lookup" aria-label="orcid search">
              <FingerprintIcon sx={{ mr: 1, fontSize: 20 }} />
              {searchConfig.lookup.label}
            </ToggleButton>
            <Divider sx={{ height: 28, m: 1 }} orientation="vertical" />
            <ToggleButton value="search" aria-label="name search">
              <PersonIcon sx={{ mr: 1, fontSize: 20 }} />
              {searchConfig.search.label}
            </ToggleButton>
          </ToggleButtonGroup>
          
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
            {currentConfig?.description}
          </Typography>
        </Box>
        <Paper
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '400px', border: 1, borderColor: getStatusColor() }}
            className={getStatusColor()}
        >
        {<span style={{ height: "40px", margin:"-1px", marginRight:"8px" }} ref={inputRef}></span>}{getStatusIcon()}
         <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder={currentConfig?.placeholder}
            inputProps={{
              startAdornment: (
                <Box sx={{ mr: 1, display: 'flex', color: 'action.active' }}>
                  {currentConfig?.icon}
                </Box>
              )
            }}
            value={searchValue}
            onChange={(e) => {setSearchValue(e.target.value),clearSearchText(true)}}
            onKeyDown={(e) => {
            if (e.key === 'Enter') {
                handleSearch(e);
            }
            }}
        /> 
       
        {searchText && <CloseRoundedIcon onClick={() => {clearSearchText(false), setSearchValue('')}} />}
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton  onClick={(e) => handleSearch(e)}  color="primary" sx={{ p: '10px' }} aria-label="directions">
            {searchMutation.status === 'pending' ? <ClipLoader color="#36a5dd" size={25}/> : <TravelExploreIcon />}
        </IconButton>
        </Paper>
        {/* <FormHelperText>For e.g. "https://ror.org/123456" or "My Organization"</FormHelperText> */}
        <Popover
            open={dropBox}
            anchorEl={inputRef.current }
            onClose={() => setDropBox(false)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            sx={{ mt: 1, left:0, width: '400px' }}
            >
            {searchMutation.data?.items?.length === 0 && (
                <Box sx={{ padding: 2, maxWidth:'400px'}}>
                <Typography variant="body2" className="text-orange-500">
                    No organizations found for "{searchValue}"
                </Typography>
                </Box>
            )}
            {searchMutation.status === 'error' && (
                <Box sx={{ padding: 2, maxWidth: '400px', color: getStatusColor() }}>
                <Typography variant="body2" className="text-red-500">
                    Failed to fetch results for "{searchValue}". Please try again.
                </Typography>
                </Box>
            )}
            <Box sx={{ maxHeight: "350px", overflow: "auto", width: '400px' }} display={dropBox ? 'block' : 'none'}>
                {/* {sortedCountries.length > 0 && (
                <List>
                    {sortedCountries.map(([countryName, organizations]) => (
                    <React.Fragment key={countryName}>
                        <ListSubheader
                        sx={{
                            backgroundColor: "primary.light",
                            color: "primary.contrastText",
                            position: "sticky",
                            top: 0,
                            zIndex: 1,
                            opacity: 1,
                        }}
                        >
                        {countryName} ({organizations.length})
                        </ListSubheader>
                        {organizations.map((org, index) => (
                        <ListItemButton
                            key={`${org.id}-${index}`}
                            onClick={() => handleListItemClick(org)}
                        >
                            <ListItemText
                            primary={org.displayName}
                            secondary={formatSecondaryText(org.links)}
                            />
                        </ListItemButton>
                        ))}
                    </React.Fragment>
                    ))}
                </List>
                )} */}
                {searchMutation.status === 'pending' && (
                <Box sx={{ padding: 2, minWidth: '350px', width: '400px'}}>
                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: getStatusColor() }}>
                    {`Searching `} <PulseLoader color="#36a5dd" size={5} />
                </Typography>
                </Box>
            )}
            </Box>
        </Popover>
    </Paper>
    </Box>
  );
}
