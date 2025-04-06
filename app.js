const express = require("express");
const connectDB = require("./src/config/database"); //this is used because we are connecting the DB once the app file is started
const app = express(); //initialize the app as expres server
const User = require("./src/models/user");//because we want to fill the values in this user schema over here
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const authorize = require("./src/middlewares/auth");
const cors=require("cors");

app.use(cors({origin:"http://localhost:5173", credentials:true}));
app.use(express.json()); //helps us convert the json to js object
app.use(cookieParser()); //helps read cookies


const authRouter = require("./src/routes/auth");
const profileRouter = require("./src/routes/profile");
const requestRouter = require("./src/routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

connectDB()
  .then(() => {
    app.listen(7777, () => console.log("Server running on port 7777"));
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
 