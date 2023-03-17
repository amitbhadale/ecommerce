import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  return (
    <>
      <div className="mainnav">
        <div className="nav-section">
          <Link className="navlink" to="/">
            Logo
          </Link>
        </div>
        <div className="nav-section navlinks">
          <Link className="navlink" to="/">
            Home
          </Link>
          <Link className="navlink" to="/admin">
            Admin
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
