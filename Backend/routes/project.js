const express = require('express');
const Project = require('../models/Project');
const router = express.Router();
const path = require("path");
const fs =require("fs")


router.post('/project/save',(req,res)=> {
    let Newpro = new Project(req.body);

    Newpro.save((err) => {
    if(err){
        return res.status(400).json({
            error:err
        });
    }
    return res.status(200).json({
        success:"Project successfully saved"
        });
    });

});

//read 
router.get('/project',(req,res) =>{
    Project.find().exec((err,Project) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingProject:Project
        });
    });
});


//get specific details

router.get("/project/:id",(req,res)=>{
    let PreId = req.params.id;

    Project.findById(PreId,(err,project)=>{
        if(err){
            return res.status(400).json({success:false,err});
        }

        return res.status(200).json({
            success:true,
            project
        });
    });
 });


 
//update

router.put('/project/update/:id',(req,res) =>{
    Project.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,project) =>{
            if(err){
                return res.status(400).json({error:err});
            }

            return res.status(200).json({
                success:"Prescription Updated Successfully"
            });
        }
    );
});

//delete
router.delete('/project/delete/:id',(req,res) =>{
    Project.findByIdAndRemove(req.params.id).exec((err,deletedProject)=>{
        if(err) return res.status(400).listenerCount({
            message:"Delete unsuccesful",err
        });

        return res.json({
            message:"Delete Succesfull",deletedProject
        });
    });
});




// //image
// router.get("/get/image/:id", (req, res) => {
//     let imageId = req.params.id;
  
//     const Path = path.resolve(
//       __dirname,
//       `../photoSave/${imageId}.png`
//     );
//     const Path2 = path.resolve(
//       __dirname,
//       `../photoSave/${imageId}.jpg`
//     );
    
  
//     fs.readFile(Path, function (err, data) {
//       if (err) {
//         fs.readFile(Path2, function (err, data) {
//           if (err) {
//             res.sendStatus(404).send("File not found")
            
//           } else {
//             res.writeHead(200, { ContentType: "image/jpg" });
//             res.end(data);
          
//           }
//         });
//       } else {
//         res.writeHead(200, { ContentType: "image/png" });
//         res.end(data);
        
//       }
//     });
//   });


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