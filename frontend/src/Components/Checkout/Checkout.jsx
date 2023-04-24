import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Checkout.scss";
import { useDispatch, useSelector } from "react-redux";
import { addressSelect } from "../../Actions/OrderActions";
import AddressModal from "../Profile/Address/AddressModal";
import "../Profile/Address/AddressModal.scss";

const Checkout = () => {
  const dispatch = useDispatch();
  const { user, isAuth } = useSelector((state) => state.user);
  const { totalValue } = useSelector((state) => state.cart);
  const [selectedCard, setSelectedCard] = useState(
    user && user.address && user.address.length > 0 ? 0 : null
  );
  const [modalOpen, setModalOpen] = useState(false);
  const modalToggle = (val) => {
    setModalOpen(val);
  };
  const selectCard = (i) => {
    setSelectedCard(i);
    dispatch(addressSelect(user.address[i]));
  };

  useEffect(() => {
    dispatch(addressSelect(user.address[selectedCard]));
  }, [selectedCard]);

  const ctaAction = () => {
    console.log("cta action");
  };

  return (
    <div className="co-box">
      <div className="co-left">
        <div className="address-box">
          <div className="rw">
            <h3>Select Delivery Address</h3>
            <button onClick={() => modalToggle(true)}>Add New Address</button>
          </div>
          <div className="address-list">
            {user && user.address && user.address.length > 0 ? (
              user.address.map((item, i) => {
                const { addressLine, city, pin, state } = item;
                return (
                  <div
                    key={i}
                    className={
                      i === selectedCard
                        ? "address-card selected"
                        : "address-card"
                    }
                  >
                    <input
                      type="radio"
                      name="address"
                      id={i}
                      onChange={() => selectCard(i)}
                      checked={i === selectedCard ? true : false}
                    />
                    <h4>
                      {user.firstName} {user.lastName}
                    </h4>
                    <p>{addressLine}</p>
                    <p>
                      {city}, {state} - <span>{pin}</span>
                    </p>
                    <div className="mobile">
                      <p>
                        Mobile: <span>{user.mobile}</span>
                      </p>
                    </div>
                    <div className="address-cta-box">
                      <button onClick={ctaAction}>Remove</button>
                      <button onClick={ctaAction}>Edit</button>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>No records found</p>
            )}
          </div>
        </div>
      </div>
      <div className="co-right">
        <div className="calculations">
          <h4>Price Details</h4>
          <div className="price-breakup-box">
            <div className="rw">
              <p>Total MRP</p>
              <p>Rs. {totalValue}</p>
            </div>
            <div className="rw">
              <p>Std. Discount</p>
              <p>-{totalValue / 10}</p>
            </div>
          </div>
          <hr />
          <div className="total-box">
            <div className="rw">
              <h3>Total Amount</h3>
              <h3>Rs. {totalValue - totalValue / 10}</h3>
            </div>
            <div className="rw">
              <div className="chckout-cta">
                <Link
                  style={{
                    backgroundColor: selectedCard === null ? "#ddd" : "#673ab7",
                  }}
                  to={
                    isAuth && selectedCard !== null
                      ? "/checkout/payment"
                      : isAuth && selectedCard === null
                      ? ""
                      : "/login"
                  }
                >
                  {isAuth && selectedCard !== null
                    ? "MAKE PAYMENT"
                    : isAuth && selectedCard === null
                    ? "ADD ADDRESS TO CONTINUE"
                    : "LOGIN TO CONTINUE"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddressModal
        modalOpen={modalOpen}
        closeModal={modalToggle}
      ></AddressModal>
    </div>
  );
};

export default Checkout;
