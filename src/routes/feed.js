const express = require("express");
const User = require("../models/user"); //because we want to fill the values in this user schema over here
const feedRouter = express.Router();
const jwt = require("jsonwebtoken");
const ConnectionRequest = require("../models/connectionRequest");
const authorize = require("../middlewares/auth");

feedRouter.get("/user/feed", authorize, async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    // Fetch all users who are connected in any way
    const connectedUsers = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUserId }, { toUserId: loggedInUserId }],
    }).select("fromUserId toUserId");

    // Extract user IDs from the connections
    const connectedUserIds = new Set([loggedInUserId.toString()]); // Include self

    connectedUsers.forEach((connection) => {
      connectedUserIds.add(connection.fromUserId.toString());
      connectedUserIds.add(connection.toUserId.toString());
    });

    // Fetch users who are NOT in the connectedUserIds list
    const usersToShow = await User.find({
      _id: { $nin: Array.from(connectedUserIds) },
    }).select("firstName lastName imageUrl age gender ");

    res.json({
      message: "Feed Fetched",
      users: usersToShow,
    });
  } catch (err) {
    res.status(400).send("ERROR in /user/feed --- " + err.message);
  }
});

module.exports = feedRouter;
