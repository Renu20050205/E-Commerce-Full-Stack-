import axios from "./axiosConfig";

export const getAllProducts = async () => {
  return await axios.get("/getAllProducts");
};

export const addProduct = async (productData, token) => {
  return await axios.post("/addProducts", productData, {
    headers: {
      "Content-Type": "multipart/form-data",
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
