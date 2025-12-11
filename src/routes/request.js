const express = require("express");
const requestRouter = express.Router();

const {userAuth} = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user")

//someone sending request
requestRouter.post("/request/send/:status/:toUserId", 
  userAuth, 
  async (req, res) => {
  const user = req.user;
try{
  const fromUserId = req.user._id;
const toUserId = req.params.toUserId;
const status = req.params.status;

//  if (fromUserId.toString() === toUserId.toString()) {
//             return res.status(400).send({ message: "Cannot send request to yourself" });
//         } 

const allowedStatus = ["ignore","interested"];
if(!allowedStatus.includes(status)){
return res
.status(400)
.json({message : "Invalid status type" + status})
}

const toUser = await User.findById(toUserId);
if(!toUser){
  return res.status(400).send({message : "User not found"})
}

const existingConnectionRequest = await ConnectionRequest.findOne({
  $or : [
    {fromUserId,toUserId},
    {fromUserId: toUserId, toUserId:fromUserId},
  ],
});
if(existingConnectionRequest){
  return res.status(400).send({message : "Connection request already exist"})
}
const connectionRequest = new ConnectionRequest({
  fromUserId,
  toUserId,
  status,
});

const data = await connectionRequest.save();

res.json({
  message : "Connection request sent successfully",
  data,
});
}catch(err){
  res.status(400).send("Error:" + err.message);
}

});

//  the reciever of req.
requestRouter.post("/request/review/:status/:requestId",
  userAuth,
  async(req,res)=> {
    try{
const loggedInUser = req.user;
const {status,requestId} = req.params;

const allowedStatus = ["accepted","rejected"];
if(!allowedStatus.includes(status)){
  return res.status(400).json({message: "Status not allowed"})
}

const connectionRequest = await ConnectionRequest.findOne({
  _id : requestId,
  toUserId : loggedInUser._id,
  status : "interested",
});
console.log("Logged in user:", loggedInUser._id);
console.log("To user in DB:", "691c7167c49b15e27fbc467d");

connectionRequest.status = status;

const data = await connectionRequest.save();

res.json({message : "Connection request" + status ,data});

    }catch(err){
      res.status(400).send("ERROR:" + err.message);
    }
    
  }
)


module.exports = requestRouter;

// 3340  "emailId":
// "emrbfkwjbekj@gmail.com",
// "password":"Jsdfvhjf@01265"
// }6938524168a8686d9c0a1e24

// 2431 no api run req rev stat id