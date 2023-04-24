import React from "react";
import "./Dashboard.scss";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="prd-dash-box">
      <div className="left">
        <div className="acc-tabs">
          <Link className="navlink" to="./profile">
            Overview
          </Link>
          <Link className="navlink" to="./address">
            Address
          </Link>
        </div>
      </div>
      <div className="right">
        <Outlet />
      </div>
    </div>
  );
};

export { Dashboard };
