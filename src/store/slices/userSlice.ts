import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CourseType, UserType } from "../../types";

type AuthStateType = {
  isAuth: boolean;
  token: string | null;
  user: UserType | null;
};

const initialState: AuthStateType = {
  isAuth: localStorage.user ? true : false,
  token: null,
  user: localStorage.user ? JSON.parse(localStorage.getItem("user") as string) : null,
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
        if (action.payload.user?._id) {
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        }
      } else {
        state.isAuth = false;
        state.token = null;
        state.user = null;
        localStorage.removeItem("user");
      }
    },
    addCourseToUser: (state, action: PayloadAction<CourseType>) => {
      if (state.user) {
        state.user.courses = [...(state.user.courses || []), action.payload];
      } else {
        console.error("Пользователь не инициализирован");
      }
    },
    removeCourseFromUser: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.courses = state.user.courses.filter(
          (course) => course._id !== action.payload
        );
      }
    },
  },
});

export const { setAuth, addCourseToUser, removeCourseFromUser } =
  authSlice.actions;
export const authReducer = authSlice.reducer;
