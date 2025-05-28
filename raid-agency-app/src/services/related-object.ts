/**
 * Related Object Service Module
 *
 * This module provides functionality for working with related objects in the RAID system,
 * particularly for resolving DOI information from external services like Crossref and Datacite.
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
