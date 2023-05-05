import axios from "axios";
import { closeAlert } from "../utils/common";

export const register = (obj) => async (dispatch) => {
  try {
    dispatch({ type: "registerRequest" });
    await axios.post("/api/v1/register", obj);
    dispatch({
      type: "registerSuccess",
      payload: "User Added Successfully",
    });
  } catch (e) {
    dispatch({ type: "registerFailure", payload: e.message });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "loadUserRequest" });
    const { data } = await axios.get("/api/v1/me");
    dispatch({
      type: "loadUserSuccess",
      payload: data.user,
    });
  } catch (e) {
    dispatch({ type: "loadUserFailure", payload: e.message });
  }
};

export const login = (obj) => async (dispatch) => {
  try {
    dispatch({ type: "loginRequest" });
    const { data } = await axios.post("/api/v1/login", obj);
    dispatch({
      type: "loginSuccess",
      payload: data.user,
    });
  } catch (e) {
    dispatch({ type: "loginFailure", payload: e.message });
  }
};

export const logout = (obj) => async (dispatch) => {
  try {
    dispatch({ type: "logOutRequest" });
    const { data } = await axios.get("/api/v1/logout");
    dispatch({
      type: "logOutSuccess",
      payload: "logged out",
    });
  } catch (e) {
    dispatch({ type: "logOutFailure", payload: e.message });
  }
};

export const addAddress = (id, obj) => async (dispatch) => {
  try {
    dispatch({ type: "addAddressRequest" });
    const { data } = await axios.post(`/api/v1/add/address/${id}`, obj);
    await dispatch({
      type: "addAddressSuccess",
      payload: data,
    });
    closeAlert(dispatch);
  } catch (e) {
    dispatch({ type: "addAddressFailure", payload: e.message });
  }
};

export const deleteAddress = (id, index) => async (dispatch) => {
  try {
    dispatch({ type: "deleteAddressRequest" });
    const { data } = await axios.put(`/api/v1/remove/address/${id}/${index}`);
    await dispatch({
      type: "deleteAddressSuccess",
      payload: data,
    });
    closeAlert(dispatch);
  } catch (e) {
    dispatch({ type: "deleteAddressFailure", payload: e.message });
  }
};

export const updateFav = (userId, fav) => async (dispatch) => {
  try {
    dispatch({ type: "updateFavRequest" });
    const { data } = await axios.put(`/api/v1/update/favourite/${userId}`, fav);
    await dispatch({
      type: "updateFavSuccess",
      payload: data.user,
    });
  } catch (e) {
    dispatch({ type: "updateFavFailure", payload: e.message });
  }
};
