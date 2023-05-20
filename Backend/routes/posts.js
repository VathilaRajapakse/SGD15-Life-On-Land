// const express = require('express');
// const Posts = require('../models/posts');
// const cloudinary = require('../utils/cloudinary')
// const router = express.Router();
// const path = require("path");
// const fs =require("fs")


// //Save posts
// router.post('/post/save',(req,res) =>{

  
//     let newPost = new Posts(req.body);
    
//     newPost.save((err) =>{
//         if(err){
//             return res.status(400).json({
//                 error:err
//             });
//         }
//             return res.status(200).json({
//                 success:"post saved successfully"
//         });
//     });
// });

// //get posts
// router.get('/posts',(req,res) =>{
//    Posts. find().exec((err,posts) =>{
//     if(err){
//         return res.status(400).json({
//             error:err
//         });
//     }
//     return res.status(200).json({
//         success:true,
//         existingPosts:posts
//     });
//    });
// });

// //get specific posts
// router.get("/post/:id",(req,res) =>{
//     let postId = req.params.id;

//     Posts.findById(postId,(err,post) =>{
//         if(err){
//             return res.status(400).json({success:false,err});
//         }
//         return res.status(200).json({
//             success:true,
//             post
//         });
//     });
    
// });

// //Update posts
// router.put('/post/update/:id',(req,res)=>{
//     Posts.findByIdAndUpdate(
//     req.params.id,
//     {
//         $set:req.body
//     },
//     (err,post)=>{
//         if(err){
//             return res.status(400).json({error:err});
//         }
//         return res.status(200).json({
//             success:"Updated Successfully"
//         });
//     }

//     );
// });

// //delete posts
// router.delete('/post/delete/:id',(req,res) =>{
//     Posts.findByIdAndRemove(req.params.id).exec((err,deletedPost) =>{

//         if(err) return res.status(400).json({
//             message:"Delete Unsuccessful",err
//         });
//         return res.json({
//             message:"Delete Successful",deletedPost
//         });
//     });
// })


// // // Update image
// // router.put('/image/update/:id', (req, res) => {
// //     let imageId = req.params.id;
  
// //     Images.findByIdAndUpdate(imageId, {
// //       $set: req.body
// //     }, (err, image) => {
// //       if (err) {
// //         return res.status(400).json({
// //           success: false,
// //           error: err
// //         });
// //       }
  
// //       return res.status(200).json({
// //         success: true,
// //         message: 'Image updated successfully'
// //       });
// //     });
// //   });
  
// //   // Delete image
// //   router.delete('/image/delete/:id', (req, res) => {
// //     let imageId = req.params.id;
  
// //     Images.findByIdAndRemove(imageId, (err, image) => {
// //       if (err) {
// //         return res.status(400).json({
// //           success: false,
// //           error: err
// //         });
// //       }
  
// //       return res.status(200).json({
// //         success: true,
// //         message: 'Image deleted successfully'
// //       });
// //     });
// //   });
  
// //image
// router.get("/get/image/:id", (req, res) => {
//   let imageId = req.params.id;

//   const Path = path.resolve(
//     __dirname,
//     `../photoSave/${imageId}.png`
//   );
//   const Path2 = path.resolve(
//     __dirname,
//     `../photoSave/${imageId}.jpg`
//   );
  

//   fs.readFile(Path, function (err, data) {
//     if (err) {
//       fs.readFile(Path2, function (err, data) {
//         if (err) {
//           res.sendStatus(404).send("File not found")
//         } else {
//           res.writeHead(200, { ContentType: "image/jpg" });
//           res.end(data);
//         }
//       });
//     } else {
//       res.writeHead(200, { ContentType: "image/png" });
//       res.end(data);
//     }
//   });
// });


// module.exports = router;

const express = require("express");
const app = express();
const Posts = require("../models/Posts");
const cloudinary = require("../utils/cloudinary");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");

//Save posts
router.post("/post/save", (req, res) => {
  let newPost = new Posts(req.body);
  console.log(newPost);
  newPost.save((err) => {
    if (err && err.name === 'ValidationError') {
      return res.status(400).json({
        error: err.message, // Return the specific validation error message
      });
    } else if (err) {
      return res.status(500).json({
        error: "Server error",
      });
    }
    return res.status(200).json({
      success: "post saved successfully",
    });
  });
});

router.post("/vote", async (req, res) => {
  const { option } = req.body;

  try {
    const poll = await Posts.findOne({});
    if (option === "yes") {
      poll.yesCount += 1;
    } else if (option === "no") {
      poll.noCount += 1;
    }
    await poll.save();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.get("/poll", async (req, res) => {
  try {
    const poll = await Posts.findOne({});
    res.json({ success: true, poll });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

//get posts
router.get("/posts", (req, res) => {
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

//get specific posts
router.get("/post/:id", (req, res) => {
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

//Update posts
router.put("/post/update/:id", (req, res) => {
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

//delete posts
router.delete("/post/delete/:id", (req, res) => {
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

// // Update image
// router.put('/image/update/:id', (req, res) => {
//     let imageId = req.params.id;

//     Images.findByIdAndUpdate(imageId, {
//       $set: req.body
//     }, (err, image) => {
//       if (err) {
//         return res.status(400).json({
//           success: false,
//           error: err
//         });
//       }

//       return res.status(200).json({
//         success: true,
//         message: 'Image updated successfully'
//       });
//     });
//   });

//   // Delete image
//   router.delete('/image/delete/:id', (req, res) => {
//     let imageId = req.params.id;

//     Images.findByIdAndRemove(imageId, (err, image) => {
//       if (err) {
//         return res.status(400).json({
//           success: false,
//           error: err
//         });
//       }

//       return res.status(200).json({
//         success: true,
//         message: 'Image deleted successfully'
//       });
//     });
//   });

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
