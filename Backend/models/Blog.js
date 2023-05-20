const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    blogger_name:{
        type:String,
        required:true
    },

    blog_title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    // image:{
    //     type:String,
    //     required:true
    // },
    

});



module.exports = mongoose.model('blogs',postSchema);