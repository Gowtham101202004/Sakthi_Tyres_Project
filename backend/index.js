const express=require("express");
const cors=require('cors');
const app=express();
const Router=require('./Router/Signup_Signin');

app.use(cors({
    origin:"http://localhost:5173",
    methods:["GET","POST"],
}))

require('./db');
app.use(express.json());
app.use("/",Router);

app.listen(process.env.PORT || 8080,()=>{
    console.log("Server rumming at http://localhost:8080.");
})