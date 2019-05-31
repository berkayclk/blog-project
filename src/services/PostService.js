var Posts = require("../models/Post");
const PostStatus = require("../constants/PostConstants").PostStaus;

class PostService{

    async getAllPosts(){
        return await Posts.find();
    }

    async findById(postId){
        return await Posts.findById(postId);
    }

    async findByPostIdAndUser(postId,User){
        
        var Followings = User.Following.map( followingUser => followingUser.id);

        //User can view all own posts and public posts of followigs.
        var conditions = {
                _id: postId,
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

        return await Posts.find(conditions);
     }

    async findByUser(User){
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

        return await Posts.find(conditions);
    }
       
    async createPost(post){
        var postModel = new Posts(post);
        return await postModel.save();
     }

     async updatePost(post){  
        return await Posts.findOneAndUpdate(
                        { _id : post._id }, // findById
                        post,            // updated with body in request
                        {new:true, runValidators:true });    // return new updated data
     }

     async deletePost(postId){
        var result = await Posts.deleteOne( { _id : postId });
        if( !result )
            return new Error("Post could not be deleted!");
     }
}

module.exports = new PostService();