import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserAPI } from "./Api";
import { tokenStorage } from "@/lib/tokenStorage";
import type { LoginBody, SignupBody, updateUser, User } from "./model";

export const doLogin = createAsyncThunk<User, LoginBody, { rejectValue: string }>(
  "user/login",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await UserAPI.login(body);
      await tokenStorage.save(data.accessToken, data.refreshToken);
      return data.user;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message ?? "Something went wrong");
    }
  },
);

export const doSignUp = createAsyncThunk<User, SignupBody, { rejectValue: string }>(
  "user/signUp",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await UserAPI.signUp(body);
      await tokenStorage.save(data.accessToken, data.refreshToken);
      return data.user;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message ?? "Something went wrong");
    }
  },
);

export const doGetMe = createAsyncThunk<any, any, any>(
  "user/me",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await UserAPI.getMe();
      return data.user;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message ?? "Something went wrong");
    }
  },
);

export const doUpdateMe = createAsyncThunk<User, updateUser, { rejectValue: string }>(
  "user/update",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await UserAPI.updateMe(body);
      return data.user;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message ?? "Something went wrong");
    }
  },
);

export const doCompleteOnboarding = createAsyncThunk<User, void, { rejectValue: string }>(
  "user/completeOnboarding",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await UserAPI.completeOnboarding();
      return data.user;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message ?? "Something went wrong");
    }
  },
);
const thunks = { doLogin, doSignUp, doGetMe, doUpdateMe, doCompleteOnboarding };
export default thunks;
