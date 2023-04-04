const authService=require("../services/auth.service")
const authValidation=require("../services/verifyauth")



const authValidator=async(req,res,next)=>{
    let token=req.headers['x-access-token'];
    if(!token){
        return res.status(401).send(
            {
                message:"jwt token not provided"
            }
        )
    }
    const isVerifiedToken= authValidation.verifyJwtToken(token)
    console.log(isVerifiedToken,"veeee")




    if(!isVerifiedToken || isVerifiedToken === "invalid token"){
        return res.status(401).send({
            message: "jwt token is invalid"
        })
    }

    const userinfo=await authService.getUserByEmail({email:isVerifiedToken.email})
   
    if(!userinfo){
        res.status(401).send({
            message:"invalid email"
        })
    }
    req.user=userinfo;
    next()
}

const isAdmin=async(req,res,next)=>{
    if(!req.user){
        res.status(401).send({
            message:"invalid user"
        })
    }
    if(!req.user.userType == "admin" ){

        res.status(401).send({
            message:"user is not an admin "
        })

    }
    next()
}

module.exports={
    authValidator,isAdmin
}