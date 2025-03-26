const express = require("express");
const connectDB = require("./src/config/database"); //this is used because we are connecting the DB once the app file is started
const app = express(); //initialize the app as expres server
const User = require("./src/models/user");//because we want to fill the values in this user schema over here

app.use(express.json()); //helps us convert the json to js object


app.post("/signup", async (req, res) => {
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailId: req.body.emailId,
        password: req.body.password,
        age: req.body.age,
        gender: req.body.gender,
    });

    try {
        await user.save();
        res.send("User Added successfully!");
    } catch (err) {
        res.status(500).send("Error: " + err.message);
    }
});

app.patch("/user",async(req,res)=>{
    const userId=req.body.userId
    const data=req.body
    try{
        const user= await User.findByIdAndUpdate(userId,data);
        console.log(user);
        res.send("user updated");
    }catch(err){
        res.status(400).send("something is wrong");
    }

});

app.delete("/user",async(req,res)=>{
    const userID=req.body.userId
    try{
        await User.findByIdAndDelete(userID);
        res.send("user deleted");
    }catch(err){
        res.status(400).send("somethinf went wrong");
    }
})

app.get("/feed",async(req,res)=>{
    try{
        const user= await User.find({});
        res.send(user);
    }catch(err){
        res.status(400).send("something wrong");
    }
});

connectDB().then(()=>{
    app.listen(7777);
 });

 