import { createReducer } from "@reduxjs/toolkit";
const intialState = {};

export const orderReducer = createReducer(intialState, {
  updateSelectedAddress: (state, action) => {
    state.selectedAddress = action.payload;
  },

  getOrderRequest: (state) => {
    state.loading = true;
  },
  getOrderSuccess: (state, action) => {
    state.loading = false;
    state.orders = action.payload;
  },
  getOrderFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  getAllOrdersRequest: (state) => {
    state.loading = true;
  },
  getAllOrdersSuccess: (state, action) => {
    state.loading = false;
    state.orders = action.payload;
  },
  getAllOrdersFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  updateOrderStatusRequest: (state) => {
    state.loading = true;
  },
  updateOrderStatusSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  updateOrderStatusFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  clearMessage: (state) => {
    state.message = null;
  },
});
