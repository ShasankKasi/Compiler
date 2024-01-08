const {exec}=require("child_process");
const fs=require("fs");
const path=require("path");
// const { fileURLToPath } = require("url");

const outputPath=path.join(__dirname,"outputs");

if(!fs.existsSync(outputPath))
{
    fs.mkdirSync(outputPath,{ recursive : true});
}

const executeCpp=(filePath)=>{
  
    const jobID=path.basename(filePath).split(".")[0];
    const outPath=path.join(outputPath,`${jobID}.exe`);
    // const fil1=`"${filePath}"`;
    return new Promise((resolve,reject)=>{
       exec(
         `g++ "${filePath}" -o "${outPath}" && cd ${outputPath} && .\\${jobID}.exe`,
         (error,stdout,stderr)=>
         {
          if(error){
            reject({error,stderr});
          }
          if(stderr){
            reject({stderr});
          }
          resolve(stdout);
         }
       );
    });
};

module.exports={executeCpp,}