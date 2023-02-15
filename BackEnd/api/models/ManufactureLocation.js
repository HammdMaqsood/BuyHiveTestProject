const mongoose = require('mongoose');
const ManufactureLocation= mongoose.Schema({
    MLocation_id: mongoose.Schema.Types.ObjectId,
    MLocation_name:{type:String,require:true}
});

module.exports = mongoose.model('ManufactureLocation', ManufactureLocation);