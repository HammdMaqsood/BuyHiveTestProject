const mongoose = require("mongoose");
// const Product = require("../models/product");
// const productcert=require("../models/ProductCertifications");
const suppliercert = require("../models/SupplierCertifcations");

// exports.ProductCertifications_get_all = (req, res, next) => {
//   Product.find()
//   .select('_id name price Image MOQ isUsa piece MainCategory_id subcategory_id')
//   .populate('MainCategory_id', 'MainCategoryname subcategories')
//     .exec()
//     .then(docs => {
//       const response = {
//         count: docs.length,
//         products: docs.map(doc => {
//           return {
//             _id: doc._id,
//             name: doc.name,
//             price: doc.price,
//             Image: doc.Image,
//             MOQ: doc.MOQ,
//             isUsa: doc.isUsa,
//             piece: doc.piece,
//             MainCategory_id: doc.MainCategory_id,
//             request: {
//               type: 'GET',
//               url: 'http://localhost:3000/products/' + doc._id
//             }
//           }
//         })
//       };
//       res.status(200).json(response);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({
//         error: err
//       });
//     });
// };

exports.SupplierCertifications_create = (req, res, next) => {
  const product = new suppliercert({
    Scert_id: new mongoose.Types.ObjectId(),
    Scert_name: req.body.Scert_name,
  });
  product
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Product created successfully",
        createdProduct: {
          Scert_id: result.Scert_id,
          Scert_name: result.Scert_name,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
