import express from "express";
import { logout, refresh, register, signin } from "./authController.ts";

import { loginSchema, logoutSchema, refreshSchema, signupSchema } from "./authSchema.ts";
import { validate } from "../../middlewares/validate.ts";

const router = express.Router();

router.post("/login", validate(loginSchema), signin);
router.post("/register", validate(signupSchema), register);
router.post("/logout", validate(logoutSchema), logout);
router.post("/refresh", validate(refreshSchema), refresh);

export default router;
