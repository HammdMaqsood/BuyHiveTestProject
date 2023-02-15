const express = require("express");
const router = express.Router();
const ProductsController = require('../controllers/products');
const ProductsCertificationsController=require('../controllers/ProductsCertifications');



// router.get("/", ProductsCertificationsController.ProductCertifications_get_all);

router.post("/",ProductsCertificationsController.ProductCertifications_create_product);

// router.get("/:productname", ProductsController.products_get_product);

// router.patch("/:productId", checkAuth, ProductsController.products_update_product);

// router.delete("/:productId", checkAuth, ProductsController.products_delete);

module.exports = router;