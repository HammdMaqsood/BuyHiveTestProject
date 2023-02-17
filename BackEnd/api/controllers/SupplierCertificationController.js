const mongoose = require("mongoose");

const suppliercert = require("../models/SupplierCertifcationsModel");

exports.SupplierCertifications_create = async (req, res, next) => {
  try {
    const product = new suppliercert({
      Scert_id: new mongoose.Types.ObjectId(),
      Scert_name: req.body.Scert_name,
    });
    const result = await product.save();
    console.log(result);
    res.status(201).json({
      message: "Supplier Cerification created successfully",
      createdProduct: {
        Scert_id: result.Scert_id,
        Scert_name: result.Scert_name,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
};
