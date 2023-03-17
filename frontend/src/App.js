import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import Header from "./Components/Header/Header";
import Dashboard from "./Components/Admin/Dashboard/Dashboard";
import Products from "./Components/Admin/Products/Products";
import Category from "./Components/Admin/Category/Category";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
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
