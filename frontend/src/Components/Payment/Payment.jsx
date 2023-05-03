import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAction, saveCartToDB } from "../../Actions/CartActions";
import { addOrder } from "../../Actions/OrderActions";
import "./Payment.scss";
const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuth } = useSelector((state) => state.user);
  const { totalValue, cart } = useSelector((state) => state.cart);
  const { selectedAddress } = useSelector((state) => state.order);

  const placeOrderHandler = async () => {
    const cartCopy = cart.map((item) => {
      return {
        ...item,
        product: item.id,
      };
    });
    const orderObj = {
      user: user._id,
      shippingDetails: selectedAddress,
      items: cartCopy,
      totalValue,
      paymentInfo: {
        paidAt: null,
        status: "unpaid",
      },
    };

    await dispatch(addOrder(orderObj));
    navigate("/orders");
    //empty all cart values
    await dispatch(addToCartAction([], "initial"));
    await dispatch(saveCartToDB(user._id, []));
    localStorage.setItem("cart", JSON.stringify([]));
  };

  return (
    <div className="co-box">
      <div className="co-left">
        <div className="address-box">
          <div className="rw">
            <h3>Select Payment Method</h3>
          </div>
          <div className="payment-type-list">
            <div className="cod">
              <input
                type="radio"
                name="payType"
                checked={true}
                onChange={() => console.log("payment selected")}
              />
              <h5>Cash On Delivery</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="co-right">
        <div className="calculations">
          <h4>Price Details</h4>
          <div className="price-breakup-box">
            <div className="rw">
              <p>Total MRP</p>
              <p>Rs. {totalValue}</p>
            </div>
            <div className="rw">
              <p>Std. Discount</p>
              <p>-{totalValue / 10}</p>
            </div>
          </div>
          <hr />
          <div className="total-box">
            <div className="rw">
              <h3>Total Amount</h3>
              <h3>Rs. {totalValue - totalValue / 10}</h3>
            </div>
            <div className="rw">
              <div className="chckout-cta">
                <button onClick={placeOrderHandler}>PLACE ORDER</button>
                {/* <Link to={isAuth ? "/checkout/payment" : "/login"}>
                  {isAuth ? "PLACE ORDER" : "LOGIN TO CONTINUE"}
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
