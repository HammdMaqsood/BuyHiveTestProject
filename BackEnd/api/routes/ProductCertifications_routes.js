const express = require("express");
const router = express.Router();
const ProductsCertificationsController = require("../controllers/ProductsCertifications_controllers");

router.post(
  "/",
  ProductsCertificationsController.ProductCertifications_create_product
);

module.exports = router;
