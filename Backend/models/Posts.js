const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },

    // image:{
    //     type:String,
    //     required:true
    // },
    description:{
        type: String,
        required: true
    },
    yesCount: { type: Number, default: 0 },
    noCount: { type: Number, default: 0 },

   

});

module.exports = mongoose.model('post',postSchema);