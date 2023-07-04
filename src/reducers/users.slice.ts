import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AsyncThunk } from "@reduxjs/toolkit";
import { User } from "../types/user.type";
import { getLS } from "../utils";
import authApi from "./../apis/auth.api";

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
type RejectedAction = ReturnType<GenericAsyncThunk["rejected"]>;
type FulfilledAction = ReturnType<GenericAsyncThunk["fulfilled"]>;
interface UserState {
  loading: boolean;
  isAuthenticated: boolean;
  // access_token: string;
  // refresh_token: string;
  // expires: string;
  // expires_refresh_token: string;
  user: User | null;
}

const initialState: UserState = {
  loading: true,
  isAuthenticated: Boolean(getLS("access_token")),
  // access_token: "",
  // refresh_token: "",
  // expires: "",
  // expires_refresh_token: "",
  user: null,
};
export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (body: { email: string; password: string }, thunkApi) => {
    try {
      const response = await authApi.registerAccount(body);
      return response.data;
    } catch (err: any) {
      if (err.name === "AxiosError" && err.response.status === 422) {
        return thunkApi.rejectWithValue(err.response.data);
      }
      throw err;
    }
  }
);
export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (body: { email: string; password: string }, thunkApi) => {
    try {
      const response = await authApi.loginAccount(body);
      //setLS("access_token", response.data.data.access_token);
      return response.data;
    } catch (err: any) {
      if (err.name === "AxiosError" && err.response.status === 422) {
        return thunkApi.rejectWithValue(err.response.data);
      }
      throw err;
    }
  }
);

export const logoutUser = createAsyncThunk(
  "users/logoutUser",
  async (_, thunkApi) => {
    try {
      const response = await authApi.logoutAccount();
      //setLS("access_token", response.data.data.access_token);
      return response.data;
    } catch (err: any) {
      if (err.name === "AxiosError" && err.response.status === 422) {
        return thunkApi.rejectWithValue(err.response.data);
      }
      throw err;
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // logoutUser: (state) => {
    //   //clearLS("access_token");
    //   state.isAuthenticated = false;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload.data.user;
        }
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload.data.user;
        }
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = null;
        }
        state.isAuthenticated = false;
        state.loading = false;
      })

      .addMatcher<PendingAction>(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher<RejectedAction | FulfilledAction>(
        (action) =>
          action.type.endsWith("/rejected") ||
          action.type.endsWith("/fulfilled"),
        (state) => {
          state.loading = false;
        }
      );
  },
});

//export const { logoutUser } = counterSlice.actions;
const usersReducer = userSlice.reducer;
export default usersReducer;
