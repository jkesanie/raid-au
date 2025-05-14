import contributorPositionSchema from "@/references/contributor_position_schema.json";

import { combinedPattern } from "@/utils/date-utils/date-utils";
import { z } from "zod";

export const contributorPositionValidationSchema = z.array(
    z.object({
        id: z.string(),
        schemaUri: z.literal(contributorPositionSchema[0].uri),
        startDate: z.string().transform(val => val === '' ? undefined : val)
            .pipe(z.string().regex(combinedPattern)),
        endDate: z.string().transform(val => val === '' ? undefined : val).pipe(
            z.string().regex(combinedPattern)).optional()
    })
);
