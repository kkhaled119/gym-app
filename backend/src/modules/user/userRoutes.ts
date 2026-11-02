import express from "express";
import { getAllUsers } from "./service.ts";
import { completeMyOnboarding, getMe, getUsers, updateMe } from "./userController.ts";
import { requireAuth } from "../../middlewares/auth.ts";
import { requireRole } from "../../middlewares/requireRole.ts";
import { validate } from "../../middlewares/validate.ts";
import { updateUserSchema } from "./userSchema.ts";

const router = express.Router();

router.get("/", requireAuth, requireRole("ADMIN"), getUsers);

router.get("/me", requireAuth, getMe);
router.patch("/me", requireAuth, validate(updateUserSchema), updateMe);
router.post("/me/onboarding/complete", requireAuth, completeMyOnboarding);

export default router;
