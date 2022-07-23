import axios from "axios";
import showToast from "../utils/showToastNotification";

export const updateItems = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(formData);

  try {
    showToast("SUCCESS", "Updating...");
    const user = await axios.put("/api/profile/addItem", body, config);
    dispatch({
      type: 'UPDATE_INVENTORY',
      payload: user.data
    })
    showToast("SUCCESS", "Updation Successful");
  } catch (e) {
    console.log(e.response);

    showToast("ERROR", "Error in updating inventory!");
  }
};

export const deleteItems = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(formData);

  try {
    showToast("SUCCESS", "Billing...");
    const user = await axios.put("/api/profile/deleteItem", body, config);
    dispatch({
      type: 'UPDATE_INVENTORY',
      payload: user.data
    })
    showToast("SUCCESS", "Billing Successful");
  } catch (e) {
    console.log(e.response);

    showToast("ERROR", e.response?.data?.msg || e.response?.data?.message);
  }
};

export const deleteBed = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(formData);

  try {
    showToast("SUCCESS", "Billing...");
    const user =  await axios.put("/api/profile/deleteBed", body, config);
    dispatch({
      type: 'UPDATE_INVENTORY',
      payload: user.data
    })
    showToast("SUCCESS", "Billing Successful");
  } catch (e) {
    console.log(e.response);

    showToast("ERROR", e.response?.data?.msg || e.response?.data?.message);
  }
};

export const freeBed = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(formData);

  try {
    showToast("SUCCESS", "Freeing Bed...");
    const user = await axios.put("/api/profile/freeBed", body, config);
    dispatch({
      type: 'UPDATE_INVENTORY',
      payload: user.data
    })
    showToast("SUCCESS", "Freeing Successful");
  } catch (e) {
    console.log(e.response);

    showToast("ERROR", e.response?.data?.msg || e.response?.data?.message);
  }
};
