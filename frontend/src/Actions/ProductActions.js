import axios from "axios";

export const addProduct = (obj) => async (dispatch) => {
  try {
    dispatch({ type: "addProductRequest" });
    await axios.post("/api/v1/Product/add", obj);
    dispatch({
      type: "addProductSuccess",
      payload: "Product Added Successfully",
    });
  } catch (e) {
    dispatch({ type: "addProductFailure", payload: e.message });
  }
};

export const getProducts =
  (ppp, page = 1) =>
  async (dispatch) => {
    try {
      dispatch({ type: "getProductsRequest" });
      const { data } = await axios.get(
        `/api/v1/products?ppp=${ppp}&&page=${page}`
      );
      dispatch({
        type: "getProductsSuccess",
        payload: data,
      });
    } catch (e) {
      dispatch({ type: "addProductFailure", payload: e.message });
    }
  };

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: "getProductDetailsRequest" });
    const { data } = await axios.get(`/api/v1/products/${id}`);
    dispatch({
      type: "getProductDetailsSuccess",
      payload: data.product,
    });
  } catch (e) {
    dispatch({ type: "getProductDetailsFailure", payload: e.message });
  }
};

export const updateProduct = (id, obj) => async (dispatch) => {
  try {
    dispatch({ type: "updateProductRequest" });
    const { data } = await axios.put(`/api/v1/products/${id}`, obj);
    dispatch({
      type: "updateProductSuccess",
      payload: data.message,
    });
  } catch (e) {
    dispatch({ type: "updateProductFailure", payload: e.message });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteProductRequest" });
    const { data } = await axios.put(`/api/v1/products/${id}`);
    dispatch({
      type: "deleteProductSuccess",
      payload: data.message,
    });
  } catch (e) {
    dispatch({ type: "deleteProductFailure", payload: e.message });
  }
};
