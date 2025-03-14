import { DisplayCard } from "@/components/display-card";
import { NoItemsMessage } from "@/components/no-items-message";
import { Subject } from "@/generated/raid";
import { Divider, Stack } from "@mui/material";
import { memo } from "react";
import { SubjectItemiew } from "@/entities/subject/views/subject-item-view";

const SubjectsView = memo(({ data }: { data: Subject[] }) => {
  return (
    <DisplayCard
      data={data}
      labelPlural="Subjects"
      children={
        <>
          {data.length === 0 && <NoItemsMessage entity="subjects" />}
          <Stack gap={2} divider={<Divider />}>
            {data?.map((subject, i) => (
              <SubjectItemiew subject={subject} key={`subject-${i}`} i={i} />
            ))}
          </Stack>
        </>
      }
    />
  );
});

SubjectsView.displayName = "SubjectsView";

export { SubjectsView };
