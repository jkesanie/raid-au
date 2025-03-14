import { DisplayCard } from "@/components/display-card";
import { NoItemsMessage } from "@/components/no-items-message";
import type { Title } from "@/generated/raid";
import { Divider, Stack } from "@mui/material";
import { memo } from "react";
import { TitleItem } from "../title-item";

const TitlesDisplay = memo(({ data }: { data: Title[] }) => (
  <DisplayCard
    data={data}
    labelPlural="Titles"
    children={
      <>
        {data.length === 0 && <NoItemsMessage entity="titles" />}
        <Stack gap={2} divider={<Divider />}>
          {data?.map((title, i) => (
            <TitleItem title={title} key={`title-${i}`} i={i} />
          ))}
        </Stack>
      </>
    }
  />
));

TitlesDisplay.displayName = "TitlesDisplay";

export { TitlesDisplay };
