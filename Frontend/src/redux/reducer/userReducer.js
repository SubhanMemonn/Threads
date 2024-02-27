import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: [],
  isAuthenticated: false,
  message: ""
};

export const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {

    LoginSuccess: (state, action) => {

      state.user = action.payload;
      state.isAuthenticated = true;
    },


    RegisterSuccess: (state, action) => {

      state.user = action.payload;
      state.isAuthenticated = true;
    },

    LogoutUserSuccess: (state) => {

      state.user = null;
      state.isAuthenticated = false;
    },
    userProfileSuccess: (state, action) => {

      state.user = action.payload;
    },
    followUserSuccess: (state, action) => {
      state.user = action.payload;
    },
  }
});
export const { RegisterSuccess, LoginSuccess, LoadUserSuccess, LoadUserFailure, LogoutUserSuccess, userProfileSuccess, followUserSuccess } = userReducer.actions;


