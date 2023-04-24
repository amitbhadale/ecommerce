import React, { useState } from "react";
import "./AddressModal.scss";
import { useDispatch, useSelector } from "react-redux";
import { addAddress, loadUser } from "../../../Actions/UserActions";

const AddressModal = ({ modalOpen, closeModal }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pin, setPin] = useState(0);
  const [state, setState] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(
      addAddress(user._id, {
        addressLine: address,
        city,
        pin,
        state,
      })
    );
    await dispatch(loadUser());
    closeModal(false);
  };
  return (
    <div className={modalOpen ? "modal-box show" : "modal-box hide"}>
      <div className="content">
        <span className="closebtn" onClick={() => closeModal(false)}>
          Close
        </span>

        <div className="adrs-form">
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              type="text"
              placeholder="City/Town"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              type="number"
              placeholder="Pin"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />
            <input
              type="text"
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
