const express = require('express');

const app= express();

app.use("/test", (req,res)=>{
    res.send("hello from test bitchhh hell yeah");
})

app.listen(7777,()=>{
    console.log("Server at 7777");
});