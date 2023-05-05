import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { totalValue } from "../../Actions/CartActions";
import CartItem from "../CartItem/CartItem";
import "./Cart.scss";

const Cart = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.user);
  const [cartItems, setCartItems] = useState([]);
  const [totalVal, setTotalVal] = useState(0);

  const { cart } = useSelector((state) => state.cart);
  useEffect(() => {
    if (cart) {
      setCartItems(cart);
    }
  }, [cart]);

  useEffect(() => {
    //calculate total value calculations
    if (cart && cart.length > 0) {
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
      dispatch(totalValue(sum));
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
          <p>No items in Cart</p>
        )}
      </div>
      <div className="crt-right">
        <div className="calculations">
          <h4>Price Details</h4>
          <div className="price-breakup-box">
            <div className="rw">
              <p>Total MRP</p>
              <p>Rs. {totalVal.toLocaleString("en-IN")}</p>
            </div>
            <div className="rw">
              <p>Std. 10% Discount</p>
              <p>-{(totalVal / 10).toLocaleString("en-IN")}</p>
            </div>
          </div>
          <hr />
          <div className="total-box">
            <div className="rw">
              <h3>Total Amount</h3>
              <h3>Rs. {(totalVal - totalVal / 10).toLocaleString("en-IN")}</h3>
            </div>
            <div className="rw">
              <div className="chckout-cta">
                <Link
                  to={
                    cartItems.length === 0
                      ? "/products/1"
                      : isAuth
                      ? "/checkout/address"
                      : "/login"
                  }
                >
                  {cartItems.length === 0
                    ? "VIEW PRODUCTS"
                    : isAuth
                    ? "CHECKOUT"
                    : "LOGIN TO CHECKOUT"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
