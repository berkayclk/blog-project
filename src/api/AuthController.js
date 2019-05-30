var passport = require("passport");
var express = require('express');
var authController = express.Router();

var AuthService = require("../services/AuthService");

var ApiResponse = require("../models/ApiResponse");
const HttpResponseCode = require("../constants/HttpResponseCodes");
var AuthUtil = require("../utility/AuthUtil");
var LogUtil = require("../utility/LogUtil");

authController.post("/login",passport.authenticate('local',{session:false}) ,(req,res,next)=>{
    
    const token = AuthUtil.generateToken(req.user);
    var keyValue = AuthUtil.generateHeaderKeyValue(token);
    res.header(keyValue.key, keyValue.value).send();
});

authController.get("/logout", passport.authenticate('jwt',{session:false}) ,(req,res,next)=>{
    //TODO: create blacklist
    res.status(HttpResponseCode.BAD_REQUEST).send();
});

authController.post("/register", (req,res,next)=>{
    
    if( !req.body.User ){
        LogUtil.LogError("User is not valid!");
        res.status(HttpResponseCode.BAD_REQUEST).send(new ApiResponse("User is required!"));
    }
        
    AuthService.registerUser(req.body.User)
                .then( token =>  {
                    
                    if( !token ) res.send();

                    var keyValue = AuthUtil.generateHeaderKeyValue(token);
                    res.header(keyValue.key, keyValue.value)
                        .status(HttpResponseCode.CREATED)
                        .send();
                    
                } )
                .catch( err => {
                    LogUtil.LogError(err);
                    res.status(HttpResponseCode.BAD_REQUEST).send()
                });

});

module.exports = authController;