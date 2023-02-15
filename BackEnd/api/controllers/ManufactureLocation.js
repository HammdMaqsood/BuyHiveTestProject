const mongoose = require("mongoose");
// const Product = require("../models/product");
// const productcert=require("../models/ProductCertifications");
// const suppliercert=require("../models/SupplierCertifcations");
const mlocation=require("../models/ManufactureLocation");




exports.ManufactureLocation_create = (req, res, next) => {
  const product = new mlocation({
    MLocation_id: new mongoose.Types.ObjectId(),
    MLocation_name: req.body.MLocation_name,
  });
  product.save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: 'Product created successfully',
        createdProduct: {
          MLocation_id: result.MLocation_id,
          MLocation_name: result.MLocation_name,
          
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};



