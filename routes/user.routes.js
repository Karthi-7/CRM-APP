const userController=require("../controller/user.controller")
const authenticator=require("../middleware/auth.validator")
module.exports=function(app){
    app.get('/crm/api/v1/users',authenticator.authValidator,authenticator.isAdmin,userController.getUsers)
}