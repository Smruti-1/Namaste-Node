const mongoose = require("mongoose");

const connectDB = async() => {
    await mongoose.connect(
        "mongodb+srv://smrutisakre01:Smruti01@cluster0.dnhyouj.mongodb.net/devTinder"
    )
};

module.exports = connectDB;

