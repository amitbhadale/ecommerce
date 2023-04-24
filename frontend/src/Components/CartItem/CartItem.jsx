import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAction, saveCartToDB } from "../../Actions/CartActions";
import "./CartItem.scss";
const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState([]);
  const { cart } = useSelector((state) => state.cart);
  const { isAuth, user } = useSelector((state) => state.user);
  useEffect(() => {
    if (cart) {
      setCartItems(cart);
    }
  }, [cart]);
  useEffect(() => {
    console.log("item", item);
  }, [item]);

  const updateQty = async (id, act) => {
    const copy = [...cartItems];
    copy.forEach((elm, i) => {
      if (elm.id === id) {
        const t =
          act === "add"
            ? { ...elm, quantity: elm.quantity + 1 }
            : { ...elm, quantity: elm.quantity - 1 };
        copy[i] = t;
      }
    });

    localStorage.setItem("cart", JSON.stringify(copy));
    dispatch(addToCartAction(copy));
    if (isAuth) {
      //save cart to DB
      await dispatch(saveCartToDB(user._id, copy));
    }
  };
  const removeFromCartHandler = async (id) => {
    if (window.confirm("Do you want to remove this item?") === true) {
      const copy = [...cartItems];

      copy.forEach((elm, i) => {
        if (elm.id === id) {
          copy.splice(i, 1);
        }
      });

      localStorage.setItem("cart", JSON.stringify(copy));
      dispatch(addToCartAction(copy));
      if (isAuth) {
        //save cart to DB
        await dispatch(saveCartToDB(user._id, copy));
      }
    }
  };
  return (
    <div className="crt-itm-box">
      <div className="left">
        <img src="https://dummyimage.com/111x148/111/fff" alt="" />
      </div>
      <div className="right">
        <h3>{item.name}</h3>
        <div className="qty">
          <button onClick={() => updateQty(item.id, "add")}>+</button>
          <span> {item.quantity} </span>
          <button
            onClick={() =>
              item.quantity !== 1 ? updateQty(item.id, "remove") : false
            }
          >
            -
          </button>
        </div>
        <div className="price">
          <h5>Rs. {(item.price * item.quantity).toLocaleString("en-IN")} /-</h5>
        </div>
        <div className="remove">
          <button onClick={() => removeFromCartHandler(item.id)}>Remove</button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
