const userService=require("../services/user.service")

exports.getUsers=async(req,res)=>{
    try{
        const userData=await userService.getUsers()
        res.status(200).send({
            data:userData
        })
    }
    catch(err){
        res.status(400).send({
            message:"internal sever err"
        })
    }
}