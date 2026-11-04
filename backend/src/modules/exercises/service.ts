import type { Prisma } from "../../generated/prisma/client.ts";
import { prisma } from "../../lib/prisma.ts";
import { AppError } from "../../utils/AppError.ts";
import type { CreateExerciseInput } from "./exercisesSchema.ts";
import type { getTypeExercises } from "./model.ts";

export const getAllExercises = async ({
  userId,
  page = 1,
  limit = 20,
  search,
  muscle,
  mine,
}: getTypeExercises) => {
  const where: Prisma.ExerciseWhereInput = {
    ...(mine ? { userId } : { OR: [{ userId: null }, { userId }] }),
    ...(search && { name: { contains: search, mode: "insensitive" } }),
    ...(muscle && { primaryMuscles: { has: muscle } }),
  };

  const [exercises, total] = await Promise.all([
    prisma.exercise.findMany({
      where,
      omit: { externalId: true },
      orderBy: { name: "asc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.exercise.count({ where }),
  ]);

  return { exercises, total, page, limit };
};

export const getExerciseById = async (exerciseId: string, userId: string) => {
  const exercise = await prisma.exercise.findUnique({
    where: {
      id: exerciseId,
      OR: [{ userId: null }, { userId }],
    },
    omit: { externalId: true },
  });
  if (!exercise) {
    throw new AppError("Exercise not found", 404);
  }
  return exercise;
};

export const createExercise = async (userId: string, data: CreateExerciseInput) => {
  const exercise = await prisma.exercise.create({
    data: { ...data, userId },
    omit: { externalId: true },
  });
  return exercise;
};
