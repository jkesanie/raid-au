import { DisplayCard } from "@/components/display-card";
import { NoItemsMessage } from "@/components/no-items-message";
import { Subject } from "@/generated/raid";
import { Divider, Stack } from "@mui/material";
import { memo } from "react";
import { SubjectItem } from "../subject-item";

const SubjectsDisplay = memo(({ data }: { data: Subject[] }) => {
  return (
    <DisplayCard
      data={data}
      labelPlural="Subjects"
      children={
        <>
          {data.length === 0 && <NoItemsMessage entity="subjects" />}
          <Stack gap={2} divider={<Divider />}>
            {data?.map((subject, i) => (
              <SubjectItem subject={subject} key={`subject-${i}`} i={i} />
            ))}
          </Stack>
        </>
      }
    />
  );
});

SubjectsDisplay.displayName = "SubjectsDisplay";

export { SubjectsDisplay };
