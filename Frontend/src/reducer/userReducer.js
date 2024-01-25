import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: [],
  isAuthenticated: false,
  message: ""
};

export const userReducer = createSlice({
  name: "userReducer",
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
    LoadUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    LoadUserFailure: (state, action) => {

      state.isAuthenticated = false;
    },
    LogoutUserSuccess: (state) => {

      state.user = null;
      state.isAuthenticated = false;
    },

  }
});
export const { RegisterSuccess, LoginSuccess, LoadUserSuccess, LoadUserFailure, LogoutUserSuccess } = userReducer.actions;



export const userProfileReducer = createSlice({
  name: "updated",
  initialState,
  reducers: {
    userProfileSuccess: (state, action) => {

      state.user = action.payload;
    },
    followUserSuccess: (state, action) => {
      state.message = action.payload;
    },
  }
});
export const { userProfileSuccess, followUserSuccess } = userProfileReducer.actions;