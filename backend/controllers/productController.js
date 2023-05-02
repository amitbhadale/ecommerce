const Product = require("../models/ProductModel");
const cloudinary = require("cloudinary");

exports.addProduct = async (req, res) => {
  try {
    let images = req.body.images;
    const imagesLinks = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.uploader.upload(images[i], {
        folder: "Products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    const prodObj = {
      ...req.body,
      images: imagesLinks,
    };
    const product = req.body;
    const data = await Product.create(prodObj);

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
    let images = req.body.images;
    const imagesLinks = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.uploader.upload(images[i], {
        folder: "Products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    const prodObj = {
      ...req.body,
      images: imagesLinks,
    };

    const product = await Product.findByIdAndUpdate(req.params.id, prodObj);
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
