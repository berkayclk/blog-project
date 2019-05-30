var UserService = require("./UserService");
var AuthUtil = require("../utility/AuthUtil");

class AuthService{
    
    registerUser(User){
        return new Promise( (resolve,reject)=>{
            
            UserService.createUser(User)
                        .then( userResult => {
                            var tokenModel = AuthUtil.generateToken(userResult);
                            resolve(tokenModel.token);
                        })
                        .catch( err => reject(err));
        });
    } 

}

module.exports = new AuthService();