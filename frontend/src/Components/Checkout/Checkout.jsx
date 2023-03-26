import React from "react";
import "./Checkout.scss";

const Checkout = () => {
  return (
    <div className="co-box">
      <div className="co-left">
        <div className="address-box">
          <div className="rw">
            <h3>Select Delivery Address</h3>
            <button>Add New Address</button>
          </div>
          <div className="address-list">
            <div className="address-card">
              <h5>Amit Bhadale</h5>
              <p>
                Flat 6, Krushnakunj Building, Kasturi chowk, near Vinode Cycle
                world, Wakad
              </p>
              <p>
                Pune, Maharashtra - <span>411057</span>
              </p>
              <div className="mobile">
                <p>
                  Mobile: <span>9967576639</span>
                </p>
              </div>
              <div className="address-cta-box">
                <button>Remove</button>
                <button>Edit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="co-right"></div>
    </div>
  );
};

export default Checkout;
