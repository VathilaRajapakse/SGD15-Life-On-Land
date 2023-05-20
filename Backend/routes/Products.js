const express = require('express');
const Products = require('../models/Products');

const path = require("path");
const fs =require("fs")

const router = express.Router();

//Save blogs
router.post('/products/save',(req,res) =>{
    let newProducts = new Products(req.body);
    
    newProducts.save((err) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
            return res.status(200).json({
                success:"Product added successfully"
        });
    });
});

//get blogs
router.get('/products',(req,res) =>{
    Products. find().exec((err,Products) =>{
    if(err){
        return res.status(400).json({
            error:err
        });
    }
    return res.status(200).json({
        success:true,
        existingProducts:Products
    });
   });
});

//Update blogs
router.put('/products/update/:id',(req,res)=>{
    Products.findByIdAndUpdate(
    req.params.id,
    {
        $set:req.body
    },
    (err,Products)=>{
        if(err){
            return res.status(400).json({error:err});
        }
        return res.status(200).json({
            success:"Updated Successfully"
        });
    }

    );
});

//delete blogs
router.delete('/products/delete/:id',(req,res) =>{
    Products.findByIdAndRemove(req.params.id).exec((err,deletedProduct) =>{

        if(err) return res.status(400).json({
            message:"Delete Unsuccessful",
            err,
        });
        return res.json({
            message:"Delete Successful",
            deletedProduct,
        });
    });
})



//get specific product
router.get('/products/:id',(req,res) =>{

    let productId = req.params.id;

    Products. findById(productId,(err,Products)=>  {
    if(err){
        return res.status(400).json({
            success:false, err
        });
    }
    return res.status(200).json({
        success:true,
        Products
    });
   });
});

router.get("/get/image/:id", (req, res) => {
    let imageId = req.params.id;
  
    const Path = path.resolve(
      __dirname,
      `../photoSave/${imageId}.png`
    );
    const Path2 = path.resolve(
      __dirname,
      `../photoSave/${imageId}.jpg`
    );
    
  
    fs.readFile(Path, function (err, data) {
      if (err) {
        fs.readFile(Path2, function (err, data) {
          if (err) {
            res.sendStatus(404).send("File not found")
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