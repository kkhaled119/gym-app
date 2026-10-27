import { prisma } from "../../lib/prisma.ts";
import type { LoginInput, logoutInput, SignupInput } from "./authSchema.ts";
import bcrypt from "bcrypt";
import { AppError } from "../../utils/AppError.ts";
import { createTokens, hashToken } from "./tokenService.ts";

export const signUp = async (data: SignupInput) => {
  const findUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });
  if (findUser) {
    throw new AppError("User already exists", 409);
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const newUser = await prisma.user.create({
    data: {
      email: data.email,
      passwordHash: hashedPassword,
      firstName: data.firstName,
      lastName: data.lastName,
    },
    omit: {
      passwordHash: true,
    },
  });

  const tokens = await createTokens(newUser);

  return { user: newUser, ...tokens };
};

export const login = async (data: LoginInput) => {
  const findUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!findUser || !findUser.passwordHash) {
    throw new AppError("Incorrect email or password", 401);
  }

  const isPasswordValid = await bcrypt.compare(data.password, findUser.passwordHash);

  if (!isPasswordValid) {
    throw new AppError("Incorrect email or password", 401);
  }

  const { passwordHash: _passwordHash, ...user } = findUser;

  const tokens = await createTokens(user);

  return { user, ...tokens };
};

export const logoutUser = async (refreshToken: string) => {
  await prisma.refreshToken.updateMany({
    where: {
      tokenHash: hashToken(refreshToken),
      revokedAt: null,
    },
    data: { revokedAt: new Date() },
  });
};

export const refreshTokens = async (refreshToken: string) => {
  const stored = await prisma.refreshToken.findUnique({
    where: { tokenHash: hashToken(refreshToken) },
    include: { user: { select: { id: true, type: true } } },
  });

  if (!stored || stored.revokedAt || stored.expiresAt < new Date()) {
    throw new AppError("Invalid or expired refresh token", 401);
  }

  await prisma.refreshToken.update({
    where: { id: stored.id },
    data: { revokedAt: new Date() },
  });

  return createTokens(stored.user);
};
