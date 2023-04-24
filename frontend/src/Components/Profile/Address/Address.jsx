import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAddress, loadUser } from "../../../Actions/UserActions";
import "./Address.scss";
import AddressModal from "./AddressModal";

const Address = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [modalOpen, setModalOpen] = useState(false);
  const modalToggle = (val) => {
    setModalOpen(val);
  };
  const deleteAddressHandler = async (i) => {
    if (window.confirm("Do you want to delete the record?") === true) {
      await dispatch(deleteAddress(user._id, i));
      await dispatch(loadUser());
    }
  };
  return (
    <div className="adrs-box">
      <div className="headsec">
        <h3>Saved Addresse's</h3>
        <button onClick={() => modalToggle(true)}>Add New Address</button>
      </div>
      {user && user.address.length > 0 ? (
        <div className="adrs-list">
          {user.address.map((item, i) => {
            const { addressLine, city, pin, state, _id } = item;
            return (
              <div key={i} className="address-card">
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
                  <button onClick={() => deleteAddressHandler(i)}>
                    Remove
                  </button>
                  <button>Edit</button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p>No Address</p>
      )}

      <AddressModal
        modalOpen={modalOpen}
        closeModal={modalToggle}
      ></AddressModal>
    </div>
  );
};

export default Address;
