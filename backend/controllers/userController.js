const User = require("../models/UserModel");

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, mobile } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    user = await User.create({
      firstName,
      lastName,
      mobile,
      email,
      password,
      address: [],
      orders: [],
    });

    const token = await user.generateToken();
    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 1000),
      httpOnly: true,
    };

    res
      .status(201)
      .cookie("token", token, options)
      .json({ success: true, user });
  } catch (e) {
    res.status(500).json({
      success: false,
      messsage: e.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email }).select("+password");

    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User does not found" });

    const isMatch = await user.matchPasssword(password);

    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: "Password does not match" });

    const token = await user.generateToken();
    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 1000),
      httpOnly: true,
    };

    res
      .status(201)
      .cookie("token", token, options)
      .json({ success: true, user });
  } catch (e) {
    res.status(500).json({
      success: false,
      messsage: e.message,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
      .json({ success: true, message: "Logged out" });
  } catch (e) {
    res.status(500).json({
      success: false,
      messsage: e.message,
    });
  }
};

exports.getLoggedUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({ success: true, user });
  } catch (e) {
    res.status(500).json({
      success: false,
      messsage: e.message,
    });
  }
};

exports.addAddress = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User does not found" });

    const address = req.body;
    user.address.push(address);
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Address added successfully" });
  } catch (e) {
    res.status(500).json({
      success: false,
      messsage: e.message,
    });
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User does not found" });

    const index = req.params.index;
    user.address.splice(index, 1);
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "Address deleted successfully" });
  } catch (e) {
    res.status(500).json({
      success: false,
      messsage: e.message,
    });
  }
};

exports.updateCart = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.cart = req.body;
    await user.save();

    res.status(200).json({ success: true, user });
  } catch (e) {
    res.status(500).json({
      success: false,
      messsage: e.message,
    });
  }
};
