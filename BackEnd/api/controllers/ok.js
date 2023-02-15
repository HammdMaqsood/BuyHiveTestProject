// exports.products_get_all = (req, res, next) => {
//   let condition = {};
//   for (const key in req.query) {
//     if (req.query.hasOwnProperty(key)) {
//       if (typeof req.query[key] === "string") {
//         condition[key] = req.query[key].replace(/_/g, " ");
//       } else {
//         condition[key] = req.query[key];
//       }
//     }
//   }

//   if (req.query.priceStart || req.query.priceEnd) {
//     condition.price = {};
//     if (req.query.priceStart) {
//       condition.price.$gte = parseInt(req.query.priceStart);
//     }
//     if (req.query.priceEnd) {
//       condition.price.$lte = parseInt(req.query.priceEnd);
//     }
//   }
//   if (req.query.MOQ) {
//     condition.MOQ = {};
//     condition.MOQ.$lte = parseInt(req.query.MOQ);
//   }
//   let sort = {};
//   if (req.query.sort === "hl") {
//     sort = { price: -1 };
//   } else if (req.query.sort === "lh") {
//     sort = { price: 1 };
//   } else if (req.query.sort === "MOQ") {
//     sort = { MOQ: 1};
//   } else if (req.query.sort === "Relevance") {
//     sort = {};
//   }
//   if (req.query.name) {
//     condition.name = { $regex: new RegExp(req.query.name, "i") };
//   }

//   const page = req.query.page ? parseInt(req.query.page) : 1;
//   const limit = req.query.limit ? parseInt(req.query.limit) : 10;
//   const skip = (page - 1) * limit;

//   Product.find(condition)
//     .select(
//       "name price _id Image  piece MOQ P_cert S_cert isUsa ManufactureLocation MainCategory_name subcategory_name sub_subcategory_name"
//     )
//     .skip(skip)
//     .limit(limit)
//     .sort(sort)
//     .exec()
//     .then((docs) => {
//       const pCertSet = new Set();
//       docs.forEach((doc) => {
//         pCertSet.add(doc.P_cert);
//       });
//       const pCertData = Array.from(pCertSet);

//       const sCertSet = new Set();
//       docs.forEach((doc) => {
//         sCertSet.add(doc.S_cert);
//       });
//       const sCertData = Array.from(sCertSet);

//       const MlocationSet = new Set();
//       docs.forEach((doc) => {
//         MlocationSet.add(doc.ManufactureLocation);
//       });
//       const MlocationData = Array.from(MlocationSet);

//       const priceStart = Math.round(
//         docs.reduce((min, doc) => {
//           return Math.min(min, doc.price);
//         }, Number.MAX_SAFE_INTEGER)
//       );
//       const priceEnd =
//         Math.round(
//           docs.reduce((max, doc) => {
//             return Math.max(max, doc.price);
//           }, Number.MIN_SAFE_INTEGER)
//         ) + 1;

//       const categories = {};
//       docs.forEach((doc) => {
//         const mainCategory = doc.MainCategory_name;
//         const subCategory = doc.subcategory_name;
//         const subSubCategory = doc.sub_subcategory_name;
//         if (!categories[mainCategory]) {
//           categories[mainCategory] = {};
//         }
//         if (!categories[mainCategory][subCategory]) {
//           categories[mainCategory][subCategory] = [];
//         }
//         categories[mainCategory][subCategory].push(subSubCategory);
//       });

//       const response = {
//         count: docs.length,
//         pCertData: pCertData,
//         sCertData: sCertData,
//         MlocationData: MlocationData,
//         priceStart: priceStart || 0,
//         priceEnd: priceEnd || 1000,
//         currentpage: page,

//         products: docs.map((doc) => {
//           return {
//             name: doc.name,
//             price: doc.price,
//             Image: doc.Image,
//             MOQ: doc.MOQ,
//             P_cert: doc.P_cert,
//             S_cert: doc.S_cert,
//             isUsa: doc.isUsa,
//             ManufactureLocation: doc.ManufactureLocation,
//             MainCategory_name: doc.MainCategory_name,
//             subcategory_name: doc.subcategory_name,
//             sub_subcategory_name: doc.sub_subcategory_name,

//             piece: doc.piece,

//             slug:
//               "http://localhost:5000/products/" + doc.name.replace(/\s+/g, "-"),
//             request: {
//               type: "GET",
//               url:
//                 "http://localhost:5000/products/" +
//                 doc.name.replace(/\s+/g, "-"),
//             },
//           };
//         }),
//       };

//       res.status(200).json(response);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         error: err,
//       });
//     });
// };
