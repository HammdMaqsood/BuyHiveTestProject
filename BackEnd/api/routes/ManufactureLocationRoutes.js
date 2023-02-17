const express = require("express");
const router = express.Router();
const ManufactureLocationController = require("../controllers/ManufactureLocationController");

router.post("/", ManufactureLocationController.ManufactureLocation_create);

module.exports = router;
