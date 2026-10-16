import type { Request, Response } from "express";
import { login, signUp } from "./service.ts";
import { httpStatus } from "../../utils/htttpStatus.ts";

export const register = async (req: Request, res: Response) => {
  const result = await signUp(req.body);
  res.status(201).json({
    status: httpStatus.SUCCESS,
    message: "User registered successfully",
    ...result,
  });
};

export const signin = async (req: Request, res: Response) => {
  const result = await login(req.body);
  res.status(200).json({
    status: httpStatus.SUCCESS,
    message: "Logged in successfully",
    ...result,
  });
};
