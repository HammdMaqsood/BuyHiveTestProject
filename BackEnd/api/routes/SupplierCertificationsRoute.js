const express = require("express");
const router = express.Router();
const SupplierController = require("../controllers/SupplierCertificationController");

router.post("/", SupplierController.SupplierCertifications_create);

module.exports = router;
