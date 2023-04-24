import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  return (
    <div>
      <div className="navbar">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="./products">Products</Link>
        <Link to="./category">Category</Link>
        <Link to="./users">Users</Link>
        <Link to="./orders">Orders</Link>
      </div>
    </div>
  );
};

export default Header;
