import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  return (
    <>
      <div className="mainnav">
        <div className="nav-section">
          <Link className="navlink logo" to="/">
            AMIT BHADALE
          </Link>
        </div>
        <div className="nav-section navlinks">
          <Link className="navlink" to="/">
            Home
          </Link>
          <Link className="navlink" to="/products">
            Products
          </Link>
          <Link className="navlink" to="/admin" target="_blank">
            Admin
          </Link>
          <Link className="navlink" to="/cart">
            Cart
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
