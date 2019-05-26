var Posts = require("../models/Post");
const PostStatus = require("../constants/PostConstants").PostStaus;

class PostService{

    getAllPosts(){
        return new Promise((resolve,reject) =>{
           
            Posts.find( (err,res) =>{
                if( err )
                    reject(err);
                
                resolve(res);
            });
       });
    }

    findById(postId){
       return new Promise((resolve,reject) =>{
            
            Posts.findById(postId, (err,res) =>{
                if( err )
                    reject(err);
                
                resolve(res);
            });
       });
    }

    findByUser(User){
        return new Promise((resolve,reject) =>{

            var Followings = User.Following.map( followingUser => followingUser.id);

             //User can view all own posts and public posts of followigs.
            var conditions = {
                $or : [
                    {
                        Author : { $in : Followings },
                        Status : PostStatus.PUBLIC
                    },
                    {
                        Author: User._id
                    }
                ]
                
            };

            Posts.find(conditions, (err,res) =>{
                if( err )
                    reject(err);
                
                resolve(res);
            });

       });
    }
       
    createPost(post){
        var postModel = new Posts(post);
        return postModel.save();
     }

     updatePost(post){
        return new Promise((resolve,reject) =>{
             
            Posts.findOneAndUpdate(
                        { _id : post._id }, // findById
                        post,            // updated with body in request
                        {new:true, runValidators:true },     // return new updated data
                        (err,res)=>{
                            if(err) reject(err);
                            resolve(res);
                        });
        });
     }

     deletePost(postId){
        return new Promise((resolve,reject) =>{
           
            Posts.deleteOne( 
                    { _id : postId }, // findById
                    (err)=>{
                        if(err) reject(err);
                        resolve("Post is deleted");
                    });
        });
     }
}

module.exports = new PostService();