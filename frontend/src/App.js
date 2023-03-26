import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import Header from "./Components/Header/Header";
import Dashboard from "./Components/Admin/Dashboard/Dashboard";
import Products from "./Components/Admin/Products/Products";
import Category from "./Components/Admin/Category/Category";
import { Products as ProductsList } from "./Components/Products/Products";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import Cart from "./Components/Cart/Cart";
import { addToCartAction } from "./Actions/CartActions";
import { useDispatch } from "react-redux";
import Checkout from "./Components/Checkout/Checkout";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!localStorage.cart) {
      const cart = [];
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch(addToCartAction(cart));
    } else {
      dispatch(addToCartAction(JSON.parse(localStorage.cart)));
    }
  }, []);
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsList />}></Route>
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout/address" element={<Checkout />} />
          <Route path="/admin" element={<Dashboard />}>
            <Route path="admin" element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="category" element={<Category />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
