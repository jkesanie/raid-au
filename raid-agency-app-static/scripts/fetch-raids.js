#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import https from 'https';
import http from 'http';
import { promisify } from 'util';
import { pipeline } from 'stream';
import { config as dotenvConfig } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { pathToFileURL } from 'url';
import { fetchAllHandles } from './fetch-handles.js';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenvConfig();

// Configuration with defaults
const config = {
  iamEndpoint: process.env.IAM_ENDPOINT,
  apiEndpoint: process.env.API_ENDPOINT,
  iamClientId: process.env.IAM_CLIENT_ID,
  iamClientSecret: process.env.IAM_CLIENT_SECRET,
  raidEnv: process.env.RAID_ENV,
  dataDir: process.env.DATA_DIR || './src/raw-data',
  // Performance tuning
  concurrentDOIRequests: parseInt(process.env.CONCURRENT_DOI_REQUESTS) || 5,
  doiRequestDelay: parseInt(process.env.DOI_REQUEST_DELAY) || 100,
  requestTimeout: parseInt(process.env.REQUEST_TIMEOUT) || 30000,
  maxRetries: parseInt(process.env.MAX_RETRIES) || 3,
  // Feature flags
  enableCaching: process.env.ENABLE_CACHING === 'true' || true,
  cachingTime: parseInt(process.env.CACHING_TIME) || 24 * 5 * 60 * 60 * 1000, // 5 days
  verboseLogging: process.env.VERBOSE_LOGGING === 'true'
};

// Simple in-memory cache for DOI citations
const citationCache = new Map();

// Statistics tracking
const stats = {
  totalRaids: 0,
  totalDois: 0,
  successfulCitations: 0,
  cachedCitations: 0,
  failedCitations: 0,
  startTime: Date.now()
};

// Validate required environment variables
function validateConfig() {
  const required = ['IAM_ENDPOINT', 'API_ENDPOINT', 'IAM_CLIENT_ID', 'IAM_CLIENT_SECRET', 'RAID_ENV'];
  const missing = required.filter(key => !process.env[key]);
  // Check if any required environment variables are missing
  if (missing.length > 0) {
    console.error('Error: The following required environment variables are not set:');
    missing.forEach(key => console.error(`  - ${key}`));
    console.error('Please set these variables before running the script.');
    process.exit(1);
  }
}

// Enhanced HTTP request with retry logic
async function makeRequestWithRetry(url, options = {}, retries = config.maxRetries) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await makeRequest(url, {
        ...options,
        timeout: config.requestTimeout
      });
      return response;
    } catch (error) {
      if (attempt === retries) {
        throw error;
      }
      if (config.verboseLogging) {
        console.log(`  Retry ${attempt}/${retries} for ${url}`);
      }
      // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
    }
  }
}

// Make HTTP request (supports both http and https)
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const protocol = parsedUrl.protocol === 'https:' ? https : http;
    
    const timeout = options.timeout || config.requestTimeout;
    const req = protocol.request(url, options, (res) => {
      let data = '';
      
      res.on('data', chunk => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve({ data, headers: res.headers, statusCode: res.statusCode });
        } else if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          // Handle redirects manually
          makeRequest(res.headers.location, options).then(resolve).catch(reject);
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });
    
    req.setTimeout(timeout, () => {
      req.destroy();
      reject(new Error(`Request timeout after ${timeout}ms`));
    });
    
    req.on('error', reject);
    
    if (options.body) {
      req.write(options.body);
    }
    
    req.end();
  });
}

// Get bearer token from IAM
async function getBearerToken() {
  console.log('Getting bearer token...');
  
  const tokenUrl = `${config.iamEndpoint}/realms/raid/protocol/openid-connect/token`;
  const body = `grant_type=client_credentials&client_id=${config.iamClientId}&client_secret=${config.iamClientSecret}`;
  
  try {
    const response = await makeRequestWithRetry(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(body)
      },
      body
    });
    
    const tokenData = JSON.parse(response.data);
    
    if (!tokenData.access_token) {
      throw new Error('No access token in response');
    }
    
    console.log('Token acquired successfully.');
    return tokenData.access_token;
  } catch (error) {
    console.error('Failed to get bearer token:', error.message);
    process.exit(1);
  }
}

// Fetch RAID data from API
async function fetchRaidData(bearerToken) {
  console.log('Fetching data from API...');
  
  const url = `${config.apiEndpoint}/raid/all-public`;
  
  try {
    const response = await makeRequestWithRetry(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    return JSON.parse(response.data);
  } catch (error) {
    console.error('Failed to fetch RAID data:', error.message);
    process.exit(1);
  }
}

function cleanDetailedCitation(citation) {
  let cleaned = citation;

  // Remove DOI URLs (both http and https, with or without dx.)
  // This regex matches URLs that start with http(s)://doi.org or dx.doi.org
  // and continues until it hits whitespace or end of string
  cleaned = cleaned.replace(/https?:\/\/(?:dx\.)?doi\.org\/[^\s]+/gi, '');

  // Remove standalone DOI patterns (e.g., "DOI: 10.1234/..." or just "10.1234/...")
  // that might appear anywhere in the text
  cleaned = cleaned.replace(/\bDOI\s*:?\s*10\.\d+\/[^\s,.;]+/gi, '');
  
  // Remove bare DOI patterns that start with 10. and contain a forward slash
  cleaned = cleaned.replace(/\b10\.\d+\/[^\s,.;]+/g, '');

  // Clean up any trailing punctuation that might be left after DOI removal
  cleaned = cleaned.replace(/\s*[,;]\s*\./, '.');
  
  // Clean up extra spaces
  cleaned = cleaned.replace(/\s{2,}/g, ' ');
  
  // Clean up any double periods
  cleaned = cleaned.replace(/\.\s*\.\s*/g, '. ');
  
  // Remove any trailing whitespace before periods
  cleaned = cleaned.replace(/\s+\./g, '.');

  // Ensure proper ending
  cleaned = cleaned.trim();
  if (cleaned && !cleaned.endsWith('.') && !cleaned.endsWith('!') && !cleaned.endsWith('?')) {
    cleaned += '.';
  }

  return cleaned;
}

// Fetch citation for a DOI with caching
async function fetchCitation(doi) {
  // Check cache first
  if (config.enableCaching && citationCache.has(doi) && (Date.now() - citationCache.get(doi).timestamp < config.cachingTime)) {
    stats.cachedCitations++;
    return citationCache.get(doi).citation;
  }
  
  const url = `https://doi.org/${doi}`;
  
  try {
    const response = await makeRequestWithRetry(url, {
      method: 'GET',
      headers: {
        'Accept': 'text/bibliography; style=apa, text/x-bibliography; style=apa, text/plain'
      }
    }, 2); // Fewer retries for DOI lookups
    
    // Check if we got a valid citation
    const citation = response.data.trim();
    if (citation && !citation.includes('404') && !citation.includes('Not Found')) {
      if (config.enableCaching) {
        citationCache.set(doi, {
          citation: cleanDetailedCitation(citation),
          timestamp: Date.now()
        });
      }
      return cleanDetailedCitation(citation);
    }
    return null;
  } catch (error) {
    stats.failedCitations++;
    return null;
  }
}

// Process a batch of DOIs concurrently
async function processDOIBatch(dois) {
  const results = await Promise.all(
    dois.map(async ({ doi, raidIndex, objectIndex }) => {
      const citation = await fetchCitation(doi);
      if (citation) {
        stats.successfulCitations++;
      }
      return { citation, raidIndex, objectIndex };
    })
  );
  return results;
}

// Add citations to RAID data with concurrent processing
async function addCitationsToRaidData(raidData) {
  console.log('Fetching citation data for DOIs...');
  
  if (!Array.isArray(raidData)) {
    console.error('Error: RAID data is not an array');
    return raidData;
  }
  
  stats.totalRaids = raidData.length;
  console.log(`Found ${stats.totalRaids} RAID records to process`);
  
  // Collect all DOIs with their positions
  const allDois = [];
  
  raidData.forEach((raid, raidIndex) => {
    if (raid.relatedObject && Array.isArray(raid.relatedObject)) {
      raid.relatedObject.forEach((relatedObj, objectIndex) => {
        if (relatedObj.id && relatedObj.id.includes('10.')) {
          allDois.push({
            doi: relatedObj.id,
            raidIndex,
            objectIndex
          });
          stats.totalDois++;
        }
      });
    }
  });
  
  console.log(`Found ${stats.totalDois} DOIs to process`);
  
  // Process DOIs in batches
  const batchSize = config.concurrentDOIRequests;
  let processedCount = 0;
  
  for (let i = 0; i < allDois.length; i += batchSize) {
    const batch = allDois.slice(i, i + batchSize);
    
    if (config.verboseLogging) {
      console.log(`Processing DOI batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(allDois.length / batchSize)}`);
    }
    
    const results = await processDOIBatch(batch);
    
    // Apply results to RAID data
    results.forEach(({ citation, raidIndex, objectIndex }) => {
      if (citation) {
        raidData[raidIndex].relatedObject[objectIndex].citation = {
          text: citation
        };
      }
    });
    
    processedCount += batch.length;
    
    // Progress indicator
    const progress = Math.round((processedCount / allDois.length) * 100);
    process.stdout.write(`\rProgress: ${progress}% (${processedCount}/${allDois.length} DOIs)`);
    
    // Rate limiting delay between batches
    if (i + batchSize < allDois.length) {
      await new Promise(resolve => setTimeout(resolve, config.doiRequestDelay));
    }
  }
  
  console.log('\n'); // New line after progress indicator
  
  return raidData;
}

// Save cache to file (if enabled)
async function saveCache() {
  if (config.enableCaching && citationCache.size > 0) {
    const cacheFile = path.join(config.dataDir, '.citation-cache.json');
    const cacheData = Object.fromEntries(citationCache);
    await fs.writeFile(cacheFile, JSON.stringify(cacheData, null, 2));
    console.log(`Citation cache saved (${citationCache.size} entries)`);
  }
}

// Load cache from file (if enabled and exists)
async function loadCache() {
  if (config.enableCaching) {
    const cacheFile = path.join(config.dataDir, '.citation-cache.json');
    try {
      const cacheData = await fs.readFile(cacheFile, 'utf8');
      const cache = JSON.parse(cacheData);
      Object.entries(cache).forEach(([doi, citation]) => {
        citationCache.set(doi, citation);
      });
      console.log(`Citation cache loaded (${citationCache.size} entries)`);
    } catch (error) {
      // Cache file doesn't exist or is invalid, start fresh
    }
  }
}

// Main execution
async function main() {
  try {
    // Validate configuration
    validateConfig();
    
    // Create data directory if it doesn't exist
    await fs.mkdir(config.dataDir, { recursive: true });
    console.log(`Data directory ready: ${config.dataDir}`);
    
    // Load cache if enabled
    await loadCache();
    
    // Step 1: Get bearer token
    const bearerToken = await getBearerToken();
    
    // Step 2: Fetch RAID data
    const raidData = await fetchRaidData(bearerToken);
    
    // Step 3: Add citations to RAID data
    const enrichedData = await addCitationsToRaidData(raidData);
    
    // Step 4: Save enriched RAID data
    const outputFile = path.join(config.dataDir, 'raids.json');
    await fs.writeFile(outputFile, JSON.stringify(enrichedData, null, 2));
    console.log(`Data successfully saved to ${outputFile}`);
    
    // Step 5: Extract and save handles
    const handles = await fetchAllHandles();
    const handlesFile = path.join(config.dataDir, 'handles.json');
    await fs.writeFile(handlesFile, JSON.stringify(handles, null, 2));
    console.log(`Unique handles saved to ${handlesFile}`);
    
    // Save cache for next run
    await saveCache();
    
    // Summary
    const elapsedTime = ((Date.now() - stats.startTime) / 1000).toFixed(2);
    console.log('\nSummary:');
    console.log(`- Total RAIDs processed: ${stats.totalRaids}`);
    console.log(`- Total DOIs found: ${stats.totalDois}`);
    console.log(`- Successful citations: ${stats.successfulCitations}`);
    console.log(`- Failed citations: ${stats.failedCitations}`);
    if (config.enableCaching) {
      console.log(`- Cached citations used: ${stats.cachedCitations}`);
    }
    console.log(`- Total handles: ${handles.length}`);
    console.log(`- Execution time: ${elapsedTime} seconds`);
    
  } catch (error) {
    console.error('Error:', error.message);
    if (config.verboseLogging) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

// Run the script if executed directly
main();

// Export functions for use as a module
export {
  getBearerToken,
  fetchRaidData,
  addCitationsToRaidData,
  fetchCitation,
  config
};