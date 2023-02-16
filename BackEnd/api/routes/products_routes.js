const express = require("express");
const router = express.Router();
const ProductsController = require("../controllers/products_controllers");

router.get("/", ProductsController.products_get_all);

router.post("/", ProductsController.products_create_product);

module.exports = router;
