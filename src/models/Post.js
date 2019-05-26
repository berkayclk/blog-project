const mongodb = require('../database/mongodb');

const PostStatus = require("../constants/PostConstants").PostStaus;

var postSchema = mongodb.Schema({
    Header:{type:String,require:true,trim:true},
    Body:{type:String,require:true,trim:true},
    Author:{type:mongodb.Schema.Types.ObjectId, require:true},
    Location:{type:String, trim:true},
    Status:{type:String, enum:[PostStatus.PUBLIC,PostStatus.PRIVATE], default:PostStatus.PUBLIC},
    CreateDate:{type:Date,default:Date.now}
});

const Post = mongodb.model('Post', postSchema);

module.exports = Post;