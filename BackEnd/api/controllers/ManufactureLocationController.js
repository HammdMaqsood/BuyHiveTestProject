const mongoose = require("mongoose");

const mlocation = require("../models/ManufactureLocationModel");

exports.ManufactureLocation_create = async (req, res, next) => {
  try {
    const product = new mlocation({
      MLocation_id: new mongoose.Types.ObjectId(),
      MLocation_name: req.body.MLocation_name,
    });
    const result = await product.save();
    res.status(201).json({
      message: "Product created successfully",
      createdProduct: {
        MLocation_id: result.MLocation_id,
        MLocation_name: result.MLocation_name,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
};
