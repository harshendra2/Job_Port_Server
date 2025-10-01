const express=require("express");
const route=express.Router();
const controller=require("../../Controllers/User/candidateAuth.Controller")

route.post("/candidate/singup",controller.Registration);


module.exports=route;