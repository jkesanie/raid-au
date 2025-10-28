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
  Popover,
  Card,
  CardContent,
  Avatar,
  Chip,
  Link
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { AlertCircle, CheckCircle, CircleCheck, Search, ScanSearch } from 'lucide-react';
import { ClipLoader } from 'react-spinners';
import { useMutation } from '@tanstack/react-query';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import PulseLoader from "react-spinners/PulseLoader";

  // JSONP helper function
  const fetchJSONP = (url) => {
    return new Promise((resolve, reject) => {
      // Create a unique callback name
      const uniqueCallback = `jsonp_callback_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
      
      // Create the script element
      const script = document.createElement('script');
      script.async = true;
      
      // Set up the callback function
      window[uniqueCallback] = (data) => {
        // Clean up
        try {
          delete window[uniqueCallback];
          document.body.removeChild(script);
        } catch (e) {
          // Ignore cleanup errors
        }
        resolve(data);
      };
      
      // Handle errors
      script.onerror = (error) => {
        try {
          delete window[uniqueCallback];
          document.body.removeChild(script);
        } catch (e) {
          // Ignore cleanup errors
        }
        reject(new Error('JSONP request failed: ' + url));
      };
      
      // Add timeout
      const timeout = setTimeout(() => {
        try {
          delete window[uniqueCallback];
          document.body.removeChild(script);
        } catch (e) {
          // Ignore cleanup errors
        }
        reject(new Error('JSONP request timeout'));
      }, 10000);
      
      // Override cleanup to clear timeout
      const originalCallback = window[uniqueCallback];
      window[uniqueCallback] = (data) => {
        clearTimeout(timeout);
        originalCallback(data);
      };
      
      // Replace callback=? with our callback name (jQuery style)
      const finalUrl = url.replace('callback=?', `callback=${uniqueCallback}`);
      script.src = finalUrl;
      
      // Append script to body to trigger the request
      document.body.appendChild(script);
    });
  };

const searchAPI = async (url: string): Promise<any> => {
    console.log('Fetching URL:', url);
  const response = await fetchJSONP(
    url
  );
/*   if (!response.ok) {
    throw new Error('Search failed');
  } */
  return response;
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
      endpoint: `https://researchdata.edu.au/api/v2.0/orcid.jsonp/lookup/${encodeURIComponent(searchValue)}/?api_key=public&callback=?`,
      label: 'ORCID ID',
      description: 'Search by unique ORCID identifier',
      icon: <FingerprintIcon />
    },
    search: {
      placeholder: 'Enter contributor name (e.g., John Smith)',
      endpoint: `https://researchdata.edu.au/api/v2.0/orcid.jsonp/search?api_key=public&q=${encodeURIComponent(searchValue)}&start=0&rows=10&wt=json&callback=?`,
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
  console.log("currentConfig", currentConfig);
  const handleSearch = async (e?: React.SyntheticEvent) => {
    e?.preventDefault();
    if (!searchValue.trim()) {
      setError('Please enter a search term');
      return;
    }
    // Pass a single object matching the mutationFn signature
    searchMutation.mutate(currentConfig.endpoint);
    setDropBox(true);
    setLoading(true);
    setError('');
    setResults(null);
  };
/* 
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch(event);
    }
  };
*/
 console.log("results", results);
  const searchMutation = useMutation({
    mutationFn: searchAPI,
    onError: (error) => {
        console.error('Search error:', error);
    },
  });

  React.useMemo(() => {
    if (searchMutation.data) {
    try {
      if (searchMode === 'lookup') {
        // ORCID Lookup - match jQuery format exactly
        const data = searchMutation.data;
        setResults({
          type: 'orcid',
          data: {
            orcid: data.orcid,
            name: data.person?.name?.['credit-name']?.value || 
                  `${data.person?.name?.['given-names']?.value || ''} ${data.person?.name?.['family-name']?.value || ''}`.trim(),
            affiliation: data.person?.['activities-summary']?.employments?.['employment-summary']?.[0]?.organization?.name || 'N/A',
            keywords: data.person?.keywords?.keyword?.map(k => k.content).join(', ') || 'N/A',
          }
        });
      } else {
        // Name Search - match jQuery format exactly
        const url = `${searchConfig.search.endpoint}?api_key=public&q=${encodeURIComponent(searchValue)}&start=0&rows=10&wt=json&callback=?`;
        console.log('Name Search URL:', url);
        const data = searchMutation.data;
        
        if (data['orcid-search-results'] && data['orcid-search-results'].length > 0) {
          const mappedResults = data['orcid-search-results'].map((item, index) => {
            const given = item.person?.name?.['given-names']?.value || '';
            const family = item.person?.name?.['family-name']?.value || '';
            const credit = item.person?.name?.['credit-name']?.value || '';
            
            return {
              orcid: item.orcid,
              name: credit || `${given} ${family}`.trim() || 'N/A',
              affiliation: item.person?.['activities-summary']?.employments?.['employment-summary']?.[0]?.organization?.name || 'N/A',
              relevance: 95 - (index * 5) // Mock relevance based on position
            };
          });
          
          setResults({
            type: 'search',
            data: mappedResults
          });
        } else {
          setError('No results found. Please try a different search term.');
        }
      }
    } catch (err) {
      console.error('Search error:', err);
      setError(`Failed to fetch results: ${err.message}`);
    } finally {
      setLoading(false);
    }
    }
        console.log('Search results:', searchMutation.data);
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
             backgroundColor: 'grey.100',
             padding: '4px',
             borderRadius: '8px',
              '& .MuiToggleButton-root': {
                px: 3,
                py: 1.5,
                textTransform: 'none',
                fontWeight: 500,
                border: 'none',
                borderRadius: '6px',
                color: 'text.secondary',
                transition: 'all 0.3s ease',
                boxShadow: 'none',
                '&.Mui-selected': {
                  bgcolor: 'white',
                  color: 'primary.main',
                  fontWeight: 600,
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08)',
                  transform: 'translateY(-1px)',
                  '&:hover': {
                    bgcolor: 'white',
                    boxShadow: '0 3px 10px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)',
                  }
                },
                '&:hover': {
                    color: 'primary.main',
                },
                width: '190px',
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
        {<span style={{ height: "40px", margin:"-1px", marginRight:"8px" }} ref={inputRef}></span>}{currentConfig.icon}
         <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder={currentConfig?.placeholder}
            inputProps={{ 'aria-label': 'search orcid' }}
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
            {searchMutation.status === 'pending' ? <ClipLoader color="#36a5dd" size={25}/> : <ScanSearch />}
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
                        {/* Results Display */}
        {results && (
          <Box>
            <Typography variant="h6" sx={{ m: 2, fontWeight: 600 }}>
              Search Results
            </Typography>

            {results.type === 'orcid' ? (
              // Single ORCID Result
              <Card 
                variant="outlined" 
                sx={{ 
                  mb: 2,
                  background: 'linear-gradient(to right, #eff6ff, #ffffff)',
                  '&:hover': { boxShadow: 2 }
                }}
                onClick={() => {
                    setSearchValue(`https://orcid.org/${results?.data.orcid}`);
                    setDropBox(false);
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'start', gap: 2 }}>
                    <Avatar 
                      sx={{ 
                        bgcolor: 'primary.main', 
                        width: 56, 
                        height: 56 
                      }}
                    >
                      <PersonIcon sx={{ fontSize: 32 }} />
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" fontWeight={600}>
                        {results?.data.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {results?.data.affiliation}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
                        <Chip
                          label={`ORCID: ${results?.data.orcid}`}
                          size="small"
                          color="primary"
                          variant="outlined"
                          sx={{ fontWeight: 500 }}
                        />
                        {results?.data.keywords && (
                          <Chip
                            label={results?.data.keywords}
                            size="small"
                            variant="outlined"
                          />
                        )}
                      </Box>
                      <Link
                        href={`https://orcid.org/${results?.data?.orcid}`}
                        target="_blank"
                        rel="noopener"
                        sx={{ 
                          fontSize: '0.875rem',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 0.5
                        }}
                      >
                        View ORCID Profile
                        <OpenInNewIcon sx={{ fontSize: 16 }} />
                      </Link>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ) : (
              // Multiple Search Results
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {results?.data.map((person, index) => (
                  <Card 
                    key={index} 
                    variant="outlined" 
                    sx={{ 
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      '&:hover': { 
                        bgcolor: 'action.hover',
                        boxShadow: 2
                      }
                    }}
                    onClick={() => {
                      setSearchValue(person.orcid);
                      setDropBox(false);
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'start', gap: 2 }}>
                        <Avatar sx={{ bgcolor: 'secondary.main' }}>
                          <PersonIcon />
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'start',
                            flexWrap: 'wrap',
                            gap: 1,
                            mb: 0.5 
                          }}>
                            <Typography variant="h6" fontWeight={600}>
                              {person.name}
                            </Typography>
                            <Chip
                              label={`${person.relevance}% match`}
                              size="small"
                              color="success"
                              sx={{ fontWeight: 600 }}
                            />
                          </Box>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            {person.affiliation}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
                            <Chip
                              label={person.orcid}
                              size="small"
                              variant="outlined"
                              icon={
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v2h-2zm0 4h2v6h-2z"/>
                                </svg>
                              }
                            />
                            <Link
                              href={`https://orcid.org/${person.orcid}`}
                              target="_blank"
                              rel="noopener"
                              sx={{ 
                                fontSize: '0.875rem',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 0.5
                              }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              View Profile
                              <OpenInNewIcon sx={{ fontSize: 16 }} />
                            </Link>
                          </Box>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            )}
          </Box>
        )}
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
