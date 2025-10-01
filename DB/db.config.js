const mongoose=require("mongoose");
 
mongoose.connect("mongodb://localhost:27017").then(()=>{
    console.log("Data Base connected Successfully");
}).catch((error)=>{
console.log("Database Not connected")
})