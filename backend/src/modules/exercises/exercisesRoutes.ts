import express from "express";
import { addExercise, getExerciseId, getExercises } from "./exercisesController.ts";
import { requireAuth } from "../../middlewares/auth.ts";

import { createExerciseSchema } from "./exercisesSchema.ts";
import { validate } from "../../middlewares/validate.ts";

const router = express.Router();

router.get("/", requireAuth, getExercises);

router.get("/:id", requireAuth, getExerciseId);

router.post("/", requireAuth, validate(createExerciseSchema), addExercise);

export default router;
