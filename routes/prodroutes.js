const express = require("express");

const {
  createProduct,
  fetchproduct,
  singleproduct,
} = require("../controllers/prodControllers");

const router = express.Router();

router.route("/register-product").post(createProduct);
router.route("/fetch-product").get(fetchproduct);
router.route("/single-product/:id").get(singleproduct);

module.exports = router;
