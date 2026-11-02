import type { RequestHandler } from "express";
import type { UserRole } from "../generated/prisma/enums.ts";
import { AppError } from "../utils/AppError.ts";

export const requireRole =
  (...roles: UserRole[]): RequestHandler =>
  (req, _res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw new AppError("Forbidden", 403);
    }
    next();
  };
