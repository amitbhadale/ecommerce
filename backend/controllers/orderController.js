const Order = require("../models/OrderModal");
const User = require("../models/UserModel");

exports.createOrder = async (req, res) => {
  try {
    const orderObj = req.body;
    const newOrder = await Order.create(orderObj);
    const user = await User.findById(req.body.user);

    user.orders.push(newOrder._id);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Order Placed",
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.id }).sort({ _id: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ _id: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    await Order.findByIdAndUpdate(req.params.id, { status: req.body.status });

    res.status(200).json({
      success: true,
      message: "Status updated Successfully",
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};
