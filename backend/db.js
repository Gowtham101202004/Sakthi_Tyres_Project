const mongoose=require('mongoose');

const env=require('dotenv').config();

const Database=async()=>{
    try{
        const server=await mongoose.connect(process.env.URL);
        console.log("Database Connected");
    }
    catch(err){
        console.log("Database Connection Error -> ",err);
    }
}

Database();