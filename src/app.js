const express= require('express');

const app= express();

app.use("/",(req, res)=>{
    res.send("Hello World from Server from home page");
});

app.use("/test",(req, res)=>{
    res.send("Hello World from Server from test page");
});

app.use("/hello",(req, res)=>{
    res.send("Hello World from Server from hello");
});

app.listen(3000,() =>{
    console.log("server succesfully running");
});