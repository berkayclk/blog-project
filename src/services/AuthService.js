var UserService = require("./UserService");
var AuthUtil = require("../utility/AuthUtil");

class AuthService{
    
    async registerUser(User){  
        var user = await UserService.createUser(User);
        var token = AuthUtil.generateToken(user);
        return token;
    } 

}

module.exports = new AuthService();