const express = require("express");
const {
  register,
  getLoggedUser,
  login,
  logout,
  addAddress,
  updateCart,
  deleteAddress,
} = require("../controllers/userController");

const router = express.Router();

const { isAuth } = require("../middlewares/auth");

router.route("/register").post(register);
router.route("/me").get(isAuth, getLoggedUser);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/update/cart/:id").post(isAuth, updateCart);

router.route("/add/address/:id").post(isAuth, addAddress);
router.route("/remove/address/:id/:index").put(isAuth, deleteAddress);

module.exports = router;
