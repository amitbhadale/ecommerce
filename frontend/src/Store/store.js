import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "../Reducers/ProductReducers";
import { cartReducer } from "../Reducers/CartReducer";
import { userReducer } from "../Reducers/UserReducer";
import { orderReducer } from "../Reducers/OrderReducer";
export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    user: userReducer,
    order: orderReducer,
  },
});
