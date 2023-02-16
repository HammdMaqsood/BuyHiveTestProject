const mongoose = require("mongoose");
const productcert = require("../models/ProductCertifications_model");

exports.ProductCertifications_create_product = async (req, res, next) => {
  try {
    const product = new productcert({
      Pcert_id: new mongoose.Types.ObjectId(),
      Pcert_name: req.body.Pcert_name,
    });
    const result = await product.save();
    res.status(201).json({
      message: "Product Certification created successfully",
      createdProduct: {
        Pcert_id: result.Pcert_id,
        Pcert_name: result.Pcert_name,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
};
