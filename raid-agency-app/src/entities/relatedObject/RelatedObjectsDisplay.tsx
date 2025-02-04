import { DisplayCard } from "@/components/display-card";
import { DisplayItem } from "@/components/display-item";
import { RelatedObject } from "@/generated/raid";
import { useMapping } from "@/mapping";
import { getLastTwoUrlSegments } from "@/utils/string-utils/string-utils";
import { Divider, Grid, Stack, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { memo, useEffect, useMemo } from "react";
import RelatedObjectCategoryItem from "./category/RelatedObjectCategoryItem";

const fetchDoiData = async (id: string) => {
  const response = await fetch(`https://api.crossref.org/works/${id}`, {
    headers: { Accept: "application/json" },
  });
  const data = await response.json();
  console.log("+++ fetchDoiData - response", data);
  return data;
};

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
              Related Object #{i + 1}
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

  const { mutate: downloadAllObjects } = useMutation({
    mutationFn: async (relatedObjects: RelatedObject[]) => {
      // Only fetch for organizations not in cache
      const results = await Promise.all(
        relatedObjects.map((obj) => {
          const lastTwoUrlSegments = getLastTwoUrlSegments(obj.id!);
          if (obj?.id && lastTwoUrlSegments) {
            console.log("fetching doi data for", lastTwoUrlSegments);
            return fetchDoiData(lastTwoUrlSegments);
          }
        })
      );
      return results;
    },
    onSuccess: (data, relatedObjects) => {
      const currentNames =
        queryClient.getQueryData<Map<string, string>>([
          "relatedObjectTitles",
        ]) || new Map();
      const newNames = new Map(currentNames);

      data.forEach((relatedObjectData, index) => {
        const relatedObjectId = relatedObjects[index].id;
        const displayName = relatedObjectData.message.title;
        newNames.set(relatedObjectId, displayName);
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
      // Filter out organisations that are already in the cache
      const orgsToDownload = data.filter(
        (org) => !relatedObjectTitles.has(org.id)
      );

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
                relatedObjectTitle={relatedObjectTitles?.get(relatedObject.id)}
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
