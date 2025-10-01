const mongoose=require("mongoose");

const JobApplied=new mongoose.Schema({
    company_id:{
            type:mongoose.Types.ObjectId,
            ref:"company"
    },
    candidate_id:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    },
    post_id:{
          type:mongoose.Types.ObjectId,
        ref:"post"
    },
    createdDate:{
        type:Date,
        default:new Date()
    }
});

module.exports=mongoose.model("postapplied",JobApplied)