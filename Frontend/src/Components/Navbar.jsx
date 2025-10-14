import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Ensure you have imported toast from react-toastify

function Navbar({ openLogin }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged Out Successfully");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "white" }}>
      <div className="container-fluid">

        {/* E-Commerce Website icon */}
        <Link to="/" className="navbar-brand fs-3 text-dark">
          <i className="fas fa-bag-shopping"></i>
        </Link>

        {/* Hamburger icon - Three line icon */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Items */}
        <div className="collapse navbar-collapse justify-content-end text-dark" id="navbarNav">
          <ul className="navbar-nav align-items-center">
             {/* Search Bar */}
            <li className="nav-item">
              <form className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
            </li>

            <li className="nav-item">
              <Link to="/" className="nav-link fs-5">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/addProduct" className="nav-link fs-5">AddProduct</Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link fs-5">About</Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link fs-5">Contact</Link>
            </li>
            <li className="nav-item">
              <Link to="/cart" className="nav-link fs-5">
                <i className="fas fa-shopping-cart"></i>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/myprofile" className="nav-link fs-5">
                <i className="fas fa-user-circle"></i>
              </Link>
            </li>
           
            {/* Conditional Login/Logout Button */}
            <li>
              {token ? (
                <button onClick={handleLogout} className="btn btn-outline-danger mx-2">Logout</button>
              ) : (
                <button onClick={openLogin} className="btn btn-outline-primary mx-2">Login</button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
