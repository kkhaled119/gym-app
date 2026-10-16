import type { ErrorRequestHandler } from "express";
import { AppError } from "../utils/AppError.ts";
export const errorHandler = (err: any, req: any, res: any, next: any) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  console.error(err);
  return res.status(500).json({ message: "Internal Server Error" });
};
