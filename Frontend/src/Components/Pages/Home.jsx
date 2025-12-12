import React, { useEffect, useState } from "react";
import { getAllProducts, deleteProduct } from "../services/productService";
import { addToCart } from "../services/cartService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getAllProducts();
      setProducts(response.data.products);

      const initialQuantities = {};
      response.data.products.forEach((product) => {
        initialQuantities[product._id] = 1;
      });
      setQuantities(initialQuantities);


    } catch (error) {
      console.log("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (productId, value) => {
    if (value >= 1) {
      setQuantities((prev) => ({ ...prev, [productId]: value }));
    }
  };

  const handleAddToCart = async (productId) => {
    const quantity = quantities[productId] || 1;
    try {
      // Make sure addToCart is imported from services
      const res = await addToCart({ productId, quantity });
      toast.success(res.data.msg);
    } catch (error) {
      toast.error(error.response?.data?.msg || "Failed to add to cart");
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!token) {
      toast.error("Please login to delete a product.");
      return;
    }
    try {
      const res = await deleteProduct(productId, token);
      toast.success(res.data.msg);
      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.msg || "Failed to delete product");
    }
  };

  if (loading) return <h3>Loading Products...</h3>;

  return (
    <div className="product-container">
      {products.map((product) => (
        <div key={product._id} className="product-card">
          <img
            src={product.productImage}
            alt={product.productName}
            className="product-image"
          />
          <h3>{product.productName}</h3>
          <p>Category: {product.category}</p>
          <p>Price: ₹{product.productPrice}</p>
          <p>Rating: ⭐ {product.productRatings}</p>
          {product.isFreeDelivery && (
            <p style={{ color: "green", fontWeight: "bold" }}>Free Delivery</p>
          )}

          {token && (
            <div className="quantity-control">
              <button
                onClick={() =>
                  handleQuantityChange(
                    product._id,
                    Math.max(1, quantities[product._id] - 1)
                  )
                }
              >
                -
              </button>
              <input
                type="number"
                min="1"
                value={quantities[product._id]}
                onChange={(e) =>
                  handleQuantityChange(
                    product._id,
                    Math.max(1, Number(e.target.value))
                  )
                }
              />
              <button
                onClick={() =>
                  handleQuantityChange(product._id, quantities[product._id] + 1)
                }
              >
                +
              </button>
            </div>
          )}

          {token && (
            <>
              <button
                onClick={() => handleAddToCart(product._id)}
                className="add-to-cart-btn"
              >
                Add to Cart
              </button>

              <button
                onClick={() => navigate(`/edit-product/${product._id}`)}
                className="edit-btn"
              >
                Edit Product
              </button>

              <button
                onClick={() => handleDeleteProduct(product._id)}
                className="delete-btn"
              >
                Delete Product
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Home;