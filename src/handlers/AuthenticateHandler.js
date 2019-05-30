var UserService = require("../services/UserService");
var HttpResponseCodes = require("../constants/HttpResponseCodes");
var ApiResponse = require("../models/ApiResponse");
var AuthUtil = require("../utility/AuthUtil");
var LogUtil = require("../utility/LogUtil");

function checkToken(req,res,next){

    try {
        
        const token = AuthUtil.getTokenFromHeader(req);
        if( !token ){
            LogUtil.LogError("checkToken - "+ req.url +" - There is no token in Header! ");
            res.status(HttpResponseCodes.UNAUTHORIZED).send();
            return;
        }
    
        var tokenModel = AuthUtil.parseToken(token);
        if( !tokenModel )
        {
            LogUtil.LogError("checkToken - "+ req.url +" - There is no valid token in Header! ");
            res.status(HttpResponseCodes.UNAUTHORIZED).send();
            return;
        }
    
        if( Date.now() > tokenModel.expireDate ){
            LogUtil.LogError("checkToken - "+ req.url +" - Token is Expired!");
            res.status(HttpResponseCodes.UNAUTHORIZED).send( new ApiResponse("Token is Expired!") );
            return;
        }
        
        UserService.findById(tokenModel._id,)
                                .then(AuthUser => {
                                    
                                    if( !AuthUser ){
                                         res.status(HttpResponseCodes.UNAUTHORIZED).send();
                                         return;
                                    }
    
                                    req.AuthUser = AuthUser;
                                    req.Token = token;
                                    next();
                                })
                                .catch( err => {
                                    LogUtil.LogError("checkToken - "+ req.url +" - "+ err);
                                    res.status(HttpResponseCodes.UNAUTHORIZED).send(); 
                                });

    }catch(err){
        LogUtil.LogError("checkToken - "+ req.url +" - "+ err);
        res.status(HttpResponseCodes.UNAUTHORIZED).send();
    }
}

module.exports = checkToken;