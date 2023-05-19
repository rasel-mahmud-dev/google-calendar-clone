const mongoose = require("mongoose")


const User = mongoose.model("User", new mongoose.Schema({
    firstName: String,
    lastName: String,
    password: String,
    email: String,
    avatar: String
}, {timestamps: true}))


module.exports =  User