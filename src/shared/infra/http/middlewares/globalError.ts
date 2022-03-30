import { AppError } from "@shared/errors/AppError";
import { Request, Response, NextFunction } from "express";

export function globalError(
  err: Error,
  request: Request,
  response: Response,
  _: NextFunction
) {
  console.log(err);

  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
    messageError: err.message,
  });
}
