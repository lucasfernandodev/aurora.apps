import { errorHandle } from "@errors/ErrorHandle";
import type { BaseError } from "@errors/baseError";
import type { NextFunction, Request, Response } from "express";

export const errorMiddleware = async (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (errorHandle.isTrustedError(err)) {
    const { httpCode, message } = err as BaseError
    return res.status(httpCode).json({
      success: false,
      msg: message,
    });
  }

  await errorHandle.handleError(err)
};