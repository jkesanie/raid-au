import { DisplayCard } from "@/components/display-card";
import { NoItemsMessage } from "@/components/no-items-message";
import { RelatedObject } from "@/generated/raid";
import { batchFetchDetailedCitations,constructDOIUrl } from "@/services/related-object";
import { Divider, Stack } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { memo, useEffect, useState } from "react";
import { RelatedObjectItemView } from "@/entities/related-object/views/related-object-item-view";

const useRelatedObjectTitles = () => {
  return useQuery({
    queryKey: ["relatedObjectTitles"],
    queryFn: () => {
      const stored = localStorage.getItem("relatedObjectTitles");
      return stored ? new Map(JSON.parse(stored)) : new Map();
    },
  });
};

// New interface for tracking loading states
interface DOILoadingState {
  [doiId: string]: boolean;
}

const RelatedObjectsView = memo(({ data }: { data: RelatedObject[] }) => {
  const { data: relatedObjectTitles } = useRelatedObjectTitles();
  const [doiLoadingStates, setDoiLoadingStates] = useState<DOILoadingState>({});
  const queryClient = useQueryClient();
  // Updated mutation using batch fetch
  const { mutate: downloadAllObjects } = useMutation({
    mutationFn: async (relatedObjects: RelatedObject[]) => {
      // Filter valid objects and construct DOI URLs
      
      const validObjects = relatedObjects.filter(obj => obj.id);
      const doiUrls = validObjects
        .map(obj => constructDOIUrl(obj.id!))
        .filter((url): url is string => url !== null);

      const loadingStates: DOILoadingState = {};
      validObjects.forEach(obj => {
        if (obj.id) {
          loadingStates[obj.id] = true;
        }
      });
      
      setDoiLoadingStates(loadingStates);

      // Use the fast batch fetch function
      try {
        const citations = await batchFetchDetailedCitations(doiUrls, { 
          timeout: 8000,
          userAgent: 'RelatedObjects-Fetcher/1.0'
        });

        // Process results and cache them
        const results = validObjects.map((obj, index) => {
          const citation = citations[index];
          // Update loading state for this specific DOI
            setDoiLoadingStates(prev => ({
              ...prev,
              [obj.id!]: false
            }));
          // If no citation found, return null
          if (!citation) return null;

          // Cache the query result for individual access
          queryClient.setQueryData(["doi", obj.id], {
            title: citation, // The clean citation
            ra: 'doi-batch', // Registration agency identifier
            fullCitation: citation
          });

          return {
            title: citation,
            ra: 'doi-batch',
            fullCitation: citation
          };
        });

        return { results, objectsToFetch: validObjects };
      } catch (error) {
        setDoiLoadingStates({});
        throw error;
      }
    },
    onSuccess: ({ results, objectsToFetch }) => {
      const currentNames =
        queryClient.getQueryData<Map<string, any>>(["relatedObjectTitles"]) ||
        new Map();
      const newNames = new Map(currentNames);

      results.forEach((relatedObjectData, index) => {
        if (!relatedObjectData) return;

        const relatedObjectId = objectsToFetch[index].id;
        const displayName = relatedObjectData;

        newNames.set(relatedObjectId, {
          cachedAt: Date.now(),
          value: displayName.title, // This is now the clean citation
          source: displayName.ra,
          fullCitation: displayName.fullCitation
        });
      });

      localStorage.setItem(
        "relatedObjectTitles",
        JSON.stringify([...newNames])
      );
      queryClient.setQueryData(["relatedObjectTitles"], newNames);
      setDoiLoadingStates({});
    },
    onError: (error) => {
      console.error('❌ Batch DOI fetch failed:', error);
    }
  });

  useEffect(() => {
    if (data.length > 0 && relatedObjectTitles) {
      const CACHE_EXPIRY_DAYS = 90;
      const MS_PER_DAY = 1000 * 60 * 60 * 24;

      const orgsToDownload = data.filter((org) => {
        if (!org.id) return false;
        const cached = relatedObjectTitles.get(org.id);
        if (!cached) return true;
        const cacheAge = Date.now() - cached.cachedAt;
        return cacheAge > CACHE_EXPIRY_DAYS * MS_PER_DAY;
      });

      if (orgsToDownload.length > 0) {
        downloadAllObjects(orgsToDownload);
      }
    }
  }, [data, relatedObjectTitles, downloadAllObjects]);

  return (
    <DisplayCard
      data={data}
      labelPlural="Related Objects"
      children={
        <>
          {data.length === 0 && <NoItemsMessage entity="related object" />}
          <Stack gap={2} divider={<Divider />}>
            {data?.map((relatedObject, i) => (
              <RelatedObjectItemView
                relatedObject={relatedObject}
                key={relatedObject.id || i}
                i={i}
                relatedObjectTitle={
                  relatedObjectTitles?.size &&
                  relatedObjectTitles?.get(relatedObject.id)?.value
                }
                doiLoadingStates={doiLoadingStates}
              />
            ))}
          </Stack>
        </>
      }
    />
  );
});

RelatedObjectsView.displayName = "RelatedObjectsView";

export { RelatedObjectsView };
