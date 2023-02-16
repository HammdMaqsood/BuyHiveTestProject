const express = require("express");
const router = express.Router();
const MainCategoryController = require("../controllers/MainCategory_controller");

router.get("/", MainCategoryController.mainCategory_get_all);
router.post("/", MainCategoryController.mainCategory_create);

module.exports = router;
