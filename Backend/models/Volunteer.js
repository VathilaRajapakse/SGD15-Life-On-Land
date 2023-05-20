const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

    fullName:{
        type:String,
        required:true
    },

    address:{
        type:String,
        required:true
    },

    contactNo:{
        type:String,
        required:true
    },
    
    nic:{
        type:String,
        required:true
    }

});

module.exports = mongoose.model('volunteer',postSchema);