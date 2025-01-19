const express= require('express');
const connectDB= require("./config/database");
const app= express();
const User= require("./models/user");

app.use(express.json());

app.post("/signup", async (req,res) => {
    const user= new User(req.body);

    try{
        await user.save();
        res.send("User Added successfully!");
    }catch(err){
        res.status(400).send("User Added Successfully! "+err.message);
    }
})

app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;
  
    try {
      console.log(userEmail);
      const user = await User.findOne({ emailId: userEmail });
      if (!user) {
        res.status(404).send("User not found");
      } else {
        res.send(user);
      }
    } catch (err) {
      res.status(400).send("Something went wrong ");
    }
  });

app.get("/feed",async (req,res)=>{
    try{
        const users= await User.find({});
        res.send(users);
    }catch(err){
        res.status(400).send("Somenthong went wrong");
    }
});

// Detele a user from the database
app.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    try {
      const user = await User.findByIdAndDelete({ _id: userId });
      //const user = await User.findByIdAndDelete(userId);
  
      res.send("User deleted successfully");
    } catch (err) {
      res.status(400).send("Something went wrong ");
    }
  });
  
  // Update data of the user
  app.patch("/user", async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;
    try {
      const user = await User.findByIdAndUpdate({ _id: userId }, data, {returnDocument: "after", runValidators:true,});
      console.log(user);
      res.send("User updated successfully");
    } catch (err) {
      res.status(400).send("Something went wrong: "+ err.message);
    }
  });
  

connectDB()
    .then(()=>{
        console.log("Connection Created");
        app.listen(3000,() =>{
            console.log("server succesfully running");
        });
    })
    .catch((err)=>{
    console.log(err.message);
});

