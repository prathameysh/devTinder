const jwt = require("jsonwebtoken");

const authorize = (req,res,next)=>{

    try{
        const token = req.cookies.token

        if(!token){return res.status(400).send("unauthorized");}

        const decoded=jwt.verify(token,"DEV@TInder$790"); //decode the actual values from the code
        req.user=decoded; //attach the logged in used to req
        next();
    }catch(err){
        res.status(401).send("unauthorized");
    }
}

module.exports= authorize;