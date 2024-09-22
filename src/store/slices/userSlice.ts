import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../types";

type AuthStateType =  {
  isAuth: boolean;
  token: string|null;
  user: UserType|null;
}

const initialState: AuthStateType = {
  isAuth: false,
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthStateType>) => {
      if (action.payload.isAuth) {
        state.isAuth = action.payload.isAuth;
        state.token = action.payload.token;
        state.user = action.payload.user;
      } else {
        state.isAuth = false;
        state.token = null;
        state.user = null;
      }
    },
  },
});

export const { setAuth } = authSlice.actions;
export const authReducer = authSlice.reducer;