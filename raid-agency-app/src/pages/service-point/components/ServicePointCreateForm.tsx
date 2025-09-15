import { useKeycloak } from "@/contexts/keycloak-context";
import { createServicePoint } from "@/services/service-points";
import { CreateServicePointRequest } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  Switch,
  Tabs,
  TextField,
  Typography,
  Tab,
  Stack,
  Paper,
  styled,
  Divider
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { useSnackbar } from "@/components/snackbar";
import { messages } from "@/constants/messages";
import { Building2, Settings, User, SquarePen } from "lucide-react";

export const ServicePointCreateForm = () => {
  const queryClient = useQueryClient();
  const { token } = useKeycloak();
  const snackbar = useSnackbar();

  const initalServicePointValues: CreateServicePointRequest = {
    servicePointCreateRequest: {
      name: "",
      identifierOwner: "",
      adminEmail: "",
      techEmail: "",
      enabled: false,
      password: "",
      prefix: "",
      repositoryId: "",
      appWritesEnabled: false,
      groupId: "",
    },
  };

  const createServicePointRequestValidationSchema = z.object({
    servicePointCreateRequest: z.object({
      name: z.string().min(3),
      identifierOwner: z.string(),
      adminEmail: z.string(),
      techEmail: z.string(),
      enabled: z.boolean(),
      password: z.string().min(8),
      prefix: z.string(),
      repositoryId: z.string(),
      appWritesEnabled: z.boolean(),
      groupId: z.string(),
    }),
  });

  const form = useForm<CreateServicePointRequest>({
    resolver: zodResolver(createServicePointRequestValidationSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: { ...initalServicePointValues },
  });

  const handleCreateSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["servicePoints"] });
    form.reset();
    // Show success snackbar
    snackbar.openSnackbar(messages.servicePointCreated, 3000, "success");
  };

  const handleCreateError = (error: Error) => {
    console.log("error", error);
  };

  const createServicePointHandler = async (
    servicePoint: CreateServicePointRequest
  ) => {
    createServicePoint({
      data: {
        servicePointCreateRequest: servicePoint.servicePointCreateRequest,
      },
      token: token!,
    });
  };

  const createServicePointMutation = useMutation({
    mutationFn: createServicePointHandler,
    onError: handleCreateError,
    onSuccess: handleCreateSuccess,
  });

  const onSubmit = (item: CreateServicePointRequest) => {
    createServicePointMutation.mutate(item);
  };

  const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme?.palette.text.secondary,
  flexGrow: 1,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
  boxShadow: 'none',
}));

  return (
    <>
      <Accordion
        disableGutters={true}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <SquarePen /><Typography sx={{ml: 1}}component="span">Create Service Point</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
              <Box sx={{ mb: 2, pb: 2, borderBottom: 1, borderColor: 'divider' }}>
                <Controller
                  name="servicePointCreateRequest.name"
                  control={form.control}
                  render={({ field }) => (
                    <TextField
                      error={
                        !!form.formState.errors?.servicePointCreateRequest?.name
                      }
                      helperText={
                        form.formState.errors?.servicePointCreateRequest?.name
                          ?.message
                      }
                      label="Service point name"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...field}
                      value={field.value}
                    />
                  )}
                />
              </Box>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                sx={{
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  mb: 3,
                }}
                divider={<Divider orientation="vertical" flexItem />}
              >
                <Item>
                  <Tabs
                    value={"one"}
                    textColor="secondary"
                    indicatorColor="secondary"
                    aria-label="secondary tabs example"
                  >
                    <Tab
                      value="one"
                      label={<Typography variant="body2">Service Point Owner</Typography>}
                      iconPosition="start"
                      icon={<User fontSize="small" />}
                      sx={{ minHeight: "40px" }}
                    />
                  </Tabs>
                    <Box>
                    <Stack
                      spacing={{ xs: 1, sm: 2 }}
                      direction="column"
                      useFlexGap
                      sx={{ mt: 2 }}
                    >
                      <div>
                        <Controller
                          name="servicePointCreateRequest.identifierOwner"
                          control={form.control}
                          render={({ field }) => (
                            <TextField
                              label="Identifier Owner"
                              variant="outlined"
                              helperText="ROR Identifier. e.g. https://ror.org/038sjwq14"
                              size="small"
                              fullWidth
                              {...field}
                              value={field.value}
                              error={
                                !!form.formState.errors?.servicePointCreateRequest
                                  ?.identifierOwner
                              }
                            />
                          )}
                        />
                      </div>
                      <div >
                        <Controller
                          name="servicePointCreateRequest.adminEmail"
                          control={form.control}
                          render={({ field }) => (
                            <TextField
                              label="Admin email"
                              variant="outlined"
                              size="small"
                              fullWidth
                              {...field}
                              value={field.value}
                              error={
                                !!form.formState.errors?.servicePointCreateRequest
                                  ?.adminEmail
                              }
                            />
                          )}
                        />
                      </div>
                      <div >
                        <Controller
                          name="servicePointCreateRequest.techEmail"
                          control={form.control}
                          render={({ field }) => (
                            <TextField
                              label="Tech email"
                              variant="outlined"
                              size="small"
                              fullWidth
                              {...field}
                              value={field.value}
                              error={
                                !!form.formState.errors?.servicePointCreateRequest
                                  ?.techEmail
                              }
                            />
                          )}
                        />
                      </div>
                    </Stack>
                  </Box>
                </Item>
                <Item>
                  <Tabs
                    value={"two"}
                    textColor="secondary"
                    indicatorColor="secondary"
                    aria-label="secondary tabs example"
                  >
                    <Tab
                      value="two"
                      label={<Typography variant="body2">DataCite repository</Typography>}
                      iconPosition="start"
                      icon={<Building2 fontSize="small" />}
                      sx={{ minHeight: "40px" }}
                    />
                  </Tabs>
                  <Box>
                  <Stack
                    spacing={{ xs: 1, sm: 2 }}
                    direction="column"
                    useFlexGap
                    sx={{ mt: 2 }}
                  >
                    <div>
                      <Controller
                        name="servicePointCreateRequest.repositoryId"
                        control={form.control}
                        render={({ field }) => (
                          <TextField
                            label="Repository ID"
                            variant="outlined"
                            size="small"
                            fullWidth
                            {...field}
                            value={field.value}
                            error={
                              !!form.formState.errors?.servicePointCreateRequest
                                ?.repositoryId
                            }
                          />
                        )}
                      />
                    </div>
                    <div >
                      <Controller
                        name="servicePointCreateRequest.prefix"
                        control={form.control}
                        render={({ field }) => (
                          <TextField
                            label="Prefix"
                            variant="outlined"
                            size="small"
                            fullWidth
                            {...field}
                            value={field.value}
                            error={
                              !!form.formState.errors?.servicePointCreateRequest?.prefix
                            }
                          />
                        )}
                      />
                    </div>
                    <div >
                      <Controller
                        name="servicePointCreateRequest.password"
                        control={form.control}
                        render={({ field }) => (
                          <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            size="small"
                            fullWidth
                            {...field}
                            value={field.value}
                            error={
                              !!form.formState.errors?.servicePointCreateRequest
                                ?.password
                            }
                            helperText={
                              form.formState.errors?.servicePointCreateRequest?.password
                                ?.message
                            }
                          />
                        )}
                      />
                    </div>
                  </Stack>
                  </Box>
                </Item>
              </Stack>
              <Item>
                <Tabs
                  value={"three"}
                  textColor="secondary"
                  indicatorColor="secondary"
                  aria-label="secondary tabs example"
                >
                  <Tab
                    value="three"
                    label={<Typography variant="body2">Settings</Typography>}
                    iconPosition="start"
                    icon={<Settings fontSize="small" />}
                    sx={{ minHeight: "40px" }}
                  />
                </Tabs>
                <Stack
                  direction="row"
                  spacing={3}
                  sx={{ mb: 1 }}
                >
                  <Item>
                    <Controller
                      name="servicePointCreateRequest.enabled"
                      control={form.control}
                      render={({ field }) => (
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Switch {...field} defaultChecked={!!field.value} />
                            }
                            label="Enable service point?"
                          />
                        </FormGroup>
                      )}
                    />
                  </Item>
                  <Item>
                    <Controller
                      name="servicePointCreateRequest.appWritesEnabled"
                      control={form.control}
                      render={({ field }) => (
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Switch {...field} defaultChecked={!!field.value} />
                            }
                            label="Enable minting and editing RAiDs using web app?"
                          />
                        </FormGroup>
                      )}
                    />
                  </Item>
                </Stack>
              </Item>
              <Button
                variant="outlined"
                type="submit"
                sx={{ mt: 3 }}
                disabled={Object.keys(form.formState.errors).length > 0}
              >
                <SquarePen />{" "} Create
              </Button>
            </form>
          </FormProvider>
        </AccordionDetails>
      </Accordion>
    </>
  );
};
