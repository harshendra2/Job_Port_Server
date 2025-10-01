const express=require("express");
const route=express.Router();
const controller=require("../../Controllers/Company/JobPost.Controller")

route.post("/company/post/job",controller.PostJob);

route.delete("/company/delete/post/:post_id",controller.DeletePost);

route.get("/company/get_single/post/:post_id",controller.GetSinglePost);
route.put("/company/edit/post/:post_id",controller.EditPost);

route.get("/company/get_post/:company_id",controller.GetAllcompanyPost);

//list out all applied Candidate
route.get("/company/get_applied/candidate/:company_id/:page/:limit",controller.GetAppliedCandidate);



module.exports=route;