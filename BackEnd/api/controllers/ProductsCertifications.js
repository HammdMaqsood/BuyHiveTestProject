const mongoose = require("mongoose");
// const Product = require("../models/product");
const productcert=require("../models/ProductCertifications");



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



exports.ProductCertifications_create_product = (req, res, next) => {
  const product = new productcert({
    Pcert_id: new mongoose.Types.ObjectId(),
    Pcert_name: req.body.Pcert_name,
  });
  product.save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: 'Product created successfully',
        createdProduct: {
          Pcert_id: result.Pcert_id,
          Pcert_name: result.Pcert_name,
          
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

exports.products_get_product = (req, res, next) => {
  var name = req.params.productname;
  console.log("name abefore", name);
  name = name.replace(/-/g, " ");
  console.log("name after", name);
  Product.findOne({ name: name })
    .select(
      "name price _id Image piece  MainCat MOQ P_cert S_cert  isUsa ManufactureLocation  Category "
    )
    .exec()
    .then((doc) => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          product: doc,
          request: {
            type: "GET",
            url: "http://localhost:5000/products",
          },
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided Category" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

