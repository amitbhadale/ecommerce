import { createReducer } from "@reduxjs/toolkit";
const intialState = {};

export const cartReducer = createReducer(intialState, {
  addToCart: (state, action) => {
    // console.log("payload", action);
    state.cart = action.payload;
  },
});
