const express=require('express')
const {login}=require('../Controller/userController')
const {register}=require('../Controller/userController')

const Router=express.Router();

Router.post("/login",login);
Router.post("/register",register);

module.exports=Router;