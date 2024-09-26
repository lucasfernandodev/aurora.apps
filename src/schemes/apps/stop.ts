import { z } from "zod";

export const stopAppScheme = z.object({
  app: z.string()
})