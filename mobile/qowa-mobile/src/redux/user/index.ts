import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { UserState, User } from "./model";
import { doCompleteOnboarding, doGetMe, doLogin, doSignUp, doUpdateMe } from "./thunk";

const initialState: UserState = {
  currentUser: null,
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.status = "idle";
      state.error = null;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(doLogin.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(doLogin.fulfilled, (state, action) => {
        state.status = "idle";
        state.currentUser = action.payload;
      })
      .addCase(doLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Something went wrong";
      })

      .addCase(doSignUp.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(doSignUp.fulfilled, (state, action) => {
        state.status = "idle";
        state.currentUser = action.payload;
      })
      .addCase(doSignUp.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Something went wrong";
      })

      .addCase(doGetMe.pending, (state) => {
        state.status = "loading";
      })
      .addCase(doGetMe.fulfilled, (state, action) => {
        state.status = "idle";
        state.currentUser = action.payload;
      })
      .addCase(doGetMe.rejected, (state) => {
        state.status = "failed";
        state.currentUser = null;
      })

      .addCase(doUpdateMe.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(doUpdateMe.fulfilled, (state, action) => {
        state.status = "idle";
        state.currentUser = action.payload;
      })
      .addCase(doUpdateMe.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Something went wrong";
      })
      .addCase(doCompleteOnboarding.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(doCompleteOnboarding.fulfilled, (state, action) => {
        state.status = "idle";
        state.currentUser = action.payload;
      })
      .addCase(doCompleteOnboarding.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Something went wrong";
      });
  },
});

export const { logout, setUser } = userSlice.actions;

export const selectCurrentUser = (state: RootState) => state.user.currentUser;
export const selectUserStatus = (state: RootState) => state.user.status;
export const selectUserError = (state: RootState) => state.user.error;

export default userSlice.reducer;
