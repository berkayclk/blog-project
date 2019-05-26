const mongodb = require('../database/mongodb');
var validator = require("validator");

const AuthUtil = require('../utility/AuthUtil');
const ApplicationConstants = require('../constants/ApplicationConstants');
const UserUtil = require('../utility/UserUtil');


var userSchema = mongodb.Schema({

    Fullname:{type:String,required:true,trim:true},
    Username:{type:String,required:true,trim:true,unique:true},
    Password:{type:String,required:true,trim:true,minLength:8},
    Contact:{
        Phone:{
            type:String,
            trim:true,
            validate: (value) => {
                return validator.isMobilePhone(value,ApplicationConstants.LOCALE);
            }
        },
        Email:{
            type:String,
            trim:true,
            required:true, 
            validate: (value) => {
                return validator.isEmail(value);
            }
        }
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


userSchema.set('toJSON', {
    transform: function(doc, ret, opt) {
        
        UserUtil.SENSITIVE_USER_FIELDS.forEach( field => {
            delete ret[field];
        })
        return ret;
    }
});

const User = mongodb.model('User', userSchema);

module.exports = User;