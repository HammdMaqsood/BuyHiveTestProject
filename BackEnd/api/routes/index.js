const express = require("express");
const router = express.Router();

const productRoutes = require("./producRoutes");
const ProductCertifications = require("./ProductCertificationsRoutes");
const ManufactureLocation = require("./ManufactureLocationRoutes");
const MainCategoryRoutes = require("./MainCategoryRoutes");
const SupplierCertifcations = require("./SupplierCertificationsRoute");

router.use("/products", productRoutes);
router.use("/MainCategory", MainCategoryRoutes);
router.use("/ProductCertifications", ProductCertifications);
router.use("/SupplierCertifications", SupplierCertifcations);
router.use("/ManufactureLocation", ManufactureLocation);

module.exports = router;
