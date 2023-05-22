const express = require("express");
const {config} = require("../config/secret");
const cloudinary = require('cloudinary').v2;
const router = express.Router();

cloudinary.config({
  cloud_name: config.CLOUD_NAME,
  api_key: config.CLOUD_KEY,
  api_secret: config.CLOUD_SECRET
});
// mongodb+srv://moti2:Mg206491300@cluster0.7tjbdlb.mongodb.net/
router.get("/", async(req,res) => {
  res.json({msg:"Upload work"});
})

router.post("/cloud1", async(req,res) => {
  try{
    const myFile = req.files.myFile;
    if(myFile){
      const data = await cloudinary.uploader.upload(myFile.tempFilePath,{
        unique_filename:true
      })
      res.json(data)
    }

  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})


module.exports = router;