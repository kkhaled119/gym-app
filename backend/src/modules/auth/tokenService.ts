import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import { prisma } from "../../lib/prisma.ts";
import type { User } from "../../generated/prisma/client.ts";

const ACCESS_TOKEN_EXPIRES_IN = "15m";

const REFRESH_TOKEN_DAYS = 30;

export const hashToken = (token: string) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

export const createTokens = async (user: Pick<User, "id" | "type">) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  const accessToken = jwt.sign({ sub: user.id, role: user.type }, secret, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });

  const refreshToken = crypto.randomBytes(64).toString("hex");
  const expiresAt = new Date(Date.now() + REFRESH_TOKEN_DAYS * 24 * 60 * 60 * 1000);

  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      tokenHash: hashToken(refreshToken),
      expiresAt,
    },
  });

  return { accessToken, refreshToken };
};
