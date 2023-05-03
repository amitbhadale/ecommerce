import { createReducer } from "@reduxjs/toolkit";
const intialState = {};

export const cartReducer = createReducer(intialState, {
  initialAddToCart: (state, action) => {
    state.cart = action.payload;
    // state.message = "Item added to cart successfully";
  },
  addToCart: (state, action) => {
    state.cart = action.payload;
    state.message = "Cart Updated Successfully";
  },
  updateTotalVal: (state, action) => {
    state.totalValue = action.payload;
  },
  clearMessage: (state) => {
    state.message = null;
  },
});
