const express = require('express');
const router = require('express').Router();
const Member = require('../models/Register');
const bcrypt = require("bcryptjs");
const jwt =require("jsonwebtoken");
const secret_key = "Mykey01"

router.route("/register/save").post(async (req,res, next) => {
    const { fullname , address , contact , email , userName , password } = req.body;

    let existingUser;

    try{
        existingUser = await Member.findOne({ userName: userName });
    }catch(error) {
        console.log(error);
    }
    if (existingUser){
        return res.status(400).json( {message: "User already exists!"});
    }

    const hashedPassword = bcrypt.hashSync(password);

    const newMember = new Member({
        fullname,
        address, 
        contact, 
        email, 
        userName, 
        password: hashedPassword
    });

    try {
        await newMember.save();
    }catch (error){
        console.log(error);
    }

    return res.status(201).json({ message: newMember}); 
});


// to get

router.get('/register',(req,res) => {
    Member.find().exec((err,post) =>{
        if(err){
            return res.status(400).json({
                error:err
            })
        }
        return res.status(200).json({
            success:true,
            existingPosts:post
        });

    });
});


//get a specific doctor
router.get("/register/:id",(req,res) =>{

    let memID = req.params.id;

    Member.findById(memID,(err,doctor) =>{
        if(err){
            return res.status(400).json({success:false,err});
        }
        return res.status(200).json({
            success:true,
            doctor
        });
    });
});
// to update

router.put('/register/update/:id',(req,res) =>{
    Member.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,post)=>{
            if(err){
                return res.status(400).json({error:err});

            }
            return res.status(200).json({
                success:" Details updated sucessfully"
            });
        }
    );
});


// to delete

router.delete('/register/delete/:id',(req,res) =>{
    Member.findByIdAndRemove(req.params.id).exec((err,deletedDoctor) =>{

        if(err) return res.status(400).json({
            message:"Details Deletion unsucessful",err
        });

        return res.json({
            message:"Deleted sucessfully",deletedDoctor
        })
    });
})

//login
router.route("/register/login").post( async(req, res, next) =>{

    const { userName , password } = req.body;

    let existingUser;
    try{
        existingUser = await Member.findOne({userName: userName});
    }catch(error){
        return new Error(error);
    }

    if(!existingUser){
        return res.status(400).json({ message: " check your Username and login again..."});
    }

   const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if(!isPasswordCorrect){
        return res.status(400).json({message: "Invalid UserName or the password"})
    }

    const token = jwt.sign({id: existingUser._id}, secret_key, {
        expiresIn: "1hr"
    });

    res.cookie(String(existingUser._id),token,{
        path: '/',
        expires: new Date(Date.now() + 1000 * 30),
        httpOnly: true,
        sameSite: 'lax'
    })

    return res.status(200).json({message:  "Successfully logged in." , member: existingUser, token})

});

router.route("/register/member").get(async(req,res,next) => {
    
    const cookie =  req.headers.cookie;
    const token = cookie.split("=")[1];
    console.log(token);
    
    if(!token){
        res.status(400).json({message: "No token found"});
    }
    jwt.verify(String(token),secret_key,async (error, newMember) =>{
        if(error){
            res.status(400).json({message: "Invalid token"});
        }
        console.log(newMember.id);
        req.id = newMember.id;

        const memberId = req.id;
        let member; 
        try{
            member = await Member.findById(memberId, "-password");
        }catch(error){
        return new Error(error)
        }
        if (!member){
        res.status(404).json({message: "user not found"})
        }
        return res.status(200).json({member});

    })
});

module.exports = router;