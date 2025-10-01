const express=require("express");
const route=express.Router();
const controller=require("../../Controllers/Company/userAuth.Controller")

route.post("/company/singup",controller.Registration);

// Login for comapny and Candidate
route.post("/company/login",controller.Login);

module.exports=route;