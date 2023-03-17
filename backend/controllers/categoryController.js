const Category = require("../models/CategoryModel");

exports.addCategory = async (req, res) => {
  try {
    const category = req.body;
    const data = await Category.create(category);

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

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      success: true,
      categories,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

exports.getCategoryDetails = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    res.status(200).json({
      success: true,
      category,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "Record updated successfully",
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Record Deleted successfully",
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};
