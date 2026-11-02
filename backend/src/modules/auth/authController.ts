import type { Request, Response } from "express";
import { login, logoutUser, refreshTokens, signUp } from "./service.ts";
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

export const refresh = async (req: Request, res: Response) => {
  const tokens = await refreshTokens(req.body.refreshToken);
  res.status(200).json({
    status: httpStatus.SUCCESS,
    ...tokens,
  });
};

export const logout = async (req: Request, res: Response) => {
  await logoutUser(req.body.refreshToken);
  res.status(200).json({
    status: httpStatus.SUCCESS,
    message: "Logged out successfully",
  });
};
