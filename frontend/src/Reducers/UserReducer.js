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

  addAddressRequest: (state) => {
    state.loading = true;
  },
  addAddressSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  addAddressFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  deleteAddressRequest: (state) => {
    state.loading = true;
  },
  deleteAddressSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  deleteAddressFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  updateDBCartRequest: (state) => {
    state.loading = true;
  },
  updateDBCartSuccess: (state, action) => {
    state.loading = false;
    // state.message = action.payload;
  },
  updateDBCartFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  updateFavRequest: (state) => {
    state.loading = true;
  },
  updateFavSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
  },
  updateFavFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  clearError: (state) => {
    state.error = null;
  },
  clearMessage: (state) => {
    state.message = null;
  },
});
