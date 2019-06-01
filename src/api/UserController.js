var express = require('express');
var userController = express.Router();

var UserService = require("../services/UserService");
var LogUtil = require("../utility/LogUtil");
var HttpResponseCode = require("../constants/HttpResponseCodes");
var ApiResponse = require("../models/ApiResponse");

userController.get("/", async (req,res,next)=>{

    try{
        var authenticatedUser = await UserService.findById(req.user._id);
        res.status(HttpResponseCode.OK).send(  new ApiResponse(null, authenticatedUser ) );

    }catch(err){
        LogUtil.LogError( "userController - \ - "+ err );
        res.status(HttpResponseCode.DATA_NOT_FOUND).send( new ApiResponse("User could not found!") );
    }

});

userController.post("/follow",  async (req,res,next)=>{
    
    if( !req.body.followingId ){
        LogUtil.LogError( "userController - \\follow - followingId is required!" );
        res.status(HttpResponseCode.BAD_REQUEST).send( new ApiResponse("followingId is reqired") );
        return;
    }

    var followerId = req.user._id;
    var followingId = req.body.followingId;
    
    try{
        await UserService.followUser(followerId,followingId);
        res.status(HttpResponseCode.CREATED).send();
    }catch(err){
        LogUtil.LogError( "userController - \\follow - " + err );
        res.status(HttpResponseCode.BAD_REQUEST).send( new ApiResponse("Following was failed!") )
    }

});

userController.post("/unfollow", async (req,res,next)=>{
   
    if( !req.body.followingId ){
        LogUtil.LogError( "userController - \\unfollow - followingId is required!" );
        res.status(HttpResponseCode.BAD_REQUEST).send( new ApiResponse("followingId is required") );
        return;
    }

    var followerId = req.user._id;
    var followingId = req.body.followingId;
    
    try{
        await UserService.unfollowUser(followerId,followingId);
        res.status(HttpResponseCode.CREATED).send();
    }catch(err){
        LogUtil.LogError( "userController - \\unfollow - " + err );
        res.status(HttpResponseCode.BAD_REQUEST).send( new ApiResponse("Following is failed!") );
    }

});

userController.get("/suggestUser", async (req,res,next)=>{
  
    try{
        let suggestedUsers = await UserService.suggestUser(req.user);
        if( !suggestedUsers )
            return res.status(HttpResponseCode.DATA_NOT_FOUND).send( new ApiResponse("There is no user to suggest.") );

        res.send(suggestedUsers);    
    }catch( err ){
        LogUtil.LogError( "userController - /suggestUser - " + err );
        res.status(HttpResponseCode.BAD_REQUEST).send( new ApiResponse("User suggestion was failed!") );
    }
});

module.exports = userController;