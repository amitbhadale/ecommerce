import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../../../Actions/CategoryActions";
import "./Alert.scss";
const Alert = () => {
  const dispatch = useDispatch();
  const { message: productMessage } = useSelector((state) => state.product);
  const { message: orderMessage } = useSelector((state) => state.order);

  const [message, setMessage] = useState(productMessage || orderMessage);

  useEffect(() => {
    setMessage(productMessage || orderMessage);
  }, [productMessage, orderMessage]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(clearMessage());
    }, 5000);
  }, [message]);

  return (
    <div className={message ? "alert-box show" : "alert-box hide"}>
      <span className="closebtn">&times;</span>
      {message}
    </div>
  );
};

export default Alert;
