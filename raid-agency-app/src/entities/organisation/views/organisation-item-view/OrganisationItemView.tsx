import { DisplayItem } from "@/components/display-item";
import { OrganisationRoleItemView } from "@/entities/organisation-role/views/organisations-role-item-view";
import type { Organisation } from "@/generated/raid";
import { Divider, Grid, Stack, Typography } from "@mui/material";
import { memo } from "react";

const OrganisationItemView = memo(
  ({
    i,
    organisation,
    organisationName,
  }: {
    i: number;
    organisation: Organisation;
    organisationName?: string | null;
  }) => {
    return (
      <Stack gap={2}>
        <Typography variant="subtitle2">
          {organisationName ? organisationName : `Organisation #{${i + 1}}`}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <DisplayItem
              label="Organisation ID"
              value={organisation.id}
              width={6}
              link={organisation.id}
            />
          </Grid>
        </Grid>
        <Stack sx={{ pl: 3 }} gap={1}>
          <Stack direction="row" alignItems="baseline">
            <Typography variant="body1" sx={{ mr: 0.5 }}>
              Roles
            </Typography>
            <Typography variant="caption" color="text.disabled">
              {organisationName ? organisationName : `Organisation #{${i + 1}}`}
            </Typography>
          </Stack>
          <Stack gap={2} divider={<Divider />}>
            {organisation.role.map((role, i) => (
              <OrganisationRoleItemView
                key={`${organisation.id}-${role.id}-${i}` || i}
                item={role}
              />
            ))}
          </Stack>
        </Stack>
      </Stack>
    );
  }
);

OrganisationItemView.displayName = "OrganisationItemView";

export { OrganisationItemView };
