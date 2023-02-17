const mongoose = require("mongoose");
const SupplierCertifications = mongoose.Schema({
  Scert_id: mongoose.Schema.Types.ObjectId,
  Scert_name: { type: String, require: true },
});

module.exports = mongoose.model(
  "SupplierCertifications",
  SupplierCertifications
);
