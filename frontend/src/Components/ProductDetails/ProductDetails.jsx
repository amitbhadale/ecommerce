import React, { useEffect, useState } from "react";
import "./ProductDetails.scss";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../Actions/ProductActions";
import { addToCartAction } from "../../Actions/CartActions";

const ProductDetails = () => {
  const dispatch = useDispatch();
  let { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      async function loadInit() {
        await dispatch(getProductDetails(id));
      }
      loadInit();
    }

    return () => {
      id = null;
      product = null;
    };
  }, [id]);

  let { product } = useSelector((state) => state.product);

  const addtoCart = () => {
    //TODO: if user is logged in then call addtocart api else save on localstorage

    let cartItems = JSON.parse(localStorage.cart);
    const prodObj = {
      id,
      name: product.name,
      price: product.price,
      quantity,
    };

    //check if item exists in cart
    const indx = cartItems.map((item) => item.id).indexOf(id);

    if (indx === -1) {
      //item doesnt exists, add new
      cartItems.push(prodObj);
    } else {
      //item exists, replace with its index
      cartItems[indx] = prodObj;
    }
    dispatch(addToCartAction(cartItems));
    localStorage.setItem("cart", JSON.stringify(cartItems));
  };

  return (
    <>
      <div>
        {product ? (
          <div className="prod-details-container">
            <div className="pd-left">
              <img src="https://dummyimage.com/550x650/444/fff" alt="" />
            </div>
            <div className="pd-right">
              <div className="pd-title">
                <h3>{product.name}</h3>
              </div>
              <hr />
              <div className="pd-rating"></div>
              <div className="pd-price">
                <h4>Rs. {product.price}/-</h4>
                <p>(inclusive of all taxes)</p>
              </div>
              <div className="pd-quantity">
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
                <span> {quantity} </span>
                <button onClick={() => setQuantity(quantity - 1)}>-</button>
              </div>
              <div className="pd-cta-box">
                <button className="pd-cta" onClick={() => addtoCart()}>
                  Add to Cart
                </button>
                <button className="pd-cta">Move to Favourate</button>
              </div>
              <div className="pd-desc">{product.description}</div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default ProductDetails;