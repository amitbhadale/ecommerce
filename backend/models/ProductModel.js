const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Kindly provide product name"],
  },
  description: {
    type: String,
    required: [true, "Kindly enter product description"],
  },
  quantity: {
    type: Number,
    default: 0,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  images: [
    {
      public_id: { type: String, required: true },
      url: { type: String, required: true },
    },
  ],
  price: {
    type: Number,
    required: [true, "Kindly enter price value"],
  },
  rating: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Product", productSchema);
