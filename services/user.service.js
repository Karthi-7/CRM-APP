const User=require("../models/user.model");

const getUsers=async()=>{
    try{
        const response=await User.find()
        return response
    }
    catch(err){
        return err.message
    }
}

module.exports={
    getUsers
}