const express = require("express")
require("./connection")
const port = process.env.PORT || 3000
const app = express()
var flag = true
const borrower = require("./schema")
const students = require("./schema1")
const dept = require("./schema2")
app.use(express.static("static"))
app.use(express.urlencoded())
app.set("view engine","hbs")
app.set("views",(__dirname,"./public"))
app.get("",(req,res) => {
    res.render("library",{})
})

app.get("/students",(req,res) => {
    res.render("students",{})
})

app.post("/submit",async(req,res) => {
    const bor = await new borrower(req.body)
    await bor.save().then(() => {
        flag=true
    }).catch((err) => {
        flag=false
        res.render("404",{
            "error":"This ISBN is Already borrowed or you do not fill all the details.",
            "back":"/"
        })
    })
    if(flag)
    {
        const stud = await students.find({"name":req.body.name,"usn":req.body.usn})
        if(JSON.stringify(stud) == "[]")
        {
            const newstud = await new students({"name":req.body.name,"department":req.body.department,"usn":req.body.usn,"year":req.body.year,"email":req.body.email,"sem":req.body.sem,"nob":1})
            newstud.save().then(() => {  
               res.render("library",{})             
            }).catch(() => {
                res.render("404",{})
            })
        }
        else
        {
            var num = stud[0].nob
            num=num+1
            students.updateOne({"name":req.body.name,"usn":req.body.usn},{$set:{"nob":num}}).then(() => {
                res.render("library",{})
            }).catch(() => {
                res.render("404",{})
            })
        }
    }
})

app.get("/getone",async(req,res) => {
    const bor = await borrower.find()
    res.send({
        "bor": bor
    })
})

app.get("/dept",async(req,res) => {
    const dep = await dept.find({"name":req.query.name})
    if(JSON.stringify(dep) =="[]")
    {
        res.render("404",{
            "error":"Department Not Found",
            "back":"/students"
        })
    }
    res.render("department",{
        "name":dep[0].name,
        "HOD":dep[0].HOD,
        "about":dep[0].about,
        "vision":dep[0].vision,
        "mission":dep[0].mission
    })
})

app.get("/stud",async(req,res) => {
    const stud = await students.find();
    res.send({
        "stud":stud
    })
})

app.get("/studet",async(req,res) => {
    const name = req.query.name
    const stu = await students.find({"name":name});
    res.render("eachone",{
        "name":stu[0].name,
        "department":stu[0].department,
        "usn":stu[0].usn,
        "email":stu[0].email,
        "year":stu[0].year,
        "sem":stu[0].sem,
        "nob":stu[0].nob,
    })
})


app.get("/del",async(req,res) => {
    await borrower.deleteOne({"name":req.query.name})
    const stu = await students.find({"name":req.query.name});
    var num = stu[0].nob
    num=num-1
    await students.updateOne({"name":req.query.name},{$set:{"nob":num}})
    res.render("library",{})
})

app.get("/other",async(req,res) => {
    const stu = await students.find({"name":req.query.name})
    res.render("library",{
        "name":stu[0].name,
        "department":stu[0].department,
        "email":stu[0].email,
        "usn":stu[0].usn,
        "year":stu[0].year,
        "sem":stu[0].sem,

    })
})

app.listen(port,() => {
    console.log("Server is running on Port " + port)
})