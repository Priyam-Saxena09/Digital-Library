const mongoose = require("mongoose")
schema = new mongoose.Schema({
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
    usn:
    {
        type:String,
        required:true
    },
    year:
    {
        type:Number,
        required:true
    },
    email:
    {
        type:String,
        required:true
    },
    sem:
    {
        type:Number,
        required:true
    },
    bname:
    {
        type:String,
        required:true
    },
    isbn:
    {
        type:Number,
        required:true,
        unique:true
    },
    bauthor:
    {
        type:String,
        required:true
    }
})

const borrower = mongoose.model("borrower",schema)
module.exports = borrower