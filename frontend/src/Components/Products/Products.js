import React, { useEffect } from "react";
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
  useEffect(() => {
    // console.log(loading, products);
  }, [products, loading]);

  return (
    <div className="prod-container">
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
              {products && products.length > 0 ? (
                products.map((item, i) => {
                  return <ProductCard prod={item} key={i} />;
                })
              ) : (
                <p>No products found</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
