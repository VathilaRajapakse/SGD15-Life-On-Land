const express = require("express");
const Posts = require("../models/Blog");
const cloudinary = require("../utils/cloudinary");
const router = express.Router();
const path = require("path");
const fs = require("fs");

//Save blogs
router.post("/blog/save", (req, res) => {
  let newPost = new Posts(req.body);

  newPost.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: "Blog saved successfully",
    });
  });
});

//get blogs
router.get("/blog", (req, res) => {
  Posts.find().exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingPosts: posts,
    });
  });
});

//get specific blogs
router.get("/blog/:id", (req, res) => {
  let postId = req.params.id;

  Posts.findById(postId, (err, post) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).json({
      success: true,
      post,
    });
  });
});

//Update blogs
router.put("/blog/update/:id", (req, res) => {
  Posts.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, post) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      return res.status(200).json({
        success: "Updated Successfully",
      });
    }
  );
});

//delete blogs
router.delete("/blog/delete/:id", (req, res) => {
  Posts.findByIdAndRemove(req.params.id).exec((err, deletedPost) => {
    if (err)
      return res.status(400).json({
        message: "Delete Unsuccessful",
        err,
      });
    return res.json({
      message: "Delete Successful",
      deletedPost,
    });
  });
});

//image
router.get("/get/image/:id", (req, res) => {
  let imageId = req.params.id;

  const Path = path.resolve(__dirname, `../photoSave/${imageId}.png`);
  const Path2 = path.resolve(__dirname, `../photoSave/${imageId}.jpg`);

  fs.readFile(Path, function (err, data) {
    if (err) {
      fs.readFile(Path2, function (err, data) {
        if (err) {
          res.sendStatus(404).send("File not found");
        } else {
          res.writeHead(200, { ContentType: "image/jpg" });
          res.end(data);
        }
      });
    } else {
      res.writeHead(200, { ContentType: "image/png" });
      res.end(data);
    }
  });
});

module.exports = router;
