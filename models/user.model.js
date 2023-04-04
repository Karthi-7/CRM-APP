const mongoose = require("mongoose");
const {Schema} = mongoose;
const bcrypt=require("bcrypt")
const userSchema=new Schema({
    name:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        unique:true,
        required:true,
        match:/\S+@\S+\.\S+/,
        lowercase:true
    },
    password:{
        type:String,
        minLength:5,
        maxLength:50,
        required:true,
        match:/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,50}$/
    },
    createdAt:{
        type:Date,
        immutable:true,
        default: Date.now

    },
    updatedAt:{
        type:Date,
        default: Date.now
        

    },
    userType:{
        type:String,
        required:true,
        default:"customer",
        enum:["customer","admin","engineer"]


    },
    userStatus:{
        type:String,
        required:true,
        default:"approved"

    }
    
  

});
userSchema.pre('save', async function(next) {
    const hashedPassword =await  bcrypt.hashSync(this.password, 11);
    this.password = hashedPassword;
    next();
});



module.exports=mongoose.model("User",userSchema)