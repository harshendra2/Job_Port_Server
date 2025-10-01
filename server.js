const express=require("express");
require("dotenv").config();
const cors=require("cors");
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./docs/swagger-output.json');

let PORT=process.env.PORT || 4000;
const app=express();

app.use(cors({
    origin:["http://localhost:3000","http://localhost:3001","http://localhost:5173","http://localhost:3002"]
}))

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use("/api",require("./Routes/Company/user.routes"));
app.use("/api",require("./Routes/Candidate/candidate.routes"))
app.use("/api",require("./Routes/Company/job_post.routes"));
app.use("/api",require("./Routes/Candidate/job_appy.routes"))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));


  const swaggerAutogen = require('./swagger');



app.listen(PORT,()=>{
    require("./DB/db.config")
    console.log(`Server is Running in Port No: ${PORT}`);
})


