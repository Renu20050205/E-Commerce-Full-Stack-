const express = require("express");
const router=express.Router();
const {
  addUser,
  getUsers,
  updateUser,
  deleteUser,
  loginUser,
} = require("../Controllers/userController");

const {
  addProducts,
  getAllProducts,
  getProductById,
  getProductsByQuery,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const {
  addToCart,
  getCart,
  updateCart,
  removeItemFromCart,
  clearCart}=require("../Controllers/cartController");
const {
  placeOrder,
  getMyOrder,
  cancelOrder,
} = require("../Controllers/orderController");

const authMiddleware = require("../middleware/authmiddleware");

router.get("/", (req, res) => {
  res.send("Hello From  Server");
});

// User
router.post("/addUser", addUser);
router.get("/getAllUsers", authMiddleware, getUsers);
router.put("/updateuser/:id", authMiddleware, updateUser);
router.delete("/deleteUser/:id", authMiddleware, deleteUser);
router.post("/login", loginUser);

// Products
router.post("/addProducts", authMiddleware, addProducts);
router.get("/getAllProducts", getAllProducts);
router.get("/getProductById/:id", getProductById);
router.get("/getProductsByQuery", getProductsByQuery);
router.put("/updateProduct/:id", authMiddleware, updateProduct);
router.delete("/deleteProduct/:id", authMiddleware, deleteProduct);

/// Cart
router.post("/addToCart", authMiddleware, addToCart);
router.get("/getCart", authMiddleware, getCart);
router.put("/updateCart", authMiddleware, updateCart);
router.delete("/removeItem/:productId", authMiddleware, removeItemFromCart);
router.delete("/clearCart", authMiddleware, clearCart);

// Order
router.post("/placeOrder", authMiddleware, placeOrder);
router.get("/getMyOrder", authMiddleware, getMyOrder);
router.delete("/cancelOrder/:id", authMiddleware, cancelOrder);
module.exports = router;
