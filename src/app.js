  const express = require('express'); 
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user");
const {validateSignUpData} = require("../utils/validation")
const bcrypt = require("bcrypt")
app.use(express.json())

app.post("/signup", async(req,res)=>{
   try {
      // validate data
      validateSignUpData(req);
      const {firstName,lastName,emailId ,password} = req.body;
      // Encrypt password
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

app.post("/login",async(req,res)=>{
   try{
const {emailId,password} = req.body;

const user = await User.findOne({emailId: emailId});
if(!User){
   throw new Error("Invalid credentials")
}
const isPasswordValid = await bcrypt.compare(password,user.password);
if(!isPasswordValid){
   res.send("Login successfull")
}else{
   throw new Error("Password not coorect")
}
   }catch(err){
      res.status(400).send("Error:" + err.message)
   }
})

 app.get("/user",async (req,res)=> {
   const userEmail = req.body.emailId;
// console.log(userEmail,"userme")
   try{
   //   const user = await User.find({emailId : userEmail});
    const user = await User.findOne({emailId : userEmail});
     if(user.length === 0){
      res.status(400).send("User not found")
     }else{
      res.send(user)
     }}
   catch(err){
      res.status(400).send("something went wrong")
   }
 })

app.delete("/user",async(req,res)=>{
   const userId = req.body.userId;
   try{
      const user = await User.findByIdAndDelete(userId);
      res.send("user deleted successfully");
   }catch(err){
      res.status(400).send("Something wrong")
   }
})

app.patch("/user",async(req,res)=>{
   const userId = req.body.userId;
   const data = req.body;
   try {
      const AlLLOWED_UPDATES = [
"userId",
"photoUrl",
"gender",
"about",
"age",
"skills",
      ];
      const isUpdateAllowe = Object.keys(data).every((k)=>
      AlLLOWED_UPDATES.includes(k)
   );
   if(!isUpdateAllowe){
      throw new Error("Update not allowed")
   }
   if(data?.skills.length>10){
      throw new Error("Skills cant be more than 10")
   }
     const user = await User.findByIdAndUpdate({_id: userId},data,{
      returnDocument: "after",
      runValidators: true,
     });
      res.send("User updated")
   }catch(err){
      res.status(400).send("Something went wrong")
   }
});

    connectDB()
 .then(()=> {
    app.listen(3009,()=>{
    console.log("Hi my server started.")
});
 })
 .catch((err)=> {
    console.log("Not connected")
 })




 
