import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "../Reducers/ProductReducers";
import { cartReducer } from "../Reducers/CartReducer";
import { userReducer } from "../Reducers/UserReducer";
export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    user: userReducer,
  },
});
