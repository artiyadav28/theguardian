import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_PROFILE,
} from "./types";
import showToast from "../utils/showToastNotification";
// load user
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data, //which will be the user
    });
  } catch (e) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register user

export const register = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(formData);

  try {
    const res = await axios.post("/api/users", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
    showToast("SUCCESS", "Register Successful");
  } catch (e) {
    console.log(e);

    showToast("ERROR", e.response?.data?.msg || e.response?.data?.message);

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login user

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/auth", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
    showToast("SUCCESS", "Login Successful");
  } catch (e) {
    console.log(e);

    showToast("ERROR",e.response?.data?.msg || e.response?.data?.message);

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//logout / clear profile

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  dispatch({ type: CLEAR_PROFILE });
};
