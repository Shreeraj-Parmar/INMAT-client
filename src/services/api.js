import axios from "axios";

const URL = import.meta.env.VITE_API_URL;

export const sendNewuser = async (newData) => {
  try {
    let response = await axios.post(`${URL}/user`, newData);
    return response;
  } catch (error) {
    console.error(
      "error while calling sendNewuser forntend api & message is : ",
      error.message
    );
  }
};

export const getAllUsers = async () => {
  try {
    const res = await axios.get(`${URL}/user`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error(
      "error while calling getAllUsers forntend api & message is : ",
      error.message
    );
  }
};

export const loginCheckUp = async (data) => {
  try {
    let response = await axios.post(`${URL}/login`, data);
    return response;
  } catch (error) {
    console.error(
      "error while calling loginCheckUp forntend api & message is : ",
      error.message
    );
  }
};

export const sendInvoiceData = async (newData) => {
  try {
    await axios.post(`${URL}/invoice/save`, newData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (error) {
    console.error(
      "error while calling POST Invoice forntend api & message is : ",
      error.message
    );
  }
};

export const getInvoiceData = async (data) => {
  try {
    const response = await axios.post(`${URL}/invoice`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data.invoices; // Adjust to return only the invoices
  } catch (error) {
    console.error("Error fetching invoices:", error.message);
    return []; // Return an empty array or handle the error appropriately
  }
};

export const updateInvoices = async (data) => {
  try {
    const response = await axios.put(`${URL}/invoice`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response; // Adjust to return only the invoices
  } catch (error) {
    console.error("Error updating invoices:", error.message);
    return []; // Return an empty array or handle the error appropriately
  }
};

export const updateProfile = async (data) => {
  try {
    const response = await axios.put(`${URL}/user`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response; // Adjust to return only the invoices
  } catch (error) {
    console.error("Error updating profile:", error.message);
  }
};

export const getData = async () => {
  let token = localStorage.getItem("token");
  console.log(token);
  try {
    const response = await axios.post(`${URL}/userInfo`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error getData:", error.message);
  }
};

export const checkIsMFA = async (data) => {
  try {
    const res = await axios.post(`${URL}/ismfa`, data);
    return res;
  } catch (error) {
    console.error(
      "error while calling ismfa forntend api & message is : ",
      error.message
    );
  }
};

export const sendDigit = async (email) => {
  try {
    const res = await axios.post(`${URL}/mail`, email, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res;
  } catch (error) {
    console.error(
      "error while calling sendDigit forntend api & message is : ",
      error.message
    );
  }
};

export const trueMFA = async (data) => {
  try {
    let response = await axios.post(`${URL}/mail-verify`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response;
  } catch (error) {
    console.error(
      "error while calling trueMFA forntend api & message is : ",
      error.message
    );
  }
};

export const setUserEmail = async (data) => {
  try {
    let response = await axios.post(`${URL}/mail-add`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response;
  } catch (error) {
    console.error(
      "error while calling setUserEmail forntend api & message is : ",
      error.message
    );
  }
};

export const getMFAEmail = async (data) => {
  try {
    let response = await axios.post(`${URL}/mail-get`, data);
    return response.data;
  } catch (error) {
    console.error(
      "error while calling getMFADetials forntend api & message is : ",
      error.message
    );
  }
};

export const refresIt = async (dat) => {
  try {
    let response = await axios.post(`${URL}/refresh-verify`, dat);
    return response.data;
  } catch (error) {
    console.error(
      "error while calling refresIt forntend api & message is : ",
      error.message
    );
  }
};

export const getDatawithToken = async (dat) => {
  try {
    let response = await axios.post(`${URL}/token`, dat);
    return response.data;
  } catch (error) {
    console.error(
      "error while calling getDatawithToken forntend api & message is : ",
      error.message
    );
  }
};
