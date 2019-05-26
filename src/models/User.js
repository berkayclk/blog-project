const mongodb = require('../database/mongodb');
var validator = require("validator");

const AuthUtil = require('../utility/AuthUtil');
const ApplicationConstants = require('../constants/ApplicationConstants');
const CryptoUtil = require("../utility/CryptoUtil");
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

userSchema.pre("save", function(next){
    var user = this;
    encryptPassword(user,next);
            
});
userSchema.pre("findOneAndUpdate", function(next){

    var user = this.getUpdate();
    encryptPassword(user,next);
});
userSchema.pre("updateOne", function(next){

    var user = this.getUpdate();
    encryptPassword(user,next);
});
userSchema.pre("updateMany", function(next){

    var user = this.getUpdate();
    encryptPassword(user,next);
});

function encryptPassword(user,next){
    
    if(!user.Password || ( user.isModified && !user.isModified("Password") ) )
        return next();

    CryptoUtil.encrypt(user.Password)
                    .then(encrypted =>{
                        user.Password = encrypted;
                        next();
                    })
                    .catch(err=>{next();});
        
}

const User = mongodb.model('User', userSchema);

module.exports = User;