const User=require("../models/user.model");
const bcrypt=require("bcrypt")


const createUser=async(data)=>{
    const response={}
    try{
       
        const userObj={
            name:data.name,
            email:data.email,
            password:data.password,
            userType:data.userType,
            userStatus:data.userStatus
        }

        const newUser=await User.create(userObj);
        response.user=newUser
        return response

    }
    catch(err){
        response.error=err.message
        console.log("Err:",err)
        return response
    }
}


const verifyUser=async(data)=>{
    const response={}
    try{
        const userData=await User.findOne({email:data.email})
        if(userData == null){
            response.error="invalid email"

        }
        else{
            const result= bcrypt.compareSync(data.password,userData.password)
            if(result){             
                response.sucess=true
             
            }
            else{
                response.error="Invalid password"
            }
        }
      
        return response

    }
    catch(err){
        response.error=err
        console.log(err)
        return response
    }
}

const getUserByEmail=async(data)=>{

    try{
        const res=await User.findOne({email:data.email})
        return res
    }
    catch(err){
        return err.message
    }

}
module.exports={
    createUser,verifyUser,getUserByEmail
}