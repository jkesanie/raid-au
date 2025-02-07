interface DoiRaData {
  DOI: string;
  RA: string;
}

interface CrossrefData {
  message: {
    title: string[];
  };
}

interface DataciteData {
  data: {
    attributes: {
      titles: {
        title: string;
      }[];
    };
  };
}

interface DoiUrlData {
  responseCode: number;
  handle: string;
  values: {
    index: number;
    type: string;
    data: {
      format: string;
      value: string;
    };
    ttl: number;
    timestamp: string;
  }[];
}

export async function getTitleFromDOI(
  handle: string
): Promise<{ title: string; ra: string }> {
  try {
    const doiRaResponse = await fetch(`https://doi.org/doiRA/${handle}`);
    const [doiRaInfo] = (await doiRaResponse.json()) as DoiRaData[];

    if (!doiRaInfo?.RA) {
      throw new Error("Invalid DOI registration agency response");
    }

    const ra = doiRaInfo.RA.toLowerCase();

    switch (ra) {
      case "crossref":
        const crossrefResponse = await fetch(
          `https://api.crossref.org/works/${handle}`
        );
        const crossrefData: CrossrefData = await crossrefResponse.json();
        return {
          title: crossrefData.message.title?.[0] || "",
          ra,
        };

      case "datacite":
        const dataciteResponse = await fetch(
          `https://api.datacite.org/dois/${handle}`
        );
        if (!dataciteResponse.ok) {
          throw new Error(`Datacite API error: ${dataciteResponse.statusText}`);
        }
        const dataciteData: DataciteData = await dataciteResponse.json();
        return {
          title: dataciteData.data.attributes.titles?.[0]?.title || "",
          ra,
        };

      default:
        const doiUrlResponse = await fetch(
          `https://doi.org/api/handles/${handle}?type=url`
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
  } catch (error) {
    console.error("Error fetching DOI title:", error);
    return {
      title: "",
      ra: "",
    };
  }
}
