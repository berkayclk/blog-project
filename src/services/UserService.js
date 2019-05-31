var Users = require("../models/User");
var UserUtil = require("../utility/UserUtil");
const CryptoUtil = require("../utility/CryptoUtil");

class UserService{

    async getAllUser(){
        return await Users.find();
    }

    async findById(userId){
        
        var user = await Users.findById(userId);
        return user;
    }

    async findByUsernamePassword(Username,Password) {

        var user = await Users.findOne({ Username });
        var encryptedPass = user.Password;
        var isMatch = await CryptoUtil.compare(encryptedPass,Password);

        if( !isMatch )
            throw new Error("Password is incorrect!");
        
        return user;  
        
     }

    async createUser(user){
        var user = UserUtil.pickNonSensitiveObject(user);
        var userModel = new Users(user);
        return await userModel.save();
     }

     async updateUser(user){    
        
        var user = await Users.findOneAndUpdate(
                        { _id : user._id }, // findById
                        user,            // updated with body in request
                        {new:true, runValidators:true }); // return new updated data
            
        return user;
     }

     async deleteUser(userId){           
        await Users.deleteOne( { _id : userId }); // findById
     }

     async followUser( followerId, followingId ){
        
        if( followerId == followingId )
            new Error("Follower and following is same!");
        
        var followerUser = await this.findById(followerId); //find follower by Id
        var followingUser = await this.findById(followingId); //find following by Id
        await this.createRelation(followerUser, followingUser); //create realtion between follower and following.          

    }
 
    async unfollowUser( followerId, followingId ){
        if( followerId == followingId )
            new Error("Follower and following is same!");
    
        var followerUser = await this.findById(followerId); //find follower by Id
        var followingUser = await this.findById(followingId); //find following by Id
        await this.dropRelation(followerUser, followingUser); //create realtion between follower and following.          

    }

     async createRelation( followerUser,followingUser){

        if( !followerUser || !followingUser )
            return new Error("Create relation process is failed.");

        var updateOperations = [];
        updateOperations.push(  //Push following user to follower user as unique
            {   updateOne : {
                    filter : { _id : followerUser._id, "Following.id" : { $ne :followingUser._id} },
                    update : { $push : { Following:{ id: followingUser._id} } }
                } 
            }
        );
        updateOperations.push( 
            {   updateOne : { //Push follower user to following user as unique
                    filter : { _id : followingUser._id , "Follower.id" : { $ne :followerUser._id}},
                    update : { $push : { Follower:{ id: followerUser._id} } }
                } 
            }
        );

       var result = await Users.bulkWrite(updateOperations);
       if( !result )
            return new Error("Create relation error!")
    }

    async dropRelation( followerUser,followingUser){
           
        if( !followerUser || !followingUser )
            return new Error("Drop relation process is failed.");

        var updateOperations = [];
        updateOperations.push(  //pull following user to follower user as unique
            {   updateOne : {
                    filter : { _id : followerUser._id },
                    update : { $pull : { Following:{ id: followingUser._id} } }
                } 
            }
        );
        updateOperations.push( 
            {   updateOne : { //pull follower user to following user as unique
                    filter : { _id : followingUser._id },
                    update : { $pull : { Follower:{ id: followerUser._id} } }
                } 
            }
        );

        var result = await Users.bulkWrite(updateOperations);
        if( !result )
            return new Error("Relation dropping error!");
   }
   
   async suggestUser(User){

        var Followings = User.Following.map( followingUser => followingUser.id);
        var users = await Users.find({
            $and:[
                { _id: { $ne: User._id } },
                { _id: { $nin: Followings } }
            ]
        });
        
        users = users.map( user => UserUtil.pickPublicVisibleFields(user) );

        return users;
   }
   
}

module.exports = new UserService();