const express = require("express");
const router = express.Router();
const SupplierController=require('../controllers/SupplierCertification');



// router.get("/", ProductsCertificationsController.ProductCertifications_get_all);

router.post("/",SupplierController.SupplierCertifications_create);

// router.get("/:productname", ProductsController.products_get_product);

// router.patch("/:productId", checkAuth, ProductsController.products_update_product);

// router.delete("/:productId", checkAuth, ProductsController.products_delete);

module.exports = router;