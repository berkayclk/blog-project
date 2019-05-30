var express = require('express');
var postController = express.Router();

var PostService = require("../services/PostService");
var PostConstants = require("../constants/PostConstants");
var LogUtil = require("../utility/LogUtil");
var HttpResponseCode = require("../constants/HttpResponseCodes");
var ApiResponse = require("../models/ApiResponse");

postController.get("/",  (req,res,next)=>{

    PostService.findByUser(req.user)
                    .then( posts => {
                        res.status(HttpResponseCode.OK).send(  new ApiResponse(null,posts) );
                    })
                    .catch( err => {
                        LogUtil.LogError( "postController - / - "+ err );
                        res.status(HttpResponseCode.DATA_NOT_FOUND).send( new ApiResponse("Posts could not be found!") );
                    });

});

postController.post("/createPost", (req,res,next)=>{
    
    if( !req.body.Post ){
        LogUtil.LogError( "postController - /createPost - Post is reqired in request body!" );
        res.status(HttpResponseCode.BAD_REQUEST).send( new ApiResponse("Post is reqired in request body!") );
        return;
    }

    req.body.Post.Author = req.user._id;

    PostService.createPost(req.body.Post)
                    .then( post => {
                        res.status(HttpResponseCode.OK).send(  new ApiResponse(null,post) );
                    })
                    .catch( err => {
                        LogUtil.LogError( "postController - /createPost - "+ err );
                        res.status(HttpResponseCode.DATA_NOT_FOUND).send( new ApiResponse("Post could not be created!") );
                    });

});

postController.get("/:postId", (req,res,next)=>{
    
    if( !req.params.postId ){
        LogUtil.LogError( "postController - /:postId - postId is reqired in request parameter!" );
        res.status(HttpResponseCode.BAD_REQUEST).send( new ApiResponse("postId is reqired in request parameter!") );
        return;
    }

    PostService.findByPostIdAndUser(req.params.postId, req.user)
                    .then( post => {
                        res.status(HttpResponseCode.OK).send(  new ApiResponse(null,post) );
                    })
                    .catch( err => {
                        LogUtil.LogError( "postController - /:postId  postId:"+ req.params.id+" - "+ err );
                        res.status(HttpResponseCode.DATA_NOT_FOUND).send( new ApiResponse("Post could not be found!") );
                    });

});

postController.get("/switchStatus/:postId", (req,res,next)=>{
    
    if( !req.params.postId ){
        LogUtil.LogError( "postController - /switchStatus/:postId - postId is reqired in request parameter!" );
        res.status(HttpResponseCode.BAD_REQUEST).send( new ApiResponse("postId is reqired in request parameter!") );
        return;
    }

    PostService.findById(req.params.postId) // find post 
                    .then( post => {

                        if( post.Author.toString() !== req.user.id )  // check author of post
                        {
                            LogUtil.LogError( "postController - /switchStatus/postId  postId:"+ req.params.postId + " User is not owner of this post! " );
                            res.status(HttpResponseCode.UNAUTHORIZED).send( new ApiResponse("You are not owner of this post!") );
                            return;
                        }

                        post.Status = post.Status === PostConstants.PostStaus.PRIVATE ? PostConstants.PostStaus.PUBLIC : PostConstants.PostStaus.PRIVATE;
                        post.save()
                                .then( result => res.status(HttpResponseCode.CREATED).send() )
                                .catch( err => {
                                    LogUtil.LogError( "postController - /switchStatus/postId  postId:"+ req.params.id+" - "+ err );
                                    res.status(HttpResponseCode.DATA_NOT_FOUND).send( new ApiResponse("Post's status could not be switched!") );
                                });
                    })
                    .catch( err => {
                        LogUtil.LogError( "postController - /switchStatus/postId  postId:"+ req.params.id+" - "+ err );
                        res.status(HttpResponseCode.DATA_NOT_FOUND).send( new ApiResponse("Post could not be found!") );
                    });

});

module.exports = postController;