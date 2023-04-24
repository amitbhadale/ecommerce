import { createReducer } from "@reduxjs/toolkit";
const intialState = {};

export const cartReducer = createReducer(intialState, {
  addToCart: (state, action) => {
    state.cart = action.payload;
    state.message = "Item added to cart successfully";
  },
  updateTotalVal: (state, action) => {
    state.totalValue = action.payload;
  },
});
