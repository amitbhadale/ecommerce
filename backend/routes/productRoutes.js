const express = require("express");
const {
  addProduct,
  getProducts,
  getProductDetails,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

router.route("/product/add").post(addProduct);
router.route("/products").get(getProducts);
router
  .route("/products/:id")
  .get(getProductDetails)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;
