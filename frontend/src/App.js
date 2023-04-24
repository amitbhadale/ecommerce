import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import Header from "./Components/Header/Header";
import Dashboard from "./Components/Admin/Dashboard/Dashboard";
import Products from "./Components/Admin/Products/Products";
import Category from "./Components/Admin/Category/Category";
import { Orders as AllOrders } from "./Components/Admin/Orders/Orders";
import { Products as ProductsList } from "./Components/Products/Products";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import Cart from "./Components/Cart/Cart";
import {
  addToCartAction,
  saveCartToDB,
  totalValue,
} from "./Actions/CartActions";
import { useDispatch, useSelector } from "react-redux";
import Checkout from "./Components/Checkout/Checkout";
import Users from "./Components/Admin/Users/Users";
import Login from "./Components/Login/Login";
import { loadUser } from "./Actions/UserActions";
import { createBrowserHistory } from "history";
import Overview from "./Components/Profile/Overview/Overview";
import { Dashboard as ProfileDashboard } from "./Components/Profile/Dashboard/Dashboard";
import Address from "./Components/Profile/Address/Address";
import Payment from "./Components/Payment/Payment";
import Orders from "./Components/Orders/Orders";
import Alertaz from "./Components/Alertaz/Alertaz";
function App() {
  const dispatch = useDispatch();
  const {
    isAuth,
    user,
    message: userMessage,
  } = useSelector((state) => state.user);
  const customHistory = createBrowserHistory();
  const { cart: stateCart, message: cartMessage } = useSelector(
    (state) => state.cart
  );
  const [allMessages, setAllMessages] = useState([{}]);
  //set cart value on init
  useEffect(() => {
    if (isAuth) {
      //if user is login
      const localCart = JSON.parse(localStorage.cart);
      //combine the local and db cart
      if (localCart.length > 0) {
        // means cart have items
        const combined = user.cart.concat(localCart);

        let newArray = [];
        let uniqueObject = {};

        for (let i in combined) {
          const objId = combined[i]["id"];
          uniqueObject[objId] = combined[i];
        }
        for (let i in uniqueObject) {
          newArray.push(uniqueObject[i]);
        }

        dispatch(addToCartAction(newArray));
        console.log("called from here");
        dispatch(saveCartToDB(user._id, newArray));
      } else {
        dispatch(addToCartAction(user.cart));
      }
    } else {
      if (!localStorage.cart) {
        const cart = [];
        localStorage.setItem("cart", JSON.stringify(cart));
        dispatch(addToCartAction(cart));
      } else {
        dispatch(addToCartAction(JSON.parse(localStorage.cart)));
      }
    }
  }, [isAuth]);

  useEffect(() => {
    if (userMessage) {
      const obj = { type: "success", message: userMessage.message };
      setAllMessages(allMessages.concat(obj));
    } else if (cartMessage) {
      const obj = { type: "success", message: cartMessage.message };
      setAllMessages(allMessages.concat(obj));
    } else {
      setAllMessages([]);
    }
  }, [userMessage, cartMessage]);

  //set totalvalue value on init based on cart value
  useEffect(() => {
    if (!localStorage.totalValue) {
      //calculate total value calculations
      if (stateCart && stateCart.lenght !== 0) {
        const a = stateCart.map((i) => {
          return {
            ...i,
            total: i.price * i.quantity,
          };
        });
        if (a.length > 0) {
          const sum = a
            .map((x) => x.total)
            .reduce((j, k) => {
              return j + k;
            });
          dispatch(totalValue(sum));
        }
      }
    } else {
      dispatch(totalValue(localStorage.totalValue));
    }
  }, [stateCart]);

  useEffect(() => {
    //load logedin user details
    dispatch(loadUser());
    // console.log("history", customHistory);
  }, []);

  // const { isAuth } = useSelector((state) => state.user);

  return (
    <Router history={customHistory}>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsList />}></Route>
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={isAuth ? <Orders /> : <Login />} />
          <Route path="/login" element={isAuth ? <Home /> : <Login />} />
          <Route path="/register" element={<Login />} />
          <Route
            path="/checkout/address"
            element={isAuth ? <Checkout /> : <Login />}
          />
          <Route
            path="/checkout/payment"
            element={isAuth ? <Payment /> : <Login />}
          />
          <Route path="/my" element={isAuth ? <ProfileDashboard /> : <Login />}>
            <Route path="profile" element={isAuth ? <Overview /> : <Login />} />
            <Route path="address" element={isAuth ? <Address /> : <Login />} />
          </Route>
          <Route path="/admin" element={<Dashboard />}>
            <Route path="admin" element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="category" element={<Category />} />
            <Route path="users" element={<Users />} />
            <Route path="orders" element={<AllOrders />} />
          </Route>
        </Routes>
        {/* <Alertaz messageGroup={allMessages}></Alertaz> */}
      </div>
    </Router>
  );
}

export default App;
