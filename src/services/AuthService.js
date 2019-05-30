var UserService = require("./UserService");
var AuthUtil = require("../utility/AuthUtil");

class AuthService{
    

    logoutUser(User,AuthToken){
        return new Promise( (resolve,reject)=>{
            
            if( !User || !AuthToken )
                reject("Missing argument");
            
            UserService.removeAuthToken(User, AuthToken)
                                .then(res =>  resolve("Logout succesfully"))
                                .catch( err => reject(err));
        });
    }

    registerUser(User){
        return new Promise( (resolve,reject)=>{
            
            UserService.createUser(User)
                        .then( userResult => {
                            var tokenModel = AuthUtil.generateToken(userResult);
                            UserService.saveAuthToken(userResult,tokenModel)
                                            .then( res => resolve(tokenModel.token))
                                            .catch(err => resolve());
                        })
                        .catch( err => reject(err));
        });
    } 

}

module.exports = new AuthService();