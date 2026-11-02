import { z } from "zod";

export const updateUserSchema = z
  .object({
    firstName: z.string().trim().min(1).max(50),
    lastName: z.string().trim().min(1).max(50),
    birthDate: z.coerce.date().max(new Date(), "Birth date can't be in the future"),
    gender: z.enum(["MALE", "FEMALE"]),
    height: z.number().min(50).max(272),
    weightUnit: z.enum(["KG", "LB"]),
    avatarUrl: z.url(),
  })
  .partial()
  .strict();

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
