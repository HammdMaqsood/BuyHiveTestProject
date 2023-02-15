const mongoose = require('mongoose');


const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: 
    {type:String,unique:true,required:true},
    price: {type:Number,required:true},
    Image: {type:Array,required:true},
    MOQ:{type:Number,required:true},
     Pcert_id:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'ProductCertifications'},
    Scert_id:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'SupplierCertifications'},
    MLocation_id:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'ManufactureLocation'},
    isUsa:{type:Boolean},
    piece:{type:String,required:true},  
    // ManufactureLocation:String,
    // link:{type:String,required:false},
    MainCategory_id:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'MainCategory'},
    subcategory_id:{type:mongoose.Schema.Types.ObjectId,ref:'MainCategory'},
    // sub_subcategory_id:{type:String,required:true,ref:'MainCategory'},



});

module.exports = mongoose.model('Product', productSchema);