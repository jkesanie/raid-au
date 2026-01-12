import React, { useEffect } from "react";
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
import { RotateCcw, Search, Plus, Delete, Check } from "lucide-react";
import { CodeItem } from "@/components/tree-view/context/CodesProvider";
import CustomizedDialogs from "@/components/alert-dialog/alert-dialog";
import { get } from "http";

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
  const { clearErrors, getValues } = useFormContext();
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
    confirmationNeeded,
    modifySubjectSelection,
    setConfirmationNeeded,
  } = useCodesContext();
  
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

  React.useEffect(() => {
    const filtered = filterCodesBySearch(preserveCodesData.current?.[subjectType] || [], searchQuery);
    preserveCodesData.current && setCodesData({...codesData, [subjectType]: filtered || [] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, filterCodesBySearch, subjectType]);

  const handleReset = () => {
    resetState();
    clearErrors(key);
  }

   useEffect(() => {
    getSelectedCodesData().forEach((code, i) => {
      if(code.url && !getValues(key)?.some((subject: any) => subject.id === code.url)) {
        append(generator(code.url));
      }
    });
    }, [ remove, fields]);

  console.log("Selected Codes Data:", getValues(key));
  const handleAddItem = () => {
    //fields.forEach((field, index) => remove(index));
    const selections = modifySubjectSelection();
    selections?.forEach((code, i) => {
      if(!code.id) return;
      if(code.url && !getValues(key)?.some((subject: any) => subject.id === code.url)) {
        append(generator(code?.url));
      }
    });
    clearErrors(key);
  }

  const handleRemoveSelection = () => {
    if(selectedCodesData.length === 0) return;
    const index = selectedCodesData.findIndex(codeItem => !selectedCodes.includes(codeItem.id));
    if(index === -1) return;
    getSelectedCodesData();
    remove(index);
  }

  const hanldeRemoveFromSubjects = (codeId: string, index: number) => {
    console.log("Removing Code ID:", codeId);
    remove(index);
    removeFromSubjects(codeId);
  };

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
                onClick={handleAddItem}
                disabled={selectedCodes.length === 0 && selectedCodesData?.length === 0}
              >
                Save Selection
              </Button>
              </Stack>
            </Stack>
            <Stack gap={4}>
            {selectedCodesData?.map((field, index) => (
              <Fragment key={field.id}>
                <DetailsForm
                  key={field.id}
                  handleRemoveItem={() => hanldeRemoveFromSubjects(field.id, index)}
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
          {confirmationNeeded && (
            <CustomizedDialogs
              modalTitle="Confirm Removal"
              modalContent="Removing the subject will also delete its keywords. Are you sure you want to remove it?"
              alertOpen={confirmationNeeded}
              onClose={() => {}}
              modalAction={true}
              modalActions={[
            {
              label: "Cancel",
              onClick: () => setConfirmationNeeded(false),
              icon: Delete,
              bgColor: "primary.main",
            },
            {
              label: "Yes",  
              onClick: () => {
                handleRemoveSelection();
                setConfirmationNeeded(false);
              },
              icon: Check,
              bgColor: "error.main",
            }
          ]}
          />)}
        </Stack>
      </CardContent>
    </Card>
  );
}