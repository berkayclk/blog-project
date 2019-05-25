var MongodbConstants = require("../constants/MongodbConstants");

var mongodb = require('mongoose');
mongodb.Promise = global.Promise;

console.log(`Mongodb URI : ${MongodbConstants.MONGODB_URI}`);
if( !MongodbConstants.MONGODB_URI || MongodbConstants.MONGODB_URI === ""){
    console.error(`Mongodb URI is wrong. ${MongodbConstants.CONNECTION_ERR_MESSAGE}`);
    process.exit();
}

mongodb.connect(MongodbConstants.MONGODB_URI,{useNewUrlParser: true},(err)=>{
    if(err){
        console.error(MongodbConstants.CONNECTION_ERR_MESSAGE);
        process.exit(-1);
    }

    console.log(MongodbConstants.CONNECTION_SUCCESS_MESSAGE);
});

module.exports = mongodb;