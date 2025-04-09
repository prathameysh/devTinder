const express = require("express");
const User = require("../models/user");//because we want to fill the values in this user schema over here
const authRouter= express.Router();
const jwt = require("jsonwebtoken");




authRouter.post("/signup", async (req, res) => {
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailId: req.body.emailId,
        password: req.body.password,
        age: req.body.age,
        gender: req.body.gender,
        imageUrl: req.body.imageUrl,
    });

    try {
        const savedUser=await user.save();
        const token=await jwt.sign({_id:user._id},"DEV@TInder$790");
        res.cookie("token",token);
        res.send(savedUser);
    } catch (err) {
        res.status(500).send("Error: " + err.message);
    }
});


authRouter.post("/login", async(req,res)=>
{
    try
    {
        const{emailId,password}=req.body;

        const user=await User.findOne({emailId:emailId});

        if(!user)
        {
            throw new Error("Invalid Credentials");
        }

        if(user.password===password)
        {
            const token=await jwt.sign({_id:user._id},"DEV@TInder$790");
            res.cookie("token",token);
            res.send(user);
        }else{
            throw new Error("Invalid Credentials");
        } 
    }   
    catch(err)
    {
        res.status(400).send("Error "+err.message);
    }
});

authRouter.post("/logout", async(req,res)=>{
    try{
        res.cookie("token",null,{
            expires:new Date(Date.now()),
        })
        res.status(200).json({ message: "Logged out successfully" });
    }catch(err){
        res.status(400).send("Error "+err.message);
    }

});

module.exports = authRouter;