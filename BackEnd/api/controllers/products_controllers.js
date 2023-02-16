const mongoose = require("mongoose");
const Product = require("../models/product_models");

exports.products_get_all = async (req, res) => {
  try {
    const perPage = 10;
    const page = parseInt(req.query.page) || 1;
    let pricefinal = req.query.pricefinal || 2000;
    let pricestart = req.query.pricestart || 0;
    let moqfilt = req.query.moqfilt || 2000;
    let sort = req.query.sort || "relevance";
    let Usabol = req.query.Usabol;
    let match = {};
    if (req.query.Usabol) {
      match = {
        price: { $lt: parseInt(pricefinal), $gte: parseInt(pricestart) },
        MOQ: { $lt: parseInt(moqfilt) },
        isUsa: true,
      };
    } else {
      match = {
        price: { $lt: parseInt(pricefinal), $gte: parseInt(pricestart) },
        MOQ: { $lt: parseInt(moqfilt) },
      };
    }

    const query = {};
    for (const [key, value] of Object.entries(req.query)) {
      if (
        key !== "page" &&
        key !== "pricefinal" &&
        key !== "Usabol" &&
        key !== "subcategory_id" &&
        key !== "pricestart" &&
        key !== "moqfilt" &&
        key !== "sort"
      ) {
        if (key == "name") {
          query[key] = { $regex: new RegExp(req.query.name, "i") };
        }

        query[key] = value.split(",");
      }
    }

    const pipeline = [
      {
        $lookup: {
          from: "productcertifications",
          localField: "Pcert_id",
          foreignField: "_id",
          as: "pcertification",
        },
      },
      {
        $lookup: {
          from: "suppliercertifications",
          localField: "Scert_id",
          foreignField: "_id",
          as: "scertification",
        },
      },
      {
        $lookup: {
          from: "manufacturelocations",
          localField: "MLocation_id",
          foreignField: "_id",
          as: "manufacturelocation",
        },
      },
      {
        $lookup: {
          from: "maincategories",
          localField: "MainCategory_id",
          foreignField: "_id",
          as: "maincategory",
        },
      },
      {
        $lookup: {
          from: "maincategories.subcategories",
          localField: "subcategory_id",
          foreignField: "_id",
          as: "subcategory",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          price: 1,
          Image: 1,
          MOQ: 1,
          isUsa: 1,
          piece: 1,
          Pcert_id: 1,
          Pcert_name: { $arrayElemAt: ["$pcertification.Pcert_name", 0] },
          Scert_id: 1,
          Scert_name: { $arrayElemAt: ["$scertification.Scert_name", 0] },
          MLocation_id: 1,
          MLocation_name: {
            $arrayElemAt: ["$manufacturelocation.MLocation_name", 0],
          },
          MainCategory_id: 1,
          MainCategory_name: {
            $arrayElemAt: ["$maincategory.MainCategory_name", 0],
          },
          MainCategories: {
            $arrayElemAt: ["$maincategory.MainCategory_name.subcategories", 0],
          },
          subcategory_id: 1,
          subcategory_name: {
            $arrayElemAt: ["$subcategory.subcategory_name", 0],
          },
        },
      },
      {
        $match: match,
      },
      {
        $sort:
          sort === "lh"
            ? { price: 1 }
            : sort === "hl"
            ? { price: -1 }
            : sort === "MOQ"
            ? { MOQ: 1 }
            : { relevance: -1 },
      },
      {
        $skip: (page - 1) * perPage,
      },
      {
        $limit: perPage,
      },
    ];

    for (const [key, values] of Object.entries(query)) {
      let matchQuery = { [`${key}`]: { $in: values } };
      pipeline.splice(pipeline.length - 2, 0, { $match: matchQuery });
    }

    try {
      const docs = await Product.aggregate(pipeline).exec();
      const prices = docs.map((doc) => doc.price);
      const response = {
        count: docs.length,
        pCertData: Array.from(new Set(docs.map((doc) => doc.Pcert_name))),
        sCertData: Array.from(new Set(docs.map((doc) => doc.Scert_name))),
        MlocationData: Array.from(
          new Set(docs.map((doc) => doc.MLocation_name))
        ),

        products: docs.map((doc) => {
          return {
            _id: doc._id,
            name: doc.name,
            price: doc.price,
            Image: doc.Image,
            MOQ: doc.MOQ,
            isUsa: doc.isUsa,
            piece: doc.piece,
            Pcert_id: doc.Pcert_id,
            Scert_id: doc.Scert_id,
            Pcert_name: doc.Pcert_name,
            Scert_name: doc.Scert_name,
            MLocation_id: doc.MLocation_id,
            MLocation_name: doc.MLocation_name,
            MainCategory_id: doc.MainCategory_id,
            MainCategory_name: doc.MainCategory_name,
            subcategory_id: doc.subcategory_id,
            subcategory_name: doc.subcategory_name,

            request: {
              type: "GET",
              url: "http://localhost:3000/products/" + doc._id,
            },
          };
        }),
        currentPage: page,
        priceStart: Math.min(...prices),
        priceEnd: Math.max(...prices),
        totalPages: Math.ceil(docs.length / perPage),
      };
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({
      error: err,
    });
  }
};

exports.products_create_product = async (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    Image: req.body.Image,
    MOQ: req.body.MOQ,
    isUsa: req.body.isUsa,
    piece: req.body.piece,
    MainCategory_id: req.body.MainCategory_id,
    subcategory_id: req.body.subcategory_id,
    Pcert_id: req.body.Pcert_id,
    Scert_id: req.body.Scert_id,
    MLocation_id: req.body.MLocation_id,
  });
  try {
    const result = await product.save();
    console.log(result);
    res.status(201).json({
      message: "Product created successfully",
      createdProduct: {
        _id: result._id,
        name: result.name,
        price: result.price,
        Image: result.Image,
        MOQ: result.MOQ,
        isUsa: result.isUsa,
        piece: result.piece,
        MainCategory_id: result.MainCategory_id,
        subcategory_id: result.subcategory_id,
        Pcert_id: result.Pcert_id,
        Scert_id: result.Scert_id,
        MLocatoin_id: result.MLocatoin_id,
        request: {
          type: "GET",
          url: "http://localhost:3000/products/" + result._id,
        },
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
};
