const mongoose =require ("mongoose")

const connectDB= async ()=>{
    await mongoose.connect("mongodb+srv://prathameshgavatre:ishwari.2009@namastenode.5rc03jd.mongodb.net/?retryWrites=true&w=majority&appName=NamasteNode");
    console.log('MongoDB Connected');
};

module.exports= connectDB;