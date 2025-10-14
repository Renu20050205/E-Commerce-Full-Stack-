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
    productImage: null,
    productName: "",
    category: "",
    description: "",
    price: "",
    ratings: "",
    isFreeDelivery: false,
  });

  // Agar login nahi hai toh redirect karo
  useEffect(() => {
    if (!token) {
      toast.error("Please login first to add a product!");
      navigate("/");
    }
  }, [token, navigate]);

  // Form field change handle karna
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  // Form submit handle karna
  const handleSubmit = async (e) => {
    e.preventDefault();

    const productForm = new FormData();
    productForm.append("productImage", formData.productImage);
    productForm.append("productName", formData.productName);
    productForm.append("category", formData.category);
    productForm.append("description", formData.description);
    productForm.append("price", formData.price);
    productForm.append("ratings", formData.ratings);
    productForm.append("isFreeDelivery", formData.isFreeDelivery ? "true" : "false");

    try {
      await addProduct(productForm, token);
      toast.success("✅ Product Added Successfully!");

      // Reset form
      setFormData({
        productImage: null,
        productName: "",
        category: "",
        description: "",
        price: "",
        ratings: "",
        isFreeDelivery: false,
      });

      // Redirect thoda delay ke sath taki toast dikhe
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      toast.error(error.response?.data?.msg || "❌ Product Add Failed");
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit} className="product-form">
        
        <label>Product Image:</label>
        <input
          key={formData.productImage ? formData.productImage.name : "file"} // reset trick
          type="file"
          name="productImage"
          accept="image/*"
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
          <option value="Electronics">Electronics</option>
          <option value="Furniture">Furniture</option>
          <option value="Clothes">Clothes</option>
          <option value="Food">Food</option>
          <option value="Books">Books</option>
        </select>

        <label>Product Description:</label>
        <textarea
          name="description"
          placeholder="Enter product description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label>Product Price (₹):</label>
        <input
          type="number"
          name="price"
          placeholder="Enter price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <label>Product Rating (1 to 5):</label>
        <input
          type="number"
          name="ratings"
          min="1"
          max="5"
          value={formData.ratings}
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
