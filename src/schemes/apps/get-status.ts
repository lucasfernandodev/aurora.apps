import { z } from "zod";

export const getStatusScheme = z.object({
  app: z.string().max(32)
})