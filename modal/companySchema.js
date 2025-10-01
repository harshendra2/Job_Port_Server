const mongoose=require("mongoose");
const CompanySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    location:{
        type:String
    },
    Mobile:{
        type:String,
        required:true
    }
});

module.exports=mongoose.model("company",CompanySchema)