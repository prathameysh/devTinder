const express= require('express');
const app= express();

//only handle GET call to /user
app.get("/user",(req,res) => {
    res.send({firstName:"Prat", lastName:"Gavatre"});
});

app.post("/user",async(req,res) => {
    console.log(req.body);
    //saving data to DB
    res.send("data sent successfully to database");
});

app.delete("/user",(req,res) => {
    res.send("data deleted successfully from database");
});

//all the HTTP method API calls to /hello
app.use("/hello",(req, res)=>{
    res.send("Hello World from Server");
});

app.listen(3000,() =>{
    console.log("server succesfully running");
});