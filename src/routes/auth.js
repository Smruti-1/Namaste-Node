const express = require("express");
const authRouter = express.Router();
const {validateSignUpData} = require("../utils/validation")
const User = require("../models/user");
const bcrypt = require("bcrypt")


// authRouter ko router. user krte hai industry
authRouter.post("/signup", async(req,res)=>{
   try {
      // validate data
      validateSignUpData(req);
      const {firstName,lastName,emailId ,password} = req.body;
      // Encrypt pas sword
const passworHash = await bcrypt.hash(password,10)

   // creating new instance of user model
   const user = new User({
      firstName,
      lastName,
      emailId,
      password:passworHash,
   });
   
   await user.save();
   res.send("user added")
   }catch(err){
      res.status(400).send("Error saving the user"+ err.message)
   }
})

authRouter.post("/login",async(req,res)=>{
   try{
const {emailId,password} = req.body;

const user = await User.findOne({emailId: emailId});
if(!user){
   throw new Error("Invalid credentials")
}
const isPasswordValid = await user.validatePassword(password);

if(isPasswordValid){
   // password is correct → login success
   const token = await user.getJWT();
   res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
   });
   res.send("Login successful");
}else{
   // password is incorrect → throw error
   throw new Error("Password not correct");
}

   }catch(err){
      res.status(400).send("Error:" + err.message)
   }
})

authRouter.get("/logout",async(req,res)=>{
    res.cookie("token",null,{
        expires: new Date(Date.now()),
    })
    res.send("User logged out succcessfully")
})
module.exports = authRouter;