const authService=require("../services/auth.service");
const jwt=require("jsonwebtoken")
require("dotenv").config()


exports.signup=async(req,res)=>{
    
    try{
        const result=await authService.createUser(req.body)
        let statuscode;
        let response;
        if(result.error){
            statuscode=403;
            response=result.error
        }else{
            statuscode=201;
            response=result.user
        }

        res.status(statuscode).send({
            result:response
        })

    }
    catch(err){
        cosnol.log(err)
        res.status(500).send({
            result:err
        })
    }

}

//signin

exports.signin=async(req,res)=>{
    try{
        let statuscode;
        let response={}
        const result=await authService.verifyUser(req.body);
        if(result.error){
          statuscode=401;
          response=result.error
        }else{
            const token = jwt.sign({ email:req.body.email },process.env.secretkey);
            statuscode=201;
           
            response.message="valid user";
            response.jwt_token=token
        }
        res.status(statuscode).send({
            result:response,
          
        })

    }
    catch(err){
        res.status(500).send({
            result:err.message
        })
    }
}