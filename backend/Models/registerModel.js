const { Timestamp } = require('mongodb');
const mongoose=require('mongoose');

const Data=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
},{
    timeStamp:true,
},
);

const user=mongoose.model("User",Data);
module.exports=user;