const mongoose=require("mongoose");

const JobPostSchema=new mongoose.Schema({
    company_id:{
        type:mongoose.Types.ObjectId,
        ref:"company"
    },
    title:{
        type:String,
        required:true
    },
     description:{
        type:String,
        required:true
    },
     salary:{
        type:Number,
        required:true
    },
     location:{
        type:String,
        required:true
    },
     skills:{
        type:Array
    },
    CreatDate:{
        type:Date,
        default:new Date()
    }
   
}
);

module.exports=mongoose.model("post",JobPostSchema)