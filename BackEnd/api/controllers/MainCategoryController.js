const mongoose = require("mongoose");

const MainCategory = require("../models/MainCategoryModel");

exports.mainCategory_get_all = async (req, res, next) => {
  try {
    const docs = await MainCategory.find()
      .select("MainCategoty_id MainCategory_name subcategories")
      .exec();

    res.status(200).json({
      count: docs.length,
      MainCategories: docs.map((doc) => {
        return {
          MainCategoty_id: doc.MainCategoty_id,
          MainCategory_name: doc.MainCategory_name,
          subcategories: doc.subcategories,
        };
      }),
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

exports.mainCategory_create = async (req, res, next) => {
  try {
    const mainCategory = new MainCategory({
      MainCategoty_id: mongoose.Types.ObjectId(),
      MainCategory_name: req.body.MainCategory_name,
      subcategories: req.body.subcategories,
    });

    const result = await mainCategory.save();

    res.status(201).json({
      message: "Created MainCategory successfully",
      createdMainCategory: {
        MainCategoty_id: result.MainCategoty_id,
        MainCategory_name: result.MainCategory_name,
        subcategories: result.subcategories,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
};
