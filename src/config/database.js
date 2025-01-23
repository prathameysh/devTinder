const mongoose= require("mongoose");

const connectDB = async () =>{
    await mongoose.connect(
        "mongodb+srv://namastenode:1w9lzoB46D1LqPS1@namastenode.z6hur.mongodb.net/devTinder",
        { useNewUrlParser: true, useUnifiedTopology: true }
    );
};

module.exports= connectDB;

