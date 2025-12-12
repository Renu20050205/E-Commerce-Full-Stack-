import axios from "./axiosConfig";

export const getAllProducts = async () => {
  return await axios.get("/getAllProducts");
};

export const getProductById = async (productId) => {
  return await axios.get(`/getProductById/${productId}`);
};

export const getProductsByQuery = async (queryParams) => {
  return await axios.get("/getProductsByQuery", { params: queryParams });
};

export const addProduct = async (productData, token) => {
  return await axios.post("/addProducts", productData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateProduct = async (productId, productData, token) => {
  return await axios.put(`/updateProduct/${productId}`, productData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteProduct = async (productId, token) => {
  return await axios.delete(`/deleteProduct/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};