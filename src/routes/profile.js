const express = require("express");
const profileRouter = express.Router();
const authorize = require("../middlewares/auth");
const User = require("../models/user");//because we want to fill the values in this user schema over here

//diaplay the profle currently logeend in
profileRouter.get("/view",authorize, async (req, res) => {
    try {
        
        const user = await User.findById(req.user._id);

        if (!user) {
            throw new Error("Invalid Credentialssss");
        }

        res.send(user.firstName +(" ")+ user.lastName + (" is Logged In") );
    } catch (err) {
        res.status(401).send("Error: " + err.message);
    }
});

profileRouter.patch("/update", authorize, async(req,res)=>{
    const userId= req.user._id;
    const data= req.body;
 try{
    const user = await User.findByIdAndUpdate(userId,data);
    res.send("User Updated ");

 }catch(err){
    res.status(400).send("Error "+ err.message);
 }
});

module.exports = profileRouter;