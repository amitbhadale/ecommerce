import { createReducer } from "@reduxjs/toolkit";
const intialState = {};

export const userReducer = createReducer(intialState, {
  registerRequest: (state) => {
    state.loading = true;
  },
  registerSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuth = true;
  },
  registerFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  loadUserRequest: (state) => {
    state.loading = true;
  },
  loadUserSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuth = true;
  },
  loadUserFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  loginRequest: (state) => {
    state.loading = true;
  },
  loginSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuth = true;
  },
  loginFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  logOutRequest: (state) => {
    state.loading = true;
  },
  logOutSuccess: (state, action) => {
    state.loading = false;
    state.user = {};
    state.isAuth = false;
  },
  logOutFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  clearError: (state) => {
    state.error = null;
  },
});