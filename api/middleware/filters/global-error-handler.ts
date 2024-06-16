import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export function globalErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Log the error for debugging purposes
  console.error("Global error handler caught an error:", err);

  // Default status and message
  let status = 500;
  let message = "Internal Server Error";

  // Customize error response based on error type or status
  if (err instanceof Error) {
    message = err.message;
  } else if (typeof err === "string") {
    message = err;
  }

  // Set appropriate status and send structured error response
  res.status(status).json({ error: message });
}
