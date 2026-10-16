import type { RequestHandler } from "express";

import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError.ts";
import type { UserRole } from "../generated/prisma/enums.ts";

export const requireAuth: RequestHandler = (req, _res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    throw new AppError("Unauthorized", 401);
  }

  const token = header.slice(7);

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload & {
      role: UserRole;
    };
    req.user = { id: payload.sub!, role: payload.role };

    next();
  } catch {
    throw new AppError("Invalid or expired token", 401);
  }
};
