const post=require("../../modal/Job_Post_Schema");
const postapplied=require("../../modal/job_appliedSchema");
const mongoose=require("mongoose");

exports.PostJob=async(req,res)=>{
    const {company_id,title,description,salary,location,skills}=req.body;
try{
    if(!company_id ||!mongoose.Types.ObjectId.isValid(company_id))return res.status(404).json({status:false,message:"Please provide valid company Id"});
  
     let data=new post({
        company_id,title,description,salary,location,skills
     })
     await data.save();
     return res.status(201).json({status:true,message:"Job Posted Successfully!"});

}catch(error){
 res.status(500).json({status:false,message:"Internal server error",error:error.message})
}
}


exports.DeletePost=async(req,res)=>{
    const {post_id}=req.params;
try{
    if(!post_id ||!mongoose.Types.ObjectId.isValid(post_id))return res.status(404).json({status:false,message:"Please provide valid Post Id"});

    let exists=await post.findById(post_id);
    if(!exists){
        return res.status(404).json({status:false,message:"This post not available in our data base"});
    }
  
     await post.findByIdAndDelete(post_id);
    
     return res.status(200).json({status:true,message:"Job Deleted Successfully!"});

}catch(error){
 res.status(500).json({status:false,message:"Internal server error",error:error.message})
}
}

exports.GetSinglePost=async(req,res)=>{
    const {post_id}=req.params;
try{
    if(!post_id ||!mongoose.Types.ObjectId.isValid(post_id))return res.status(404).json({status:false,message:"Please provide valid Post Id"});

    let exists=await post.findById(post_id);
    if(!exists){
        return res.status(404).json({status:false,message:"This post not available in our data base"});
    }
  
   return res.status(200).send({status:true,data:exists});

}catch(error){
 res.status(500).json({status:false,message:"Internal server error",error:error.message})
}
}



exports.EditPost=async(req,res)=>{
    const {post_id}=req.params;
    const {title,description,salary,location,skills}=req.body;
try{
    if(!post_id ||!mongoose.Types.ObjectId.isValid(post_id))return res.status(404).json({status:false,message:"Please provide valid Post Id"});

    let exists=await post.findById(post_id);
    if(!exists){
        return res.status(404).json({status:false,message:"This post not available in our data base"});
    }
  let data={
    title,description,salary,location,skills
  }
    await post.findByIdAndUpdate(post_id,{$set:data},{new:true})
    
     return res.status(200).json({status:true,message:"Job Updated Successfully!"});

}catch(error){
 res.status(500).json({status:false,message:"Internal server error",error:error.message})
}
}


exports.GetAllcompanyPost=async(req,res)=>{
    const {company_id}=req.params;
try{
    if(!company_id ||!mongoose.Types.ObjectId.isValid(company_id))return res.status(404).json({status:false,message:"Please provide valid Company Id"});
    let id=new mongoose.Types.ObjectId(company_id);

    let data=await post.aggregate([{$match:{company_id:id}},{$sort:{CreatDate:-1}}]);
     return res.status(200).send({status:true,data:data||[]})

}catch(error){
 res.status(500).json({status:false,message:"Internal server error",error:error.message})
}
}


exports.GetAppliedCandidate=async(req,res)=>{
    const {company_id,page=1,limit=50}=req.params;
try{
    let limits=parseInt(limit)||50;
    let pages=parseInt(page)||1;
    let skip=(pages-1)*limits;

    if(!company_id ||!mongoose.Types.ObjectId.isValid(company_id))return res.status(404).json({status:false,message:"Please provide valid Company Id"});
  let id=new mongoose.Types.ObjectId(company_id);
   
  let data=await postapplied.aggregate([{$match:{company_id:id}},{
        $lookup:{
            from:"users",
            localField:"candidate_id",
            foreignField:"_id",
            as:"Candidates"
        }
    },
    {$unwind:{path:"$Candidates"}},
      {$lookup:{
            from:"posts",
            localField:"post_id",
            foreignField:"_id",
            as:"Post"
        }
    },
    {$unwind:{path:"$Post"}},
    {$skip:skip},
    {$limit:limits}
])

return res.status(200).send({status:true,data:data||[]})
}catch(error){
 res.status(500).json({status:false,message:"Internal server error",error:error.message})
}
}
