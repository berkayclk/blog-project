var Users = require("../models/User");
var UserUtil = require("../utility/UserUtil");


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
                console.log(err,res);
                if( err )
                    reject(err);
                
                resolve(res);
            });
       });
    }

    createUser(user){
        var userModel = new Users(user);
        return userModel.save();
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
}

module.exports = new UserService();