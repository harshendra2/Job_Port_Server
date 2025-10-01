const Company=require("../../modal/companySchema");
const User=require("../../modal/userSchema");
const JobApplied=require("../../modal/job_appliedSchema");
const Post=require("../../modal/Job_Post_Schema")
const bcrypt=require("bcrypt")

exports.Registration=async(req,res)=>{
    const {email,password,name,Mobile,location}=req.body;
    console.log(email,password,name,Mobile,location)
try{
    if(!email&&!password&&!name&&!Mobile&&!location){
        return res.status(400).json({status:false,message:"All Fields required"});
    }
    const company=await Company.findOne({email:email});
    const user=await User.findOne({email:email})

     if(company || user){
        return res.status(404).json({status:false,message:"Email already exists in our database"});
     }
     let hashedPassword=await bcrypt.hash(password,10)
     let data=new User({
        email,password:hashedPassword,name,Mobile,location
     })
     await data.save();
     return res.status(201).json({status:true,message:"Registration successfully"});

}catch(error){
 res.status(500).json({status:false,message:"Internal server error",error:error.message})
}
}


exports.GetAllPost=async(req,res)=>{
try{
  let data=await Post.find();
     return res.status(200).send({status:true,data:data||[]})
}catch(error){
 res.status(500).json({status:false,message:"Internal server error",error:error.message})
}
}

exports.JobApply=async(req,res)=>{
    const {candidate_id,post_id,company_id}=req.body;
try{
    if(!candidate_id&&!post_id && !company_id){
        return res.status(404).json({status:false,message:"All fields required"});
    }
     let data=new JobApplied({
        company_id,
        candidate_id,
        post_id
     })
     await data.save();
     return res.status(201).json({status:true,message:"Job Applied successfully"});

}catch(error){
 res.status(500).json({status:false,message:"Internal server error",error:error.message})
}
}