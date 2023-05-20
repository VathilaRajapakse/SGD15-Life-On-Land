const Rating = require("../models/blog_rating.js");

const createRating = (data) => {
  let ID = data.blogID;
  let Name = data.blogName;
  let rating = data.rating;

  const ratingData = new Rating({
    blogID: ID,
    blogName: Name,
    rating: [{ rating: rating }],
  });
  return ratingData.save();
};

const findDetailByID = (id) => {
  let tid = id.trim();
  return Rating.find({ blogID: tid });
};
const updateByID = (data) => {
  let blogID = data.blogID;
  let rating = data.rating;

  return Rating.updateOne(
    { blogID: blogID },
    {
      $push: {
        rating: [{ rating: rating }],
      },
    }
  );
};

const getRatingDetails = (id) => {
  return Rating.find({blogID:id});
};

module.exports = {
  createRating,
  findDetailByID,
  updateByID,
  getRatingDetails,
};
