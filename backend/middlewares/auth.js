const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
exports.isAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Kindly login first" });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id);
    next();
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};
