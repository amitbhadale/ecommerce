import axios from "axios";

export const addCategory = (name) => async (dispatch) => {
  try {
    dispatch({ type: "addCategoryRequest" });
    await axios.post("/api/v1/category/add", {
      name,
    });
    dispatch({
      type: "addCategorySuccess",
      payload: "Category Added Successfully",
    });
  } catch (e) {
    dispatch({ type: "addCategoryFailure", payload: e.message });
  }
};

export const getCategories = () => async (dispatch) => {
  try {
    dispatch({ type: "getCategoriesRequest" });
    const { data } = await axios.get("/api/v1/category");
    dispatch({
      type: "getCategoriesSuccess",
      payload: data.categories,
    });
  } catch (e) {
    dispatch({ type: "getCategoriesFailure", payload: e.message });
  }
};

export const getCategoryDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: "getCategoryDetailsRequest" });
    const { data } = await axios.get(`/api/v1/category/${id}`);
    dispatch({
      type: "getCategoryDetailsSuccess",
      payload: data.category,
    });
  } catch (e) {
    dispatch({ type: "getCategoryDetailsFailure", payload: e.message });
  }
};

export const updateCategory = (id, obj) => async (dispatch) => {
  try {
    dispatch({ type: "updateCategoryRequest" });
    const { data } = await axios.put(`/api/v1/category/${id}`, obj);
    dispatch({
      type: "updateCategorySuccess",
      payload: data.message,
    });
  } catch (e) {
    dispatch({ type: "updateCategoryFailure", payload: e.message });
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteCategoryRequest" });
    const { data } = await axios.delete(`/api/v1/category/${id}`);
    dispatch({
      type: "deleteCategorySuccess",
      payload: data.message,
    });
  } catch (e) {
    dispatch({ type: "deleteCategoryFailure", payload: e.message });
  }
};

export const clearMessage = () => async (dispatch) => {
  dispatch({ type: "clearMessage" });
};
