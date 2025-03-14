import { AnchorButtons } from "@/components/anchor-buttons";
import { RaidValidationSchema } from "@/components/validation";
import { AccessFormComponent } from "@/entities/access/form-components/AccessFormComponent";
import { AlternateIdentifiersFormComponent } from "@/entities/alternate-identifier/form-components/AlternateIdentifiersFormComponent";
import { AlternateUrlsFormComponent } from "@/entities/alternate-url/form-components/AlternateUrlsFormComponent";
import { ContributorsFormComponent } from "@/entities/contributor/form-components/ContributorsFormComponent";
import { DateFormComponent } from "@/entities/date/form-components/DateFormComponent";
import { DescriptionsFormComponent } from "@/entities/description/form-components/DescriptionsFormComponent";
import { OrganisationsFormComponent } from "@/entities/organisation/form-components/OrganisationsFormComponent";
import { RelatedObjectsFormComponent } from "@/entities/related-object/form-components/RelatedObjectsFormComponent";
import { RelatedRaidsFormComponent } from "@/entities/related-raid/form-components/RelatedRaidsFormComponent";
import { SpatialCoveragesFormComponent } from "@/entities/spatial-coverage/form-components/SpatialCoveragesFormComponent";
import { SubjectsFormComponent } from "@/entities/subject/form-components/SubjectsFormComponent";
import { TitlesFormComponent } from "@/entities/title/form-components/TitlesFormComponent";
import { RaidCreateRequest, RaidDto } from "@/generated/raid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Close as CloseIcon, Save as SaveIcon } from "@mui/icons-material";
import { Fab, Stack, Tooltip } from "@mui/material";
import { memo, useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export const RaidForm = memo(
  ({
    raidData,
    onSubmit,
    isSubmitting,
    prefix,
    suffix,
  }: {
    raidData: RaidCreateRequest | RaidDto;
    onSubmit: (data: RaidDto) => void;
    isSubmitting: boolean;
    prefix: string;
    suffix: string;
  }) => {
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    const formMethods = useForm<RaidDto>({
      defaultValues: raidData,
      resolver: zodResolver(RaidValidationSchema),
      mode: "onChange",
      reValidateMode: "onChange",
    });

    const { control, trigger, formState } = formMethods;
    const isFormValid = Object.keys(formState.errors).length === 0;

    const handleSubmit = useCallback(
      (data: RaidDto) => {
        if (formState.errors) {
          console.log(formState.errors);
        }
        onSubmit(data);
      },
      [onSubmit]
    );

    useEffect(() => {
      if (isInitialLoad) {
        setIsInitialLoad(false);
      }
    }, [isInitialLoad]);

    return (
      <FormProvider {...formMethods}>
        <form
          onSubmit={formMethods.handleSubmit(handleSubmit)}
          autoComplete="off"
          noValidate
        >
          <Stack
            gap={2}
            sx={{
              position: "fixed",
              bottom: "16px",
              right: "16px",
              zIndex: 1000,
            }}
            alignItems="end"
          >
            <Tooltip title="Cancel" placement="left">
              <Fab
                component={Link}
                color="primary"
                size="small"
                to={
                  raidData?.identifier?.id ? `/raids/${prefix}/${suffix}` : "/"
                }
              >
                <CloseIcon />
              </Fab>
            </Tooltip>
            <Tooltip title="Save changes" placement="left">
              <Fab
                variant="extended"
                color="primary"
                component="button"
                type="submit"
                disabled={isSubmitting || !isFormValid}
                data-testid="save-raid-button"
              >
                <SaveIcon sx={{ mr: 1 }} />
                {isSubmitting ? "Saving..." : "Save"}
              </Fab>
            </Tooltip>
          </Stack>

          <Stack spacing={2} data-testid="raid-form">
            <AnchorButtons raidData={raidData} errors={formState.errors} />
            <Stack spacing={2}>
              <DateFormComponent
                control={control}
                errors={formState.errors}
                trigger={trigger}
              />

              <TitlesFormComponent
                control={control}
                errors={formState.errors}
                trigger={trigger}
              />

              <DescriptionsFormComponent
                control={control}
                errors={formState.errors}
                trigger={trigger}
              />

              <ContributorsFormComponent
                control={control}
                errors={formState.errors}
                trigger={trigger}
                data={raidData.contributor || []}
              />

              <OrganisationsFormComponent
                control={control}
                errors={formState.errors}
                trigger={trigger}
              />

              <RelatedObjectsFormComponent
                control={control}
                errors={formState.errors}
                trigger={trigger}
              />

              <AlternateIdentifiersFormComponent
                control={control}
                errors={formState.errors}
                trigger={trigger}
              />

              <AlternateUrlsFormComponent
                control={control}
                errors={formState.errors}
                trigger={trigger}
              />

              <RelatedRaidsFormComponent
                control={control}
                errors={formState.errors}
                trigger={trigger}
              />

              <AccessFormComponent
                control={control}
                errors={formState.errors}
                trigger={trigger}
              />

              <SubjectsFormComponent
                control={control}
                errors={formState.errors}
                trigger={trigger}
              />

              <SpatialCoveragesFormComponent
                control={control}
                errors={formState.errors}
                trigger={trigger}
              />
            </Stack>
          </Stack>
          <pre>{JSON.stringify(formState.errors, null, 2)}</pre>
        </form>
      </FormProvider>
    );
  }
);
