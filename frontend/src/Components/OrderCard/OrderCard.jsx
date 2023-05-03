import React from "react";
import { useDispatch } from "react-redux";
import { getAllOrders, updateOrderStatus } from "../../Actions/OrderActions";
import "./OrderCard.scss";

const OrderCard = ({ order, isAdmin }) => {
  const dispatch = useDispatch();
  const { createdAt, status, shippingDetails, items, totalValue, _id } = order;

  const processOrder = async (action) => {
    await dispatch(updateOrderStatus(_id, action));
    await dispatch(getAllOrders());
  };
  return (
    <div className="ordr-item-box">
      <div className="order-head">
        <div className="date">
          <p>
            Placed on:
            {new Date(createdAt).toLocaleString()}
          </p>
        </div>
        <div className="status">
          <p>
            Status: <b>{status}</b>
          </p>
        </div>
        <div className="price">
          <p>Total: {totalValue}</p>
        </div>
      </div>
      <div className="ordr-body">
        <div className="items-list">
          <div>
            <p>
              <b>Item Name</b>
            </p>
            <p>
              <b>Quantity</b>
            </p>
          </div>
          {items.map((j, k) => {
            const { name, quantity } = j;
            return (
              <div key={k}>
                <p>{name}</p>
                <p>{quantity}</p>
              </div>
            );
          })}
        </div>
        <div className="address">
          <b>Shipping Address:</b>
          <p>{shippingDetails.addressLine}</p>
          <p>
            {shippingDetails.city}, {shippingDetails.state}
          </p>
          <p>{shippingDetails.pin}</p>
        </div>
      </div>
      {isAdmin ? (
        <div className="ordr-foot">
          {status === "Processing" ? (
            <button
              className="dispatch"
              onClick={() => processOrder("Dispatched")}
            >
              Move to Dispatch
            </button>
          ) : status === "Dispatched" ? (
            <button
              className="deliver"
              onClick={() => processOrder("Delivered")}
            >
              Mark as Delivered
            </button>
          ) : (
            false
          )}
        </div>
      ) : null}
    </div>
  );
};

export default OrderCard;
