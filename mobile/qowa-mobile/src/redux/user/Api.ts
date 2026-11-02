import { api } from "@/lib/Api";
import { updateUser } from "./model";

const login = (date: { email: string; password: string }) => api.post("auth/login", date);

const signUp = (data: { firstName: string; lastName: string; email: string; password: string }) =>
  api.post("auth/register", data);

const getMe = () => api.get("users/me");

const updateMe = (data?: updateUser) => api.patch("users/me", data);
const completeOnboarding = () => api.post("users/me/onboarding/complete");

export const UserAPI = {
  login,
  signUp,
  getMe,
  updateMe,
  completeOnboarding,
};
