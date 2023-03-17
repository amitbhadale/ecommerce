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
  price: {
    type: Number,
    required: [true, "Kindly enter price value"],
  },
});

module.exports = mongoose.model("Product", productSchema);
