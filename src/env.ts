import { z } from "zod";
const env_schema = z.object({
  PORT: z.string(),
})

export const env = env_schema.parse({
  PORT: process.env.PORT,
})