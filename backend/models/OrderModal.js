const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "user id is required"],
  },
  shippingDetails: {
    addressLine: { type, String, required: true },
    city: { type, String, required: true },
    state: { type, String, required: true },
    country: { type: String, Default: "India" },
  },
  items: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    },
  ],
  totalValue: { type: Number, required: true },
  paymentInfo: {
    status: { type: String, required: true },
    paidAt: { type: Date, required: true },
  },
  status: { type: String, Default: "Processing" },
  createdAt: { type: Date, Default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
