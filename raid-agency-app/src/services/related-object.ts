/**
 * Related Object Service Module
 *
 * This module provides functionality for working with related objects in the RAID system,
 * particularly for resolving DOI information from external services like Crossref, Datacite and mEDRA.
 */

/**
 * Response structure from the DOI Registration Agency API
 * Contains information about the DOI and its Registration Agency
 */
interface DoiRaData {
  /** The Digital Object Identifier */
  DOI: string;
  /** The Registration Agency code (e.g., "Crossref", "Datacite") */
  RA: string;
}

/**
 * Response structure from the Crossref API
 * Contains metadata about works registered with Crossref
 */
interface CrossrefData {
  message: {
    /** Array of title variations, with the primary title usually at index 0 */
    title: string[];
  };
}

/**
 * Response structure from the Datacite API
 * Contains metadata about works registered with Datacite
 */
interface DataciteData {
  data: {
    attributes: {
      /** Array of title objects with the primary title information */
      titles: {
        /** The title text */
        title: string;
      }[];
    };
  };
}

/**
 * Response structure from the DOI handle API
 * Contains information about the DOI resolution
 */
interface DoiUrlData {
  /** HTTP response code from the handle server */
  responseCode: number;
  /** The DOI handle being resolved */
  handle: string;
  /** Array of values associated with the DOI */
  values: {
    /** Index position of this value */
    index: number;
    /** Type of handle value */
    type: string;
    /** The actual data for this handle value */
    data: {
      /** Format of the value (usually "string") */
      format: string;
      /** The value itself (typically a URL for URL type) */
      value: string;
    };
    /** Time to live in seconds */
    ttl: number;
    /** Timestamp of when this value was last updated */
    timestamp: string;
  }[];
}

/**
 * Retrieves the title of an object identified by a DOI
 * 
 * This function determines the registration agency (RA) for a DOI
 * and fetches the title using the appropriate API (Crossref, Datacite, or generic DOI handle).
 * It handles different response formats from each API and extracts the title.
 *
 * @param handle - The DOI handle (e.g. "10.1234/5678")
 * @returns Promise resolving to an object containing the title and registration agency
 * @throws Error if the DOI APIs return invalid responses
 */

import { API_CONSTANTS } from "@/constants/apiConstants";

export async function getTitleFromDOI(
  handle: string
): Promise<{ title: string; ra: string }> {
  try {
    const doiRaResponse = await fetch(API_CONSTANTS.DOI.REGISTRATION(handle));
    const [doiRaInfo] = (await doiRaResponse.json()) as DoiRaData[];

    if (!doiRaInfo?.RA) {
      throw new Error("Invalid DOI registration agency response");
    }

    const ra = doiRaInfo.RA.toLowerCase();

    switch (ra) {
      case "crossref": {
        const crossrefResponse = await fetch(
          API_CONSTANTS.DOI.CROSS_REF(handle)
        );
        const crossrefData: CrossrefData = await crossrefResponse.json();
        return {
          title: crossrefData.message.title?.[0] || "",
          ra,
        };
      }
      case "datacite": {
        const dataciteResponse = await fetch(
          API_CONSTANTS.DOI.DATA_CITE(handle)
        );
        if (!dataciteResponse.ok) {
          throw new Error(`Datacite API error: ${dataciteResponse.statusText}`);
        }
        const dataciteData: DataciteData = await dataciteResponse.json();
        return {
          title: dataciteData.data.attributes.titles?.[0]?.title || "",
          ra,
        };
      }
      default: {
        const doiUrlResponse = await fetch(
          API_CONSTANTS.DOI.BY_HANDLE_URL(handle)
        );
        const doiUrlData: DoiUrlData = await doiUrlResponse.json();
        const url = doiUrlData.values?.[0]?.data?.value;

        if (!url) {
          return {
            title: "",
            ra,
          };
        }

        const titleResponse = await fetch(url, {
          headers: {
            "User-Agent": "Mozilla/5.0",
            Range: "bytes=0-4096",
          },
        });
        const html = await titleResponse.text();
        console.log("html", html);
        const titleMatch = html.match(/<title>(.*?)<\/title>/i);
        return {
          title: titleMatch?.[1] || "",
          ra,
        };
      }
    }
  } catch (error) {
    console.error("Error fetching DOI title:", error);
    return {
      title: "",
      ra: "",
    };
  }
}


interface FetchDOIOptions {
  timeout?: number;
  userAgent?: string;
}

/**
 * Fetches detailed citation with publisher info (using CSL-JSON for richer data)
 * @param doiUrl - The DOI URL
 * @param options - Optional configuration
 * @returns Promise resolving to detailed citation string or null if not found
 */
async function fetchDetailedDOICitation(
  doiUrl: string, 
  options: FetchDOIOptions = {}
): Promise<string | null> {
  const { timeout = 8000, userAgent = 'DOI-Fetcher-Detailed/1.0' } = options;

  // Validate DOI URL format
  const doiPattern = /^https?:\/\/(?:dx\.)?doi\.org\/10\.\d+\/.+$/;
  if (!doiPattern.test(doiUrl)) {
    throw new Error('Invalid DOI URL format');
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    // First try text/x-bibliography for formatted citation
    const response = await fetch(doiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'text/x-bibliography; style=apa',
        'User-Agent': userAgent,
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const citation = await response.text();
    
    if (!citation.trim()) {
      throw new Error('Empty citation received');
    }
  
    // For detailed citation, we want to keep more information
    return cleanDetailedCitation(citation.trim());

  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error(`Request timeout after ${timeout}ms`);
      }
      throw error;
    }
    
    throw new Error('Unknown error occurred while fetching detailed DOI citation');
  }
}

/**
 * Enhanced citation cleaning that preserves publisher and detailed info
 * @param citation - Raw citation string
 * @returns Detailed citation with publisher info preserved
 */
function cleanDetailedCitation(citation: string): string {
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

/**
 * Batch fetch detailed citations with publisher info
 * @param doiUrls - Array of DOI URLs
 * @param options - Optional configuration
 * @returns Promise resolving to array of detailed citations
 */
async function batchFetchDetailedCitations(
  doiUrls: string[], 
  options: FetchDOIOptions = {}
): Promise<(string | null)[]> {
  
  const promises = doiUrls.map(url => 
    fetchDetailedDOICitation(url, options).catch(() => null)
  );
  
  const results = await Promise.all(promises);
  
  return results;
}
/**
 * Utility to construct DOI URL from various formats
 * @param identifier - DOI string, URL, or other identifier
 * @returns Properly formatted DOI URL
 */
function constructDOIUrl(identifier: string): string {
  // If it's already a complete DOI URL, return as is
  if (identifier.startsWith('https://doi.org/')) {
    return identifier;
  }
  
  // If it contains a DOI pattern, extract and construct URL
  const doiMatch = identifier.match(/10\.\d+\/.+$/);
  if (doiMatch) {
    return `https://doi.org/${doiMatch[0]}`;
  }
  
  // If it starts with "doi:", remove prefix and construct URL
  if (identifier.startsWith('doi:')) {
    return `https://doi.org/${identifier.slice(4)}`;
  }
  
  // Assume it's a bare DOI and construct URL
  return `https://doi.org/${identifier}`;
}

// Export all functions and types for external use

export {
  fetchDetailedDOICitation,
  batchFetchDetailedCitations,
  cleanDetailedCitation,
  constructDOIUrl,
  type FetchDOIOptions
};
