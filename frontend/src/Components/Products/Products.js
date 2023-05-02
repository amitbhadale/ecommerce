import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../Actions/ProductActions";
import Loader from "../Admin/Loader/Loader";
import ProductCard from "../ProductCard/ProductCard";
import "./Products.scss";
export const Products = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadInit() {
      await dispatch(getProducts());
    }
    loadInit();
  }, []);

  const { products, loading } = useSelector((state) => state.product);
  const [sortVal, setSortVal] = useState("");
  const [productsCopy, setProductsCopy] = useState(products ? products : []);

  useEffect(() => {
    //sorting
    if (productsCopy) {
      if (sortVal === "lth") {
        const sorted = productsCopy.sort((i, j) => {
          return i.price * 1 - j.price * 1;
        });
        setProductsCopy([...sorted]);
      } else if (sortVal === "htl") {
        const sorted = productsCopy.sort((i, j) => {
          return j.price * 1 - i.price * 1;
        });
        setProductsCopy([...sorted]);
      }
    }
  }, [sortVal]);

  useEffect(() => {
    if (products) {
      setProductsCopy(
        products.map((product) => {
          return {
            ...product,
          };
        })
      );
    }
  }, [products]);

  // useEffect(() => {
  //   console.log("productsCopy updated", productsCopy);
  // }, [productsCopy]);

  return (
    <div className="prod-container">
      <div className="sort-sec">
        <div className="search">
          <input type="text" placeholder="Search Product Name" />
          <button>Search</button>
        </div>
        <div className="sort-by">
          <label>Sort By</label>
          <select
            name="sortby"
            onChange={(e) => setSortVal(e.target.value)}
            value={sortVal}
          >
            <option value="lth">Price Low To High</option>
            <option value="htl">Price High to Low</option>
            <option value="rate">Ratings</option>
          </select>
        </div>
        <div className="ppp-dropdown">
          <label>Products per page</label>
          <select name="ppp">
            <option value="10">10</option>
            <option value="10">20</option>
            <option value="10">30</option>
          </select>
        </div>
      </div>
      <div className="prod-left">
        {
          //section for filters
        }
      </div>
      <div className="prod-right">
        <div className="prod-list-section">
          {loading ? (
            <Loader />
          ) : (
            <>
              {productsCopy && productsCopy.length > 0 ? (
                productsCopy.map((item, i) => {
                  return <ProductCard prod={item} key={i} />;
                })
              ) : (
                <p>No products found</p>
              )}
              <ProductCard prod="dummy" />
              <ProductCard prod="dummy" />
              <ProductCard prod="dummy" />
              <ProductCard prod="dummy" />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
