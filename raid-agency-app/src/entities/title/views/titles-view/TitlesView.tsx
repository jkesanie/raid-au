import { DisplayCard } from "@/components/display-card";
import { NoItemsMessage } from "@/components/no-items-message";
import { TitleItemView } from "@/entities/title/views/title-item-view/TitleItemView";
import type { Title } from "@/generated/raid";
import { Divider, Stack } from "@mui/material";
import { memo } from "react";

const TitlesView = memo(({ data }: { data: Title[] }) => (
  <DisplayCard
    data={data}
    labelPlural="Titles"
    children={
      <>
        {data.length === 0 && <NoItemsMessage entity="titles" />}
        <Stack gap={2} divider={<Divider />}>
          {data?.map((title, i) => (
            <TitleItemView title={title} key={`title-${i}`} i={i} />
          ))}
        </Stack>
      </>
    }
  />
));

TitlesView.displayName = "TitlesView";

export { TitlesView };
