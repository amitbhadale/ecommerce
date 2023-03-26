import React from "react";
import "./ProductCard.scss";
import { Link } from "react-router-dom";

const ProductCard = ({ prod }) => {
  const { name, description, category, price, _id } = prod;
  return (
    <div className="card-container">
      <div className="prod-img">
        <img src="https://dummyimage.com/210x280/444/fff" alt="" />
      </div>
      <div className="prod-content">
        <div className="title">
          <Link to={`${_id}`}>
            <h3>{name}</h3>
          </Link>
        </div>
        <div className="price">
          <h5>Rs. {price}/-</h5>
        </div>
        <div className="rating"></div>
        <div className="actions">
          <button className="prod-cta">Add to Cart</button>
          {/* <button className="prod-cta"></button> */}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
