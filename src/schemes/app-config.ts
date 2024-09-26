import { z } from "zod";

export const appConfigScheme = z.object({
  url: z.string().url().optional(),
  icon: z.string().optional()
}).strict()