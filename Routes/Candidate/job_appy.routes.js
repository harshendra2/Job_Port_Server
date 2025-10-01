const express=require("express");
const route=express.Router();
const controller=require("../../Controllers/User/candidateAuth.Controller")

route.get("/candidate/get_post",controller.GetAllPost)
route.post("/candidate/job/apply",controller.JobApply);


module.exports=route;