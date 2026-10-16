import express from "express";
import { logout, register, signin } from "./authController.ts";

import { loginSchema, logoutSchema, signupSchema } from "./authSchema.ts";
import { validate } from "../../middlewares/validate.ts";

const router = express.Router();

router.post("/login", validate(loginSchema), signin);

router.post("/register", validate(signupSchema), register);
router.post("/logout", validate(logoutSchema), logout);

export default router;
