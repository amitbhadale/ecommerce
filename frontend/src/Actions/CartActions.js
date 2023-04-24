import axios from "axios";

export const addToCartAction = (cart) => (dispatch) => {
  dispatch({
    type: "addToCart",
    payload: cart,
  });
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
      payload: data.user,
    });
  } catch (e) {
    dispatch({ type: "updateDBCartFailure", payload: e.message });
  }
};
