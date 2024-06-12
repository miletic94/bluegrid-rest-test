import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export function globalErrorHandler(
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // TODO: Handle statuses better. Rethink error response structure

  res.status(500).json(err);
}
