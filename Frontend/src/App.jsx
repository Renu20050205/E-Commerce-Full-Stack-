import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Pages/Home";
import AddProduct from "./Components/Pages/AddProduct";
import EditProduct from "./Components/Pages/EditProduct";
import Contact from "./Components/Pages/Contact";
import About from "./Components/Pages/About";
import Cart from "./Components/Pages/Cart";
import MyProfile from "./Components/Pages/MyProfile";
import Order from "./Components/Pages/Order";
import SignupModal from "./Components/Pages/SignupModal";
import LoginModal from "./Components/Pages/LoginModal";
import { ToastContainer } from "react-toastify";

import "./App.css";


const App = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const openLoginModal = () => setShowLoginModal(true);
  const closeLoginModal = () => setShowLoginModal(false);

  const openSignupModal = () => setShowSignupModal(true);
  const closeSignupModal = () => setShowSignupModal(false);

  return (
    <>
      <BrowserRouter>
        <Navbar openLogin={openLoginModal} />

        {showLoginModal && (
          <LoginModal
            closeModal={closeLoginModal}
            openSignupModal={() => {
              closeLoginModal();
              openSignupModal();
            }}
          />
        )}

        {showSignupModal && (
          <SignupModal
            closeModal={closeSignupModal}
            openLoginModal={() => {
              closeSignupModal();
              openLoginModal();
            }}
          />
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />

        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  )
}
export default App;