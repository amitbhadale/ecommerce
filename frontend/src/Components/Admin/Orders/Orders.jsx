import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import Alert from "../Alert/Alert";
import { getAllOrders } from "../../../Actions/OrderActions";
import OrderCard from "../../OrderCard/OrderCard";

export const Orders = () => {
  const dispatch = useDispatch();
  const { loading, orders } = useSelector((state) => state.order);
  useEffect(() => {
    async function fetchData() {
      await dispatch(getAllOrders());
    }
    fetchData();
  }, []);

  return (
    <div className="container-main">
      <div className="list-section">
        {loading ? (
          <Loader />
        ) : (
          <>
            {orders && orders.length > 0 ? (
              <>
                {orders.map((item) => {
                  return (
                    <OrderCard order={item} key={item._id} isAdmin={true} />
                  );
                })}
              </>
            ) : (
              <p>No Order</p>
            )}
          </>
        )}
      </div>

      <Alert />
    </div>
  );
};
