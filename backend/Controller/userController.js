const user=require('../Models/registerModel');
const handler=require('express-async-handler');

const login=handler(async(req,res)=>{
    const {name,password}=req.body;
    const username=await user.findOne({name})
    

    if(username && await user.findOne({password})){
        res.status(201).json(
            {
                name:name,
                password:password,
            }
        );
    }
    else{
        res.status(400);
        throw new Error("Invalid Username or Password!");
    }
});
const register=handler(async(req,res)=>{
   
    const {name,email,password}=req.body;

    if(!name || !email || !password){
        res.send(400);
        throw new Error("Invalid name or email or password");
    }
    const checkEmail=await user.findOne({email});
    if(checkEmail){
        throw new Error("Email already exists");
    }

    const checkName=await user.findOne({name});
    if(checkName){
        throw new Error("Name already taken");
    }

    const Created=await user.create({name,email,password});

    if(Created){
        res.status(201).json(
            {
                name:Created.name,
                email:Created.email,
                password:Created.password,
            }
        )
    }
    else{
        res.status(400);
        throw new Error("Problem in registering data.");
    }

});

module.exports={login,register}