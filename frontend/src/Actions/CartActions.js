import axios from "axios";
import { closeAlert } from "../utils/common";
export const addToCartAction = (cart, isInit) => (dispatch) => {
  //pass initial to not display alert box
  if (isInit === "initial") {
    dispatch({
      type: "initialAddToCart",
      payload: cart,
    });
  } else {
    dispatch({
      type: "addToCart",
      payload: cart,
    });
    closeAlert(dispatch);
  }
};

export const totalValue = (totalVal) => (dispatch) => {
  dispatch({
    type: "updateTotalVal",
    payload: totalVal,
  });
};

export const saveCartToDB = (id, obj) => async (dispatch) => {
  try {
    dispatch({ type: "updateDBCartRequest" });
    const { data } = await axios.post(`/api/v1/update/cart/${id}`, obj);
    dispatch({
      type: "updateDBCartSuccess",
      payload: data.message,
    });
  } catch (e) {
    dispatch({ type: "updateDBCartFailure", payload: e.message });
  }
};
