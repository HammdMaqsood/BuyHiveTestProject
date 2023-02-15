const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const fs = require("fs");
const path = "./uploads";

const productRoutes = require("./api/routes/products");
const ProductCertifications = require("./api/routes/ProductCertifications");
const ManufactureLocation = require("./api/routes/ManufactureLocation");

const MainCategoryRoutes = require("./api/routes/MainCategory");
const SupplierCertifcations = require("./api/routes/SupplierCertifications");

mongoose.connect(
  "mongodb+srv://hammadch811314:" +
    process.env.MONGO_ATLAS_PW +
    "@cluster0.jtw4fht.mongodb.net/?retryWrites=true&w=majority"
);

if (!fs.existsSync(path)) {
  fs.mkdir(path, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Directory created successfully.");
    }
  });
}

app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/products", productRoutes);

app.use("/MainCategory", MainCategoryRoutes);
app.use("/ProductCertifications", ProductCertifications);
app.use("/SupplierCertifications", SupplierCertifcations);
app.use("/ManufactureLocation", ManufactureLocation);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;