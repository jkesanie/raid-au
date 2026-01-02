import React from "react";
import { subjectDataGenerator } from "@/entities/subject/data-generator/subject-data-generator";
import { RaidDto } from "@/generated/raid";
import { AddBox } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import { Fragment, useState, useContext } from "react";
import {
  Control,
  FieldErrors,
  UseFormTrigger,
  useFieldArray,
  useFormContext,
} from "react-hook-form";
import { SubjectKeywordsForm } from "@/entities/subject-keyword/forms/subject-keywords-form/";
import { SubjectDetailsForm } from "@/entities/subject/forms/subject-details-form";
import { MetadataContext } from "@/components/raid-form/RaidForm";
import { CustomStyledTooltip } from "@/components/tooltips/StyledTooltip";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useCodesContext } from "@/components/tree-view/context/CodesContext";
import { TransformCodes } from "@/utils/transformer/TransformCodes";
import CustomizedTreeViewWithSelection from "@/components/tree-view/TreeView";
import DropDown from "@/components/dropdown-select/DropDown";
import CustomisedInputBase from "@/components/custom-text-field/CustomisedInputBase";
import { RotateCcw, Search, Plus } from "lucide-react";
import { CodeItem } from "@/components/tree-view/context/CodesProvider";

export function SubjectsForm({
  control,
  errors,
  trigger,
}: {
  control: Control<RaidDto>;
  errors: FieldErrors<RaidDto>;
  trigger: UseFormTrigger<RaidDto>;
}) {
  const key = "subject";
  const label = "Subject";
  const labelPlural = "Subjects";
  const generator = subjectDataGenerator;
  const DetailsForm = SubjectDetailsForm;

  const [isRowHighlighted, setIsRowHighlighted] = useState(false);
  const { fields, append, remove } = useFieldArray({ control, name: key });
  const { clearErrors } = useFormContext();
  const errorMessage = errors[key]?.message;
  const {
    codesData,
    setCodesData,
    subjectType,
    setSubjectType,
    getSubjectTypes,
    setSearchQuery,
    searchQuery,
    filterCodesBySearch,
    resetState,
    getSelectedCodesData,
    selectedCodesData,
    selectedCodes,
    removeFromSubjects,
  } = useCodesContext();
  let count:number = 0
  React.useEffect(() => {
   if(!selectedCodesData) return;
   console.log("Appending selected codes data",  count+1);
   selectedCodesData?.map((code)=>append(generator(code.id, subjectType)));
  }, [selectedCodesData]);

  const handleAddItem = () => {
    getSelectedCodesData().map((code)=>append(generator(code.id, subjectType)));
   trigger(key);
  }
  
  const metadata = useContext(MetadataContext);
  const tooltip = metadata?.[key]?.tooltip;
  const subjectTypes = getSubjectTypes();
  const preserveCodesData = React.useRef<{[key: string]: CodeItem[] | null} | null>(null);

  React.useEffect(() => {
    TransformCodes().then((transformed) => {
      setCodesData(transformed || []);
      (preserveCodesData as React.MutableRefObject<{[key: string]: CodeItem[] | null} | null>).current = {...transformed};
    });
  }, [setCodesData]);
  console.log("selectedCodesData", selectedCodesData);
  React.useEffect(() => {
    const filtered = filterCodesBySearch(preserveCodesData.current?.[subjectType] || [], searchQuery);
    preserveCodesData.current && setCodesData({...codesData, [subjectType]: filtered || [] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, filterCodesBySearch, subjectType]);

  const handleReset = () => {
    resetState();
    clearErrors(key);
  }
  return (
    <Card
      sx={{
        borderLeft: errors[key] ? "3px solid" : "none",
        borderLeftColor: "error.main",
      }}
      id={key}
    >
      <Stack direction="row" alignItems="center">
        <CardHeader sx={{padding: "16px 0 16px 16px"}} title={labelPlural} />
        <CustomStyledTooltip
          title={label}
          content={tooltip || ""}
          variant="info"
          placement="top"
          tooltipIcon={<InfoOutlinedIcon />}
        >
        </CustomStyledTooltip>
      </Stack>
      <CardContent sx={{ p: 3, m: 3, border: "1px solid rgba(0, 0, 0, 0.87)", borderRadius: 1 }}>
        <Stack gap={2} className={isRowHighlighted ? "add" : ""}>
          {errorMessage && (
            <Typography variant="body2" color="error" textAlign="center">
              {errorMessage}
            </Typography>
          )}
          <Stack gap={2} data-testid={`${key}-form`}>
            <Typography variant="body1" color="black" textAlign="left" marginBottom={2}>
              {"Subject Selection"}
            </Typography>
            <Stack
              gap={2}
              direction={{ xs: 'column', sm: 'row' }}
              alignItems="center"
              justifyContent="space-between"
              spacing={{ xs: 0, sm: 10, md: 20, lg: 30, xl: 40 }}
            >
              <DropDown
                label="Select Subject Type"
                options={subjectTypes || []}
                defaultValue={subjectType || ""}
                setValue={setSubjectType}
                currentValue={subjectType || ""}
              />
              <CustomisedInputBase
                placeholder="Type to filter subjects..."
                searchValue={(searchValue) => {
                  setSearchQuery(searchValue);
                }}
                value={searchQuery}
                endEdorment={<Search size={16} />}
              />
            </Stack>
            <CustomizedTreeViewWithSelection/>
            <Stack gap={2} direction="row" justifyContent="flex-end">
              <Button
                variant="outlined"
                color="info"
                size="small"
                startIcon={<RotateCcw />}
                sx={{ textTransform: "none", mt: 3, alignSelf: 'flex-end' }}
                onClick={handleReset}
              >
                Reset
              </Button>
              <Button
                variant="outlined"
                color="info"
                size="small"
                startIcon={<Plus />}
                sx={{ textTransform: "none", mt: 3, alignSelf: 'flex-end' }}
                onClick={getSelectedCodesData}
                disabled={selectedCodes.length === 0}
              >
                Add subjects
              </Button>
              </Stack>
            </Stack>
            <Stack gap={4}>
            {selectedCodesData?.map((field, index) => (
              <Fragment key={field.id}>
                <DetailsForm
                  key={field.id}
                  handleRemoveItem={() => removeFromSubjects(field.id)}
                  index={index}
                  selectedCode={field.label}
                  id={field.id}
                />
                <SubjectKeywordsForm
                  control={control}
                  errors={errors}
                  trigger={trigger}
                  parentIndex={index}
                />
              </Fragment>
            ))}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
