import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../../../Actions/CategoryActions";
import "./Alert.scss";
const Alert = () => {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.product);
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
