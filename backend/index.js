const express=require("express");
const { generateFile } = require("./generateFile");
const { executeCpp } = require("./executeCpp");
const cors = require('cors');

const app=express();

// middlewares
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// routes
app.get("/",(req,res)=>{
    res.json({online:"compiler"});
})

app.post("/run",async(req,res)=>{
    // const language=req.body.language;
    // const code=req.body.code;
    const {language,code}=req.body;
    if(code=== undefined)
    {
        return res.status(404).json({success:false,error:"Code is empty"});
    }
    try{
    const filePath=await generateFile(language,code);
    const output=await executeCpp(filePath);
    res.json({filePath,output});}
    catch(error)
    {
        res.status(500).json({error:error});
        
    }
})
app.listen(5000,()=>{
    console.log("Server running on port 5000!!");
})