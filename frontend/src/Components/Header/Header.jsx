import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../Actions/UserActions";
import "./Header.scss";

const Header = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.user);
  const logoutHandler = async () => {
    await dispatch(logout());
  };
  return (
    <>
      <div className="mainnav">
        <div className="nav-section">
          <Link className="navlink logo" to="/">
            LOGO
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
          <Link className="navlink" to="/my/profile">
            Profile
          </Link>
          {isAuth ? (
            <>
              <Link className="navlink" to="/orders">
                Orders
              </Link>

              <Link className="navlink" onClick={logoutHandler}>
                Log Out
              </Link>
            </>
          ) : (
            <Link className="navlink" to="/login">
              Login
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
