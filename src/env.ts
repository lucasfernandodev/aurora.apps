import { z } from "zod";
const env_schema = z.object({
  PORT: z.string(),
  COMPOSE_FOLDER: z.string()
})

export const env = env_schema.parse({
  PORT: process.env.PORT,
  COMPOSE_FOLDER: process.env.COMPOSE_FOLDER
})