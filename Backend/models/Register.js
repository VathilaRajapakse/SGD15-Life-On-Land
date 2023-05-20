const mongoose = require('mongoose');

const postRegister = new mongoose.Schema({

    fullname:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },
    
    userName:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },

});

module.exports = mongoose.model('register',postRegister);