const mongoose = require("mongoose")
schema1 = new mongoose.Schema({
    name:
    {
        type:String,
        required:true
    },
    department:
    {
        type:String,
        required:true,
        minlength:3
    },
    email:
    {
        type:String,
        required:true,
        unique:true
    },
    usn:
    {
        type:String,
        required:true,
        unique:true
    },
    year:
    {
        type:Number,
        required:true
    },
    sem:
    {
        type:Number,
        required:true
    },
    nob:
    {
        type:Number,
        required:true
    }
})

const students = mongoose.model("students",schema1)
module.exports = students