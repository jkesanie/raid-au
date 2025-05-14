import organisationRole from "@/references/organisation_role.json";
import organisationRoleSchema from "@/references/organisation_role_schema.json";
import { combinedPattern } from "@/utils/date-utils/date-utils";
import { z } from "zod";

console.log('Schema version: FIXED-20240514');

export const organisationRoleValidationSchema = z.array(
    z.object({
            id: z.enum(
                organisationRole.map((role) => role.uri) as [string, ...string[]]
            ),
            schemaUri: z.literal(organisationRoleSchema[0].uri),

            startDate: z.string().transform(val => val === '' ? undefined : val)
                .pipe(z.string().regex(combinedPattern)),
            endDate: z.string().optional(),
            // endDate: z.string().transform(val => val === '' ? undefined : val)
            //     .pipe(z.string().regex(combinedPattern)).optional()

    })
);
