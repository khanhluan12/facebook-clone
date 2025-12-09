const mongoose = require('mongoose');

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connect successfully");
    }catch(error){
        console.log("Mongo connect failed",error);
        process.exit(1);
    }
}

module.exports = connectDB;