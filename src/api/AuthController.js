var passport = require("passport");
var express = require('express');
var authController = express.Router();

var AuthService = require("../services/AuthService");

var ApiResponse = require("../models/ApiResponse");
const HttpResponseCode = require("../constants/HttpResponseCodes");
var AuthUtil = require("../utility/AuthUtil");
var LogUtil = require("../utility/LogUtil");

authController.post("/login",passport.authenticate('local',{session:false}) , async (req,res,next)=>{
    
    const token = AuthUtil.generateToken(req.user);
    var keyValue = AuthUtil.generateHeaderKeyValue(token);
    res.header(keyValue.key, keyValue.value).send();

});

authController.get("/logout", passport.authenticate('jwt',{session:false}) ,(req,res,next)=>{
    //TODO: create blacklist
    res.status(HttpResponseCode.BAD_REQUEST).send();
});

authController.post("/register", async (req,res,next)=>{
    
    if( !req.body.User ){
        LogUtil.LogError("User is not valid!");
        res.status(HttpResponseCode.BAD_REQUEST).send(new ApiResponse("User is required!"));
    }

    try{
        
        let token = await AuthService.registerUser(req.body.User);
        if( !token ) res.send();

        let keyValue = AuthUtil.generateHeaderKeyValue(token);
        res.header(keyValue.key, keyValue.value)
            .status(HttpResponseCode.CREATED)
            .send();

    }catch( err ) {
        LogUtil.LogError("Register"+cerr);
        res.status(HttpResponseCode.BAD_REQUEST).send()
    };

});

module.exports = authController;