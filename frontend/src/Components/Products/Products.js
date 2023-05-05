import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getProducts } from "../../Actions/ProductActions";
import Loader from "../Admin/Loader/Loader";
import ProductCard from "../ProductCard/ProductCard";
import "./Products.scss";
export const Products = () => {
  const dispatch = useDispatch();
  let { page } = useParams();
  const { products, loading, productCount } = useSelector(
    (state) => state.product
  );
  const [sortVal, setSortVal] = useState("");
  const [productsCopy, setProductsCopy] = useState(products ? products : []);
  const [ppp, setPpp] = useState(5);
  const [showNext, setShowNext] = useState(true);
  const [showPrev, setShowPrev] = useState(true);
  useEffect(() => {
    async function loadInit() {
      await dispatch(getProducts(ppp, parseInt(page)));
    }
    loadInit();
  }, [ppp, page]);

  useEffect(() => {
    let numberOfPages = productCount / ppp + 1;
    numberOfPages = parseInt(numberOfPages);
    setShowNext(page < numberOfPages ? true : false);
    setShowPrev(page * 1 === 1 ? false : true);
  }, [productCount, ppp, page]);

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
            {/* <option value="rate">Ratings</option> */}
          </select>
        </div>
        <div className="ppp-dropdown">
          <label>Products per page</label>
          <select
            name="ppp"
            value={ppp}
            onChange={(e) => setPpp(parseInt(e.target.value))}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
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
        <div className="pagination">
          {showPrev ? (
            <Link to={`../products/${parseInt(page) - 1}`}>PREV</Link>
          ) : null}
          {showNext ? (
            <>
              <a className="dummy"></a>
              <Link to={`../products/${parseInt(page) + 1}`}>NEXT</Link>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};
