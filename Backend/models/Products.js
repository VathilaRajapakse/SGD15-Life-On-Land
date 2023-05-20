const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({


    productname:{
        type:String,
        required:true
    },

    productdescription:{
        type:String,
        required:true
    },
    productprice:{
        type:String,
        required:true
    }

});

module.exports = mongoose.model('products',productSchema);