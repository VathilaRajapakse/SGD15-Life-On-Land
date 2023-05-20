const express = require('express');
const Volunteer = require('../models/Volunteer');
const router = express.Router();


router.post('/volunteer/save',(req,res)=> {
    let Newvolunteer = new Volunteer(req.body);

    Newvolunteer.save((err) => {
    if(err){
        return res.status(400).json({
            error:err
        });
    }
    return res.status(200).json({
        success:"volunteer member successfully saved"
        });
    });

});

//read 
router.get('/volunteer',(req,res) =>{
    Volunteer.find().exec((err,Volunteer) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingvolunteer:Volunteer
        });
    });
});

//delete
router.delete('/volunteer/delete/:id',(req,res) =>{
    Volunteer.findByIdAndRemove(req.params.id).exec((err,deletedVolunteer)=>{
        if(err) return res.status(400).listenerCount({
            message:"Delete unsuccesful",err
        });

        return res.json({
            message:"Delete Succesfull",deletedVolunteer
        });
    });
});

module.exports = router;