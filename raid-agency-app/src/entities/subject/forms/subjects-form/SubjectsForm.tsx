import React from "react";
import { subjectDataGenerator } from "@/entities/subject/data-generator/subject-data-generator";
import { RaidDto } from "@/generated/raid";
import { AddBox, Spa } from "@mui/icons-material";
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
import { Search } from "lucide-react";
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
  const errorMessage = errors[key]?.message;
  const {
    codesData,
    setCodesData,
    subjectType,
    setSubjectType,
    getSubjectTypes,
    setSearchQuery,
    searchQuery,
    filterCodesBySearch
  } = useCodesContext();

  const handleAddItem = () => {
    append(generator());
    trigger(key);
  };
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
  console.log("codesData in SubjectsForm:", codesData);
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
      <CardContent>
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
            <Stack gap={5} direction={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="space-between" >
              <DropDown
                label="Select Subject Type"
                options={subjectTypes || []}
                defaultValue={subjectType || ""}
                setValue={setSubjectType}
              />
              <CustomisedInputBase
                placeholder="Type to filter subjects..."
                searchValue={(searchValue) => {
                  setSearchQuery(searchValue);
                }}
                endEdorment={<Search size={16} />}
              />
            </Stack>
           
            <CustomizedTreeViewWithSelection/>
            {fields.map((field, index) => (
              <Fragment key={field.id}>
                <DetailsForm
                  key={field.id}
                  handleRemoveItem={() => remove(index)}
                  index={index}
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

      <CardActions>
        <Button
          variant="outlined"
          color="success"
          size="small"
          startIcon={<AddBox />}
          sx={{ textTransform: "none", mt: 3 }}
          onClick={handleAddItem}
          onMouseEnter={() => setIsRowHighlighted(true)}
          onMouseLeave={() => setIsRowHighlighted(false)}
        >
          Add {label}
        </Button>
      </CardActions>
    </Card>
  );
}
