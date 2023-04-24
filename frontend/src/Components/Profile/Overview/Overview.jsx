import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Overview.scss";

const Overview = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [fname, setFname] = useState(user ? user.firstName : "");
  const [lname, setLname] = useState(user ? user.lastName : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [mobile, setMobile] = useState(user ? user.mobile : "");
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="acc-box">
      <div className="profile-box">
        <form>
          <input
            disabled={!isEdit}
            type="text"
            placeholder="First Name"
            value={fname}
          />
          <input
            disabled={!isEdit}
            type="text"
            placeholder="Last Name"
            value={lname}
          />
          <input disabled={!isEdit} type="email" value={email} />
          <input disabled={!isEdit} type="number" value={mobile} />
        </form>
      </div>
    </div>
  );
};

export default Overview;
