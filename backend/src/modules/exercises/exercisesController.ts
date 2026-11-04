import type strict from "node:assert/strict";
import { httpStatus } from "../../utils/htttpStatus.ts";
import { createExercise, getAllExercises, getExerciseById } from "./service.ts";
import type { Request, Response } from "express";

export const getExercises = async (req: Request, res: Response) => {
  const mine = req.query.mine === "true";
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(req.query.limit) || 20, 1), 100);
  const search = typeof req.query.search === "string" ? req.query.search.trim() : undefined;
  const muscle = typeof req.query.muscle === "string" ? req.query.muscle : undefined;
  const result = await getAllExercises({ userId: req.user!.id, page, limit, search, muscle, mine });
  res.status(200).json({ status: httpStatus.SUCCESS, ...result });
};

export const getExerciseId = async (req: Request<{ id: string }>, res: Response) => {
  const exercise = await getExerciseById(req.params.id, req.user!.id);
  res.status(200).json({ status: httpStatus.SUCCESS, exercise });
};

export const addExercise = async (req: Request, res: Response) => {
  const exercise = await createExercise(req.user!.id, req.body);
  res.status(201).json({ status: httpStatus.SUCCESS, exercise });
};
