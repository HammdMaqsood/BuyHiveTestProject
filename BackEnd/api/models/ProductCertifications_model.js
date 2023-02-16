const mongoose = require('mongoose');
const ProductCertifications = mongoose.Schema({
    Pcert_id: mongoose.Schema.Types.ObjectId,
    Pcert_name:{type:String,require:true}
});

module.exports = mongoose.model('ProductCertifications', ProductCertifications);