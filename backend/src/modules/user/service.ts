import { th } from "zod/locales";
import { prisma } from "../../lib/prisma.ts";
import { AppError } from "../../utils/AppError.ts";
import type { UpdateUserInput, updateUserSchema } from "./userSchema.ts";

export const getAllUsers = async (page = 1, limit = 20) => {
  const [users, total] = await Promise.all([
    prisma.user.findMany({
      omit: { passwordHash: true },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.user.count(),
  ]);

  return { users, total, page, limit };
};

export const getUserById = async (userId: string) => {
  const getUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    omit: { passwordHash: true },
  });
  if (!getUser) {
    throw new AppError("User Not Found", 404);
  }
  return getUser;
};

export const updateUser = async (userId: string, data: UpdateUserInput) => {
  return prisma.user.update({
    where: { id: userId },
    data,
    omit: { passwordHash: true },
  });
};

export const completeOnboarding = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!user?.gender || !user?.birthDate || !user?.height) {
    throw new AppError("User has not completed onboarding", 400);
  }
  return prisma.user.update({
    where: { id: userId },
    data: { onboardedAt: user.onboardedAt ?? new Date() },
    omit: { passwordHash: true },
  });
};
