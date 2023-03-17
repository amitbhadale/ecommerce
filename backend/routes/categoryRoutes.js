const express = require("express");
const {
  addCategory,
  getCategories,
  getCategoryDetails,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const router = express.Router();

router.route("/category/add").post(addCategory);
router.route("/category").get(getCategories);
router
  .route("/category/:id")
  .get(getCategoryDetails)
  .put(updateCategory)
  .delete(deleteCategory);

module.exports = router;
