const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName : {
        type : String
    },
    lastName : {
type : String
    },
    emailId : {
type : String,
lowercase:true,
required:true,
unique: true,
trim: true,
validate(value){
    if(!validator.isEmail(value)){
        throw new Error("Invalid emaail address"+ value);
    }
},
    },
    password : {
        type: String,
        required: true,
    },
    age : {
        type : Number,
        min:19,
    },
    gender : {
        type : String,
       validate(value){
        if(!["male","female","others"].includes(value)){
            throw new Error("Gender not valid")
        }
        },
    },
    photoUrl:{
        type: String,
        default :"https://randomuser.me/api/portraits/lego/1.jpg",
    },
     about : {
        type : String,
        default : "This is a default about of the user!"
    },
    skills:{
        type: [String],
    },
},
{
timestamps:true,
}
    
);

module.exports = mongoose.model("User",userSchema)


