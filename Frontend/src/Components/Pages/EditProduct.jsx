import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, updateProduct } from "../services/productService";
import { toast } from "react-toastify";
import "./Styles.css";

const EditProduct = () => {
  const { id } = useParams();
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

  // Valid categories as per backend
  const validCategories = [
    "electronic",
    "clothing",
    "food",
    "books",
    "furniture",
  ];

  useEffect(() => {
    if (!token) {
      toast.error("Please login to edit products.");
      navigate("/");
      return;
    }

    const fetchProduct = async () => {
      try {
        const res = await getProductById(id);
        const product = res.data.product;
        setFormData({
          productImage: product.productImage || "",
          productName: product.productName || "",
          category: product.category || "",
          productDescription: product.productDescription || "",
          productPrice: product.productPrice || "",
          productRatings: product.productRatings || "",
          isFreeDelivery: product.isFreeDelivery || false,
        });
      } catch (error) {
        toast.error("Failed to fetch product details.");
      }
    };

    fetchProduct();
  }, [id, navigate, token]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateBeforeSubmit = () => {
    if (!formData.productImage) {
      toast.error("Product Image URL is required");
      return false;
    }
    if (!formData.productName.trim()) {
      toast.error("Product Name is required");
      return false;
    }
    if (!validCategories.includes(formData.category.trim().toLowerCase())) {
      toast.error(`Category must be one of: ${validCategories.join(", ")}`);
      return false;
    }
    if (!formData.productDescription.trim()) {
      toast.error("Product Description is required");
      return false;
    }
    const price = Number(formData.productPrice);
    if (isNaN(price) || price < 0) {
      toast.error("Product Price must be a positive number");
      return false;
    }
    const ratings = Number(formData.productRatings);
    if (isNaN(ratings) || ratings < 0 || ratings > 5) {
      toast.error("Product Ratings must be between 0 and 5");
      return false;
    }
    if (typeof formData.isFreeDelivery !== "boolean") {
      toast.error("Free Delivery must be true or false");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateBeforeSubmit()) return;

    // Prepare data to send according to backend requirements
    const productData = {
      productImage: formData.productImage.trim(),
      productName: formData.productName.trim(),
      category: formData.category.trim().toLowerCase(),
      productDescription: formData.productDescription.trim(),
      productPrice: Number(formData.productPrice),
      productRatings: Number(formData.productRatings),
      isFreeDelivery: formData.isFreeDelivery,
    };

    try {
      await updateProduct(id, productData, token);
      toast.success("Product updated successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.msg || "Update failed!");
    }
  };

  return (
    <div className="add-product-container">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <label>Product Image URL:</label>
        <input
          type="text"
          name="productImage"
          value={formData.productImage}
          onChange={handleChange}
          required
        />

        <label>Product Name:</label>
        <input
          type="text"
          name="productName"
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
          {validCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>

        <label>Product Description:</label>
        <textarea
          name="productDescription"
          value={formData.productDescription}
          onChange={handleChange}
          required
        />

        <label>Product Price (₹):</label>
        <input
          type="number"
          name="productPrice"
          value={formData.productPrice}
          onChange={handleChange}
          required
        />

        <label>Product Rating (0 to 5):</label>
        <input
          type="number"
          name="productRatings"
          min="0"
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

        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;