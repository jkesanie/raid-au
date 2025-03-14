import { DisplayCard } from "@/components/display-card";
import { NoItemsMessage } from "@/components/no-items-message";
import { RelatedObject } from "@/generated/raid";
import { getTitleFromDOI } from "@/services/related-object";
import { getLastTwoUrlSegments } from "@/utils/string-utils/string-utils";
import { Divider, Stack } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { memo, useEffect } from "react";
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

const RelatedObjectsView = memo(({ data }: { data: RelatedObject[] }) => {
  const { data: relatedObjectTitles } = useRelatedObjectTitles();
  const queryClient = useQueryClient();
  // Update the mutation with proper typing
  const { mutate: downloadAllObjects } = useMutation({
    mutationFn: async (relatedObjects: RelatedObject[]) => {
      const results = await Promise.all(
        relatedObjects.map(async (obj) => {
          if (!obj.id) return null;

          await queryClient.prefetchQuery<{
            title: string;
            ra: string;
          }>({
            queryKey: ["doi", obj.id],
            queryFn: async () => {
              const lastTwoUrlSegments = getLastTwoUrlSegments(obj.id!);
              if (lastTwoUrlSegments) {
                return await getTitleFromDOI(lastTwoUrlSegments);
              } else {
                return Promise.reject(new Error("Invalid URL segments"));
              }
            },
            staleTime: 1000 * 60 * 60 * 24 * 90,
          });

          return queryClient.getQueryData<{
            title: string;
            ra: string;
          }>(["doi", obj.id]);
        })
      );
      return { results, objectsToFetch: relatedObjects };
    },
    onSuccess: ({ results, objectsToFetch }) => {
      const currentNames =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        queryClient.getQueryData<Map<string, any>>(["relatedObjectTitles"]) ||
        new Map();
      const newNames = new Map(currentNames);

      results.forEach((relatedObjectData, index) => {
        if (!relatedObjectData) return;

        const relatedObjectId = objectsToFetch[index].id;
        const displayName = relatedObjectData;

        newNames.set(relatedObjectId, {
          cachedAt: Date.now(),
          value: displayName.title,
          source: displayName.ra,
        });
      });

      localStorage.setItem(
        "relatedObjectTitles",
        JSON.stringify([...newNames])
      );
      queryClient.setQueryData(["relatedObjectTitles"], newNames);
    },
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
