import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "../Reducers/ProductReducers";
export const store = configureStore({
  reducer: {
    product: productReducer,
  },
});
