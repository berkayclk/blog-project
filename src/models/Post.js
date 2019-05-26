const mongodb = require('../database/mongodb');

var postSchema = mongodb.Schema({
    Header:{type:String,require:true,trim:true},
    Body:{type:String,require:true,trim:true},
    Author:{type:mongodb.Schema.Types.ObjectId, require:true},
    Location:{type:String, trim:true},
    CreateDate:{type:Date,default:Date.now}
});

const Post = mongodb.model('Post', postSchema);

module.exports = Post;