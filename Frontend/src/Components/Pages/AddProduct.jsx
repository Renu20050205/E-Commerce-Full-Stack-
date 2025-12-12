import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../services/productService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Styles.css";

function AddProduct() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    productImage: "",
    productName: "",
    category: "",
    productDescription: "",
    productPrice: "",
    productRatings: "",
    isFreeDelivery: false,
  });

  useEffect(() => {
    if (!token) {
      toast.error("Please login first to add a product!");
      navigate("/");
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      productImage: formData.productImage.trim(),
      productName: formData.productName.trim(),
      category: formData.category.toLowerCase(),
      productDescription: formData.productDescription.trim(),
      productPrice: Number(formData.productPrice),
      productRatings: Number(formData.productRatings),
      isFreeDelivery: formData.isFreeDelivery,
    };

    try {
      await addProduct(productData, token);
      toast.success("✅ Product Added Successfully!");

      setFormData({
        productImage: "",
        productName: "",
        category: "",
        productDescription: "",
        productPrice: "",
        productRatings: "",
        isFreeDelivery: false,
      });

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      console.log("Server Error:", error.response?.data);
      toast.error(error.response?.data?.msg || "❌ Product Add Failed");
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <label>Product Image URL:</label>
        <input
          type="text"
          name="productImage"
          placeholder="Enter image URL"
          value={formData.productImage}
          onChange={handleChange}
          required
        />

        <label>Product Name:</label>
        <input
          type="text"
          name="productName"
          placeholder="Enter product name"
          value={formData.productName}
          onChange={handleChange}
          required
        />

        <label>Category:</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="clothes">Clothes</option>
          <option value="food">Food</option>
          <option value="toy">Toy</option>
          <option value="electronic">Electronic</option>
          <option value="books">Books</option>
        </select>

        <label>Product Description:</label>
        <textarea
          name="productDescription"
          placeholder="Enter product description"
          value={formData.productDescription}
          onChange={handleChange}
          required
        />

        <label>Product Price (₹):</label>
        <input
          type="number"
          name="productPrice"
          placeholder="Enter price"
          value={formData.productPrice}
          onChange={handleChange}
          required
        />

        <label>Product Rating (1 to 5):</label>
        <input
          type="number"
          name="productRatings"
          min="1"
          max="5"
          value={formData.productRatings}
          onChange={handleChange}
          required
        />

        <label className="checkbox-label">
          <input
            type="checkbox"
            name="isFreeDelivery"
            checked={formData.isFreeDelivery}
            onChange={handleChange}
          />
          Free Delivery Available
        </label>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;