const jwt=require("jsonwebtoken")
require('dotenv').config();

const verifyJwtToken=(token)=>{
    try {
        var decoded = jwt.verify(token, process.env.secretkey);
        console.log("secret",process.env.secretkey)
        console.log(decoded,"-------")
      
        return decoded
      } catch(err) {
       
        return err.message
      }

}

module.exports={
    verifyJwtToken
}