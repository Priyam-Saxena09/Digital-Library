const mongoose = require("mongoose")
schema2 = new mongoose.Schema({
    name:
    {
        type:String,
        required:true
    },
    HOD:
    {
        type:String,
        required:true
    },
    about:
    {
        type:String,
        required:true
    },
    vision:
    {
        type:String,
        required:true
    },
    mission:
    {
        type:String,
        required:true
    }
})

const dept = mongoose.model("dept",schema2)
module.exports = dept