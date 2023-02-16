const express = require("express");
const router = express.Router();
const ManufactureLocationController = require("../controllers/ManufactureLocation_controller");

router.post("/", ManufactureLocationController.ManufactureLocation_create);

module.exports = router;
