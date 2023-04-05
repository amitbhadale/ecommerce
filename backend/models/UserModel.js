const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Kindly add First name"],
  },
  lastName: {
    type: String,
    required: [true, "Kindly add Last name"],
  },
  email: {
    type: String,
    required: [true, "Kindly add Email"],
  },
  mobile: {
    type: Number,
    required: [true, "Kindly add mobile number"],
  },
  password: {
    type: String,
    required: [true, "Kindly enter password"],
    minlength: [6, "password must be atleast 6 digit"],
    select: false,
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  address: [
    {
      addressLine: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, Default: "India" },
      isDefault: { type: Boolean, Default: false },
    },
  ],
  isAdmin: {
    type: Boolean,
    Default: false,
  },
});
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
userSchema.methods.matchPasssword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userSchema.methods.generateToken = async function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
};
module.exports = mongoose.model("User", userSchema);
