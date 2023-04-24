import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../Actions/OrderActions";
import OrderCard from "../OrderCard/OrderCard";
import "./Order.scss";
const Orders = () => {
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  useEffect(() => {
    async function init() {
      await dispatch(getOrders(user._id));
    }
    init();
  }, []);

  return (
    <div className="ordr-box">
      <div className="ordr-list">
        {orders && orders.length > 0 ? (
          <>
            {orders.map((item) => {
              return <OrderCard order={item} key={item._id} isAdmin={false} />;
            })}
          </>
        ) : (
          <p>No Order</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
