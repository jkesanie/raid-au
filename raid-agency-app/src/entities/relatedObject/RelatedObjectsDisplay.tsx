import { DisplayCard } from "@/components/display-card";
import { DisplayItem } from "@/components/display-item";
import { RelatedObject } from "@/generated/raid";
import { useMapping } from "@/mapping";
import { getTitleFromDOI } from "@/services/related-object";
import { getLastTwoUrlSegments } from "@/utils/string-utils/string-utils";
import { Divider, Grid, Stack, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { memo, useEffect, useMemo } from "react";
import RelatedObjectCategoryItem from "./category/RelatedObjectCategoryItem";

const useRelatedObjectTitles = () => {
  return useQuery({
    queryKey: ["relatedObjectTitles"],
    queryFn: () => {
      const stored = localStorage.getItem("relatedObjectTitles");
      return stored ? new Map(JSON.parse(stored)) : new Map();
    },
  });
};

const NoItemsMessage = memo(() => (
  <Typography variant="body2" color="text.secondary" textAlign="center">
    No related objects defined
  </Typography>
));

const RelatedObjectItem = memo(
  ({
    i,
    relatedObject,
    relatedObjectTitle,
  }: {
    i: number;
    relatedObject: RelatedObject;
    relatedObjectTitle: string;
  }) => {
    const { generalMap } = useMapping();

    const relatedObjectMappedValue = useMemo(
      () => generalMap.get(String(relatedObject.type?.id)) ?? "",
      [relatedObject.type?.id]
    );

    return (
      <Stack gap={2}>
        <Typography variant="subtitle2">
          {relatedObjectTitle
            ? relatedObjectTitle
            : `Related Object #{${i + 1}}`}
        </Typography>
        <Grid container spacing={2}>
          <DisplayItem
            label="Related Object Link"
            value={relatedObject.id}
            link={relatedObject.id}
            width={8}
          />
          <DisplayItem
            label="Type"
            value={relatedObjectMappedValue}
            width={4}
          />
        </Grid>

        <Stack gap={2} sx={{ pl: 3 }}>
          <Stack direction="row" alignItems="baseline">
            <Typography variant="body1" sx={{ mr: 0.5 }}>
              Categories
            </Typography>
            <Typography variant="caption" color="text.disabled">
              {relatedObjectTitle
                ? relatedObjectTitle
                : `Related Object #{${i + 1}}`}
            </Typography>
          </Stack>
          <Stack gap={2} divider={<Divider />}>
            {(relatedObject?.category || []).map((category) => (
              <RelatedObjectCategoryItem
                key={crypto.randomUUID()}
                relatedObjectCategory={category}
              />
            ))}
          </Stack>
        </Stack>
      </Stack>
    );
  }
);

const RelatedObjectsDisplay = memo(({ data }: { data: RelatedObject[] }) => {
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
          {data.length === 0 && <NoItemsMessage />}
          <Stack gap={2} divider={<Divider />}>
            {data?.map((relatedObject, i) => (
              <RelatedObjectItem
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

NoItemsMessage.displayName = "NoItemsMessage";
RelatedObjectItem.displayName = "RelatedObjectItem";
RelatedObjectsDisplay.displayName = "RelatedObjectsDisplay";

export default RelatedObjectsDisplay;
