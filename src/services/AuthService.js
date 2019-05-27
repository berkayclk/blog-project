var UserService = require("./UserService");
var AuthUtil = require("../utility/AuthUtil");

class AuthService{
    
    loginUser(User){
        return new Promise( (resolve,reject)=>{
            
            if(!User || !User.Username || !User.Password)
                reject("Missing argument");
            
            UserService.findByUsernamePassword(User.Username,User.Password)
                                .then(userResult =>{
                                    var tokenModel = AuthUtil.generateToken(userResult);
                                    UserService.saveAuthToken(userResult,tokenModel)
                                                    .then( res => resolve(tokenModel.token))
                                                    .catch(err => reject(err));

                                })
                                .catch( err => { reject(err)});
        });
    }

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
                                            .catch(err => reject(err));
                        })
                        .catch( err => reject(err));
        });
    } 

}

module.exports = new AuthService();