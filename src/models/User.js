const mongodb = require('../database/mongodb');
const AuthUtil = require('../utility/AuthUtil');
var validator = require("validator");

var userSchema = mongodb.Schema({

    Fullname:{type:String,required:true,trim:true},
    Username:{type:String,required:true,trim:true,unique:true},
    Password:{type:String,required:true,trim:true,minLength:8},
    Contact:{
        Phone:{type:String,trim:true},
        Email:{
            type:String,
            trim:true,
            required:true, 
            validate: (value) => {
                return validator.isEmail(value)
            }}
    },
    CreateDate:{type:Date,default:Date.now},
    Follower:[{
        id: mongodb.Schema.Types.ObjectId
    }],
    Following:[{
        id: mongodb.Schema.Types.ObjectId
    }],
    AuthTokens:[{
        expireDate:{type:Date,required:true, default: AuthUtil.getExpireDate},
        token:{type:String,required:true}
    }]
});

const User = mongodb.model('User', userSchema);

module.exports = User;