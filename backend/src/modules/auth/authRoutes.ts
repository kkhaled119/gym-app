import express from "express";
import { register, signin } from "./authController.ts";

import { loginSchema, signupSchema } from "./authSchema.ts";
import { validate } from "../../middlewares/validate.ts";

const router = express.Router();

router.post("/login", validate(loginSchema), signin);

router.post("/register", validate(signupSchema), register);

export default router;
