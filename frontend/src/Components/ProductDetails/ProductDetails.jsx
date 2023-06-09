import React, { useEffect, useState } from "react";
import "./ProductDetails.scss";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../Actions/ProductActions";
import { addToCartAction, saveCartToDB } from "../../Actions/CartActions";
import { updateFav } from "../../Actions/UserActions";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state) => state.user);
  let { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    if (id) {
      async function loadInit() {
        await dispatch(getProductDetails(id));
      }
      loadInit();
    }

    return () => {
      id = null;
      product = null;
    };
  }, [id]);

  useEffect(() => {
    //check if product is already a favourite
    if (isAuth && user && id) {
      const indx = user.favourite.map((item) => item._id).indexOf(id);
      setIsFavourite(!(indx === -1));
    }
  }, [isAuth, user, id]);

  let { product } = useSelector((state) => state.product);

  const addtoCart = async () => {
    //TODO: if user is logged in then call addtocart api else save on localstorage

    let cartItems = JSON.parse(localStorage.cart);
    const prodObj = {
      id,
      name: product.name,
      price: product.price,
      quantity,
    };

    //check if item exists in cart
    const indx = cartItems.map((item) => item.id).indexOf(id);

    if (indx === -1) {
      //item doesnt exists, add new
      cartItems.push(prodObj);
    } else {
      //item exists, replace with its index
      cartItems[indx] = prodObj;
    }
    dispatch(addToCartAction(cartItems));
    localStorage.setItem("cart", JSON.stringify(cartItems));

    if (isAuth) {
      //save cart to DB
      await dispatch(saveCartToDB(user._id, cartItems));
    }
  };
  const moveToFav = async () => {
    const fav = [...user.favourite];
    //check if exists
    const indx = fav.map((item) => item.id).indexOf(id);

    if (indx === -1) {
      //item doesnt exists, add new
      fav.push({ _id: id });
    } else {
      //item exists, replace with its index
      fav[indx] = { _id: id };
    }
    await dispatch(updateFav(user._id, fav));
  };
  const removeFav = async () => {
    const fav = [...user.favourite];
    const indx = fav.map((item) => item.id).indexOf(id);
    fav.splice(indx, 1);
    await dispatch(updateFav(user._id, fav));
  };
  return (
    <>
      <div>
        {product ? (
          <>
            <div className="prod-details-container">
              <div className="pd-left">
                {product.images && product.images.length > 0 ? (
                  product.images.map((image, i) => {
                    const { url, _id } = image;
                    return (
                      <div className="img-box" key={i}>
                        <img src={url} alt="Product Image" />{" "}
                      </div>
                    );
                  })
                ) : (
                  <img src="https://dummyimage.com/550x650/444/fff" alt="" />
                )}
              </div>
              <div className="pd-right">
                <div className="pd-title">
                  <h3>{product.name}</h3>
                </div>
                <hr />
                <div className="pd-rating"></div>
                <div className="pd-price">
                  <h4>Rs. {product.price}/-</h4>
                  <p>(inclusive of all taxes)</p>
                </div>
                <div className="pd-quantity">
                  <button
                    onClick={() =>
                      quantity !== product.quantity
                        ? setQuantity(quantity + 1)
                        : false
                    }
                  >
                    +
                  </button>
                  <span> {quantity} </span>
                  <button
                    onClick={() =>
                      quantity !== 1 ? setQuantity(quantity - 1) : false
                    }
                  >
                    -
                  </button>
                </div>
                <div className="pd-cta-box">
                  <button className="pd-cta" onClick={() => addtoCart()}>
                    Add to Cart
                  </button>
                  <button
                    className={isFavourite ? "pd-cta fav" : "pd-cta"}
                    disabled={!isAuth}
                    onClick={() => (isFavourite ? removeFav() : moveToFav())}
                  >
                    Favourite
                  </button>
                </div>
                <div className="pd-desc">{product.description}</div>
                <div className="avlbl">Available: {product.quantity}</div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default ProductDetails;
