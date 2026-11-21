import { z } from "zod";

export const createExerciseSchema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(80),
  primaryMuscles: z.array(z.string().trim().min(1)).min(1, "Choose at least one muscle"),
  secondaryMuscles: z.array(z.string().trim().min(1)).default([]),
  equipment: z.string().trim().max(40).optional(),
  category: z.string().trim().max(40).optional(),
});

export type CreateExerciseInput = z.infer<typeof createExerciseSchema>;
