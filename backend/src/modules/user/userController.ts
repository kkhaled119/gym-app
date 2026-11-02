import type { Request, Response } from "express";
import { completeOnboarding, getAllUsers, getUserById, updateUser } from "./service.ts";
import { httpStatus } from "../../utils/htttpStatus.ts";

export const getMe = async (req: Request<{ id: string }>, res: Response) => {
  const user = await getUserById(req.user!.id);
  res.status(200).json({ status: httpStatus.SUCCESS, user });
};

export const getUser = async (req: Request<{ id: string }>, res: Response) => {
  const user = await getUserById(req.params.id);
  res.status(200).json({ status: httpStatus.SUCCESS, user });
};

export const getUsers = async (_req: Request, res: Response) => {
  const result = await getAllUsers();
  res.status(200).json({ status: httpStatus.SUCCESS, ...result });
};

export const updateMe = async (req: Request, res: Response) => {
  const user = await updateUser(req.user!.id, req.body);
  res.status(200).json({
    status: httpStatus.SUCCESS,
    message: "Profile update successfully",
    user,
  });
};
export const completeMyOnboarding = async (req: Request, res: Response) => {
  const user = await completeOnboarding(req.user!.id);
  res
    .status(200)
    .json({ status: httpStatus.SUCCESS, message: "Onboarding completed successfully", user });
};
