export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  type: "TRAINEE" | "COACH" | "ADMIN";
  birthDate: string | null;
  gender: "MALE" | "FEMALE" | null;
  height: string | null;
  weightUnit: "KG" | "LB";
  avatarUrl: string | null;
  onboardedAt: string | null;
};

export type updateUser = {
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  gender?: "MALE" | "FEMALE";
  height?: number;
  weightUnit?: "KG" | "LB";
  avatarUrl?: string;
};
export type LoginBody = {
  email: string;
  password: string;
};

export type SignupBody = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type AuthResponse = {
  status: string;
  message: string;
  user: User;
  accessToken: string;
  refreshToken: string;
};

export type UserState = {
  currentUser: User | null;
  status: "idle" | "loading" | "failed";
  error: string | null;
};
