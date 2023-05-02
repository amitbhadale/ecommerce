import React from "react";
import "./ProductCard.scss";
import { Link } from "react-router-dom";

const ProductCard = ({ prod }) => {
  const { name, description, category, price, _id, images } = prod;
  return (
    <>
      {prod === "dummy" ? (
        <div className="card-container dummy"></div>
      ) : (
        <div className="card-container">
          <div className="prod-img">
            <img
              src={
                images && images.length > 0
                  ? images[0].url
                  : "https://dummyimage.com/210x280/444/fff"
              }
              alt="Product Image"
            />
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
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
