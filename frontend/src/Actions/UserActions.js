import axios from "axios";

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
