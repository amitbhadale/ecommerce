const express = require("express");
const {
  register,
  getLoggedUser,
  login,
  logout,
} = require("../controllers/userController");

const router = express.Router();

const { isAuth } = require("../middlewares/auth");

router.route("/register").post(register);
router.route("/me").get(isAuth, getLoggedUser);
router.route("/login").post(login);
router.route("/logout").get(logout);

module.exports = router;
