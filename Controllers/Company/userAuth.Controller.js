const Company=require("../../modal/companySchema");
const User=require("../../modal/userSchema");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken");

exports.Registration=async(req,res)=>{
    const {email,password,name,Mobile,location}=req.body;
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
     let data=new Company({
        email,password:hashedPassword,name,Mobile,location
     })
     await data.save();
     return res.status(201).json({status:true,message:"Registration successfully"});

}catch(error){
 res.status(500).json({status:false,message:"Internal server error",error:error.message})
}
}


exports.Login=async(req,res)=>{
    const {email,password}=req.body;
try{
    if(!email&&!password){
        return res.status(400).json({status:false,message:"All Fields required"});
    }
     const company=await Company.findOne({email:email});
      const user=await User.findOne({email:email})
     if(!company &&!user){
        return res.status(404).json({status:false,message:"Email not exists in our database"});
     }

     if(company){
       let ComparePass=await bcrypt.compare(password,company.password);
       if(!ComparePass){
        return res.status(402).json({status:false,message:"Invalid Pasword"});
       }
      let token=await jwt.sign({_id:company._id},process.env.SecretKey||"1234567890");
         return res.status(200).json({status:true,tab:"company",token:token})
     }

      if(user){
       let ComparePass=await bcrypt.compare(password,user.password);
       if(!ComparePass){
        return res.status(402).json({status:false,message:"Invalid Pasword"});
       }
      let token=await jwt.sign({_id:user._id},process.env.SecretKey||"1234567890");
         return res.status(200).json({status:true,tab:"user",token:token})
     }
}catch(error){
return res.status(500).json({status:false,message:"Internal server error",error:error.message})
}
}
