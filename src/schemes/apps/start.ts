import { z } from "zod";

export const startAppSCheme = z.object({
  app: z.string()
})