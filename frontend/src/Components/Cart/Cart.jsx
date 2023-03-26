import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../CartItem/CartItem";
import "./Cart.scss";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalVal, setTotalVal] = useState(0);
  //TODO - if user is logged in then fetch cart details from DB else from localstorage
  const { cart } = useSelector((state) => state.cart);
  useEffect(() => {
    if (cart) {
      setCartItems(cart);
    }
  }, [cart]);

  useEffect(() => {
    //calculate total value calculations
    if (cart) {
      const a = cart.map((i) => {
        return {
          ...i,
          total: i.price * i.quantity,
        };
      });
      const sum = a
        .map((x) => x.total)
        .reduce((j, k) => {
          return j + k;
        });

      setTotalVal(sum);
    }
  }, [cart, cartItems]);

  return (
    <div className="crt-box">
      <div className="crt-left">
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item, i) => {
            return <CartItem key={i} item={item} />;
          })
        ) : (
          <p>No cart items</p>
        )}
      </div>
      <div className="crt-right">
        <div className="calculations">
          <h4>Price Details</h4>
          <div className="price-breakup-box">
            <div className="rw">
              <p>Total MRP</p>
              <p>Rs. {totalVal}</p>
            </div>
            <div className="rw">
              <p>Std. Discount</p>
              <p>-{totalVal / 10}</p>
            </div>
          </div>
          <hr />
          <div className="total-box">
            <div className="rw">
              <h3>Total Amount</h3>
              <h3>Rs. {totalVal - totalVal / 10}</h3>
            </div>
            <div className="rw">
              <div className="chckout-cta">
                <Link to="/checkout/address">CHECKOUT</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
