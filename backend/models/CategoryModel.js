const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Kindly add category name"],
  },
});

module.exports = mongoose.model("Category", categoriesSchema);
