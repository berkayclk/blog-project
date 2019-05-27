var Users = require("../models/User");
var UserUtil = require("../utility/UserUtil");
const CryptoUtil = require("../utility/CryptoUtil");

class UserService{

    getAllUser(){
        return new Promise((resolve,reject) =>{
           
            Users.find( (err,res) =>{
                if( err )
                    reject(err);
                
                resolve(res);
            });
       });
    }

    findById(userId){
       return new Promise((resolve,reject) =>{
            
            Users.findById(userId, (err,res) =>{
                if( err )
                    reject(err);
                
                resolve(res);
            });
       });
    }

    findByUsernamePassword(Username,Password){
        return new Promise((resolve,reject) =>{
             
             Users.findOne({ Username }, (err,userResult) =>{
                if( err )
                    reject("Username is wrong!");
                
                var encryptedPass = userResult.Password;
                
                CryptoUtil.compare(encryptedPass,Password)
                                    .then( res => { resolve(userResult);})
                                    .catch( err => reject("Wrong password!"))
             });
        });
     }

     findByToken(userId, token){
        return new Promise((resolve,reject) =>{
             
             Users.findOne({ 
                 _id : userId,
                 "AuthTokens.token":token
              }, (err,userResult) =>{
                if( err )
                    reject("Token is not found!");

                resolve(userResult);
             });
        });
     }

    createUser(user){
        var user = UserUtil.pickNonSensitiveObject(user);
        var userModel = new Users(user);
        return userModel.save();
     }

     saveAuthToken(user, AuthToken){
        return new Promise( (resolve, reject) => {
            Users.updateOne(
                {  _id: user._id},
                { $push : { AuthTokens: { token: AuthToken.token, expireDate: AuthToken.expireDate } } },
                { new:true, runValidators:true },
                (err, res) =>{
                    if(err) reject(err);
                    resolve(res);        
                }
            );
        });
     }

     removeAuthToken(user, AuthToken){
        return new Promise( (resolve, reject )=>{
            Users.updateOne(
                { _id : user._id  },
                { $pull : { AuthTokens :{  token: AuthToken.token  } } },
                { new:true, runValidators:true },
                (err, res) =>{
                    if(err) reject(err);
                    resolve(res);        
                }
            );
        });
     }

     updateUser(user){
        return new Promise((resolve,reject) =>{
            
            Users.findOneAndUpdate(
                        { _id : user._id }, // findById
                        user,            // updated with body in request
                        {new:true, runValidators:true },     // return new updated data
                        (err,res)=>{
                            if(err) reject(err);
                            resolve(res);
                        });
        });
     }

     deleteUser(userId){
        return new Promise((resolve,reject) =>{
           
            Users.deleteOne( 
                    { _id : userId }, // findById
                    (err)=>{
                        if(err) reject(err);
                        resolve("User deleted");
                    });
        });
     }

     followUser( followerId, followingId ){
       return new Promise( (resolve,reject) =>{
 
            var followerUser, followingUser;
            this.findById(followerId) //find follower by Id
                        .then(followerRes => {
                            followerUser = followerRes;
                            return this.findById(followingId); //find following by Id
                        })
                        .then( followingRes =>{
                            followingUser = followingRes;
                            return this.createRelation(followerUser, followingUser); //create realtion between follower and following.
                        })
                        .then( res=> {
                            resolve(res);
                        })
                        .catch(err => {
                            reject(err);
                        });
                       
       });
    }
 
    unfollowUser( followerId, followingId ){
       
        return new Promise( (resolve,reject) =>{
            
            var followerUser, followingUser;
            this.findById(followerId) //find follower by Id
                        .then(followerRes => {
                            followerUser = followerRes;
                            return this.findById(followingId); //find following by Id
                        })
                        .then( followingRes =>{
                            followingUser = followingRes;
                            return this.dropRelation(followerUser, followingUser); //drop realtion between follower and following.
                        })
                        .then( res=> {
                            resolve(res);
                        })
                        .catch(err => {
                            reject(err);
                        });
       });
    }

     createRelation( followerUser,followingUser){
        return new Promise( (resolve,reject)=>{
           
           if( !followerUser || !followingUser )
               reject("Create relation process is failed.");

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

           Users.bulkWrite(updateOperations,(bulkErr,bulkRes)=>{
               if( bulkErr || bulkRes.writeErrors )
                   reject(bulkErr || bulkRes.writeErrors);

               resolve();
           });
        });
    }

    dropRelation( followerUser,followingUser){
       return new Promise( (resolve,reject)=>{
           
           if( !followerUser || !followingUser )
               reject("Drop relation process is failed.");

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

           Users.bulkWrite(updateOperations,(bulkErr,bulkRes)=>{
               if( bulkErr || bulkRes.writeErrors )
                   reject(bulkErr || bulkRes.writeErrors);

               resolve(bulkRes);
           });
       });
   }
   
   
}

module.exports = new UserService();