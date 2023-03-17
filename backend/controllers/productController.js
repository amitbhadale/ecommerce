const Product = require("../models/ProductModel");

exports.addProduct = async (req, res) => {
  try {
    const product = req.body;
    const data = await Product.create(product);

    res.status(200).json({
      success: true,
      message: data,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.status(200).json({
      success: true,
      products: products,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

exports.getProductDetails = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    res.status(200).json({
      success: true,
      product: product,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "Prodcut updated Successfully",
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Prodcut deleted Successfully",
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};
