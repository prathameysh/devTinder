const mongoose= require("mongoose");
const validator= require("validator");


const userSchema= new mongoose.Schema({
    firstName: {
        type:String,

    },
    lastName: {
        type: String,
      },
      emailId: {
        type: String,
        required: true, // Email is mandatory
        unique: true,   // Ensures no duplicate emails
        validate: {
            validator: validator.isEmail, // Uses validator's isEmail method
            message: "Invalid email format", // Custom error message
        },
    },
      password: {
        type: String,
      },
      age: {
        type: Number,
      },
      gender: {
        type: String,
      },
},{
  timestamps: true,
});

module.exports=mongoose.model("User",userSchema);