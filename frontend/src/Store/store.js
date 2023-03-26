import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "../Reducers/ProductReducers";
import { cartReducer } from "../Reducers/CartReducer";
export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
  },
});
