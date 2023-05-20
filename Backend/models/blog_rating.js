const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
  },
  rateDate: {
    type: Date,
    default: Date.now,
  },
});


const blogRatingSchema = new mongoose.Schema({
  blogID: {
    type: String,
    required: true,
  },
  blogName: {
    type: String,
    required: true,
  },
  rating: [ratingSchema]
  
});

const BlogRating = new mongoose.model("rating", blogRatingSchema);

module.exports = BlogRating;
