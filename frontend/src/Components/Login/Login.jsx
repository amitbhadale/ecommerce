import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, register } from "../../Actions/UserActions";
import "./Login.scss";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailRg, setEmailRg] = useState("");
  const [mobile, setMobile] = useState("");
  const [passwordRg, setPasswordRg] = useState("");

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const registerHandeler = async (e) => {
    e.preventDefault();
    const obj = {
      firstName,
      lastName,
      email: emailRg,
      mobile,
      password: passwordRg,
    };
    await dispatch(register(obj));
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    await dispatch(login({ email, password: pass }));
    navigate(-1);
  };

  const toggleTab = (val) => {
    setIsLogin(val === "login" ? true : false);
  };
  return (
    <div className="login-box">
      <div className="tab-head">
        <p
          onClick={() => toggleTab("login")}
          className={isLogin === true ? "active" : ""}
        >
          Login
        </p>
        <p
          onClick={() => toggleTab("reg")}
          className={isLogin === false ? "active" : ""}
        >
          Register
        </p>
      </div>
      <div className="form-box">
        <div className={isLogin ? "login-tab show" : "login-tab"}>
          <form onSubmit={loginHandler}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name=""
              id=""
              placeholder="Password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
        </div>
        <div className={isLogin === false ? "reg-tab show" : "reg-tab"}>
          <form onSubmit={registerHandeler}>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              placeholder="First Name"
              required
            />
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              placeholder="Last Name"
              required
            />
            <input
              value={emailRg}
              onChange={(e) => setEmailRg(e.target.value)}
              type="email"
              placeholder="Email"
              required
            />
            <input
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              type="number"
              placeholder="Mobile Number"
              required
            />
            <input
              value={passwordRg}
              onChange={(e) => setPasswordRg(e.target.value)}
              type="password"
              placeholder="Password"
              required
            />
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
