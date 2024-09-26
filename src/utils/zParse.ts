import { HTTP400Error } from "@errors/BadRequest";
import type {Request} from 'express'
import type { AnyZodObject, ZodError, z } from "zod";
import { fromZodError } from "zod-validation-error";

export async function zParse<T extends AnyZodObject>(
  schema: T,
  req: Request,
  RequestDataUsedType: 'body' | 'params' | 'query' = 'body'
): Promise<z.infer<T>> {
  try {
    return await schema.parseAsync(req[RequestDataUsedType]);
  } catch (error) {
    throw new HTTP400Error(fromZodError(error as ZodError).toString())
  }
}