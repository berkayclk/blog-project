var express = require('express');
var userController = express.Router();

var UserService = require("../services/UserService");
var LogUtil = require("../utility/LogUtil");
var HttpResponseCode = require("../constants/HttpResponseCodes");
var ApiResponse = require("../models/ApiResponse");
var checkToken = require("../handlers/AuthenticateHandler");

userController.get("/", checkToken, (req,res,next)=>{

    UserService.findById(req.AuthUser._id)
                    .then( user => {
                        res.status(HttpResponseCode.OK).send(  new ApiResponse(null,user) );
                    })
                    .catch( err => {
                        LogUtil.LogError( "userController - \ - "+ err );
                        res.status(HttpResponseCode.DATA_NOT_FOUND).send( new ApiResponse("User could not found!") );
                    });

});

userController.post("/follow", checkToken, (req,res,next)=>{
    
    if( !req.body.followingId ){
        LogUtil.LogError( "userController - \\follow - followingId is reqired!" );
        res.status(HttpResponseCode.BAD_REQUEST).send( new ApiResponse("followingId is reqired") );
        return;
    }

    var followerId = req.AuthUser._id;
    var followingId = req.body.followingId;
    
    UserService.followUser(followerId,followingId)
                        .then( user =>{ 
                            LogUtil.LogError( "userController - \\follow - " + user );
                            res.status(HttpResponseCode.CREATED).send(); 
                        })
                        .catch( err =>{
                            LogUtil.LogError( "userController - \\follow - " + err );
                            res.status(HttpResponseCode.BAD_REQUEST).send( new ApiResponse("Following is failed!") )
                        });
});

userController.post("/unfollow",checkToken, (req,res,next)=>{
   
    if( !req.body.followingId ){
        LogUtil.LogError( "userController - \\unfollow - followingId is reqired!" );
        res.status(HttpResponseCode.BAD_REQUEST).send( new ApiResponse("followingId is reqired") );
        return;
    }

    var followerId = req.AuthUser._id;
    var followingId = req.body.followingId;
    
    UserService.unfollowUser(followerId,followingId)
                        .then( user =>{
                            LogUtil.LogError( "userController - \\unfollow - " + user );
                            res.status(HttpResponseCode.CREATED).send(); 
                        })
                        .catch( err =>{

                            LogUtil.LogError( "userController - \\unfollow - " + err );
                            res.status(HttpResponseCode.BAD_REQUEST).send( new ApiResponse("Following is failed!") );

                        });
});

module.exports = userController;