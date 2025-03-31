const express = require("express");
const requestRouter=express.Router();
const authorize = require("../middlewares/auth");
const User = require("../models/user");//because we want to fill the values in this user schema over here
const ConnectionRequest= require("../models/connectionRequest");

requestRouter.post("/user/:status/:toUserId",authorize, async(req,res)=>{
    try{
        const fromUserId= req.user._id;
        const toUserId= req.params.toUserId;
        const status= req.params.status;

        //check status one of the only two
        const validStatuses = ["ignored", "interested"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status --/user/:status/:toUserId" });
        }

        //no conection already exists
        const existingConnection = await ConnectionRequest.findOne({
             $or:[
            {fromUserId,toUserId},
            {fromUserId:toUserId, toUserId:fromUserId},
        ]
        });

        if (existingConnection) {
            return res.status(400).json({ message: "Connection already exists --/user/:status/:toUserId" });
        }

        //check if toUser even exists
        const toUser = await User.findById(toUserId);
        if (!toUser) {
            return res.status(400).json({ message: "User does not exist --/user/:status/:toUserId" });
        }


        const connection = new ConnectionRequest({fromUserId, toUserId, status});

        const data=await connection.save();

        res.json({
            message:"coonection built --/user/:status/:toUserId",
            data,
        });

    }catch(err){
        res.status(400).send("ERROR in /user/:status/:toUserId--- "+err.message)
    }
});

requestRouter.post("/review/:status/:requestId",authorize,async(req,res)=>{
    try{
        const LoggedInId=req.user._id;
        const requestId= req.params.requestId;
        const status= req.params.status;

        //check status one of the only two
        const validStatuses = ["accepted", "rejected"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status---/review/:status/:requestId" });
        }

       const connectionRequest= await ConnectionRequest.findOne({
        _id:requestId,
        toUserId:LoggedInId,
        status:"interested",
       }) 
       if(!connectionRequest){
        return res.status(400).send("No Request found ---/review/:status/:requestId")
       }

       connectionRequest.status=status;

       await connectionRequest.save();

       res.json({
        message:"coonection built ---/review/:status/:requestId"
    });


    }catch(err){
        res.status(400).send("ERROR in /review/:status/:toUserId---"+err.message)
    }
});



requestRouter.get("/user/request/received", authorize, async (req, res) => {
    try {
        const loggedInUser = req.user._id;

        const receivedRequests = await ConnectionRequest.find({
            toUserId: loggedInUser,
            status: "interested"
        }).populate("fromUserId", ["firstName", "lastName", "email"]).lean();

        res.json({
            message: "Interested Users Fetched",
            receivedRequests
        });

    } catch (err) {
        res.status(400).send("ERROR in /user/request/received --- " + err.message);
    }
});



//display all existing connections of logged in user
requestRouter.get("/user/connections",authorize, async(req,res)=>{
    try{
        const loggedInUser= req.user._id;

        const acceptedRequests = await ConnectionRequest.find({
            status: "accepted",
            $or: [
                { toUserId: loggedInUser },
                { fromUserId: loggedInUser }
            ]
        })
        .populate("fromUserId", ["firstName", "lastName"])
        .populate("toUserId", ["firstName", "lastName"])
        .lean();

        res.json({
            message: "Data Fetched",
            connections: acceptedRequests
        });

    }catch (err){
        res.status(400).send("ERROR in /user/connections---"+ err.message);
    }
});

module.exports = requestRouter;