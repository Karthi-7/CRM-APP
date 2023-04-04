const express=require("express");
const bodyParser = require('body-parser')
const mongoose=require("mongoose");
const DbUrl=require("./config/db.config")
const app=express();
const PORT=require("./config/server.config")
const authRoutes=require("./routes/auth.routes")
const userRoutes=require("./routes/user.routes")


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
authRoutes(app)
userRoutes(app)

app.listen(PORT,async()=>{
    console.log("listening to the PORT:",PORT)
    await mongoose.connect(DbUrl)
.then(()=>{
    console.log("mongoose connected")
},err=>{
    console.log("error occoured",err)
})
})



