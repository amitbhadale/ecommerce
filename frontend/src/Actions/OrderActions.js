import axios from "axios";

export const addOrder = (obj) => async (dispatch) => {
  try {
    const data = await axios.post("/api/v1/order/add", obj);
  } catch (e) {
    console.log("error", e.message);
  }
};

export const getOrders = (id) => async (dispatch) => {
  try {
    dispatch({ type: "getOrderRequest" });
    const { data } = await axios.get(`/api/v1/order/get/${id}`);
    dispatch({
      type: "getOrderSuccess",
      payload: data.orders,
    });
  } catch (e) {
    dispatch({ type: "getOrderFailure", payload: e.message });
  }
};

export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: "getAllOrdersRequest" });
    const { data } = await axios.get(`/api/v1/order`);
    dispatch({
      type: "getAllOrdersSuccess",
      payload: data.orders,
    });
  } catch (e) {
    dispatch({ type: "getAllOrdersFailure", payload: e.message });
  }
};

export const updateOrderStatus = (id, status) => async (dispatch) => {
  try {
    dispatch({ type: "updateOrderStatusRequest" });
    const { data } = await axios.put(`/api/v1/order/update/${id}`, { status });
    dispatch({
      type: "updateOrderStatusSuccess",
      payload: data.message,
    });
  } catch (e) {
    dispatch({ type: "updateOrderStatusFailure", payload: e.message });
  }
};

export const addressSelect = (obj) => (dispatch) => {
  dispatch({
    type: "updateSelectedAddress",
    payload: obj,
  });
};
