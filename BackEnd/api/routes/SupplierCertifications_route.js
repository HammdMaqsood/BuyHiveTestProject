const express = require("express");
const router = express.Router();
const SupplierController = require("../controllers/SupplierCertification_controller");

router.post("/", SupplierController.SupplierCertifications_create);

module.exports = router;
