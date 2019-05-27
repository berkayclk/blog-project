var UserService = require("../services/UserService");
var HttpResponseCodes = require("../constants/HttpResponseCodes");
var ApiResponse = require("../models/ApiResponse");
var AuthUtil = require("../utility/AuthUtil");


function checkToken(req,res,next){

    const token = AuthUtil.getTokenFromHeader(req);
    if( !token )
        res.status(HttpResponseCodes.UNAUTHORIZED).send();
    
    var tokenModel = AuthUtil.parseToken(token);
    if( Date.now() > tokenModel.expireDate )
        res.status(HttpResponseCodes.UNAUTHORIZED).send( new ApiResponse("Token is Expired!") );
    
    UserService.findByToken(tokenModel._id, token)
                            .then(AuthUser => {
                                req.AuthUser = AuthUser;
                                req.Token = token;
                                next();
                            })
                            .catch( err => res.status(HttpResponseCodes.UNAUTHORIZED).send( new ApiResponse(err)) )

}

module.exports = checkToken;