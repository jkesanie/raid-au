import { z } from "zod";

const raidUrlSchema = z
  .string()
  .url()
  .regex(/^https:\/\/raid\.org\/[^\/]+\/[^\/]+$/, {
    message: "URL must follow format: https://raid.org/<prefix>/<suffix>",
  });
export const relatedRaidValidationSchema = z.array(
  z.object({
    id: raidUrlSchema,
    type: z.object({
      id: z.string(),
      schemaUri: z.string(),
    }),
  })
);
