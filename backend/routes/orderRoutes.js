const express = require("express");
const {
  createOrder,
  getOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const router = express.Router();

router.route("/order/add").post(createOrder);
router.route("/order/get/:id").get(getOrders);
router.route("/order").get(getAllOrders);
router.route("/order/update/:id").put(updateOrderStatus);

module.exports = router;
