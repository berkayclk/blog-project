var MongodbConstants = require("../constants/MongodbConstants");
var LogUtil = require("../utility/LogUtil");

var mongodb = require('mongoose');
mongodb.Promise = global.Promise;

LogUtil.LogInfo(`Mongodb URI : ${MongodbConstants.MONGODB_URI}`);
if( !MongodbConstants.MONGODB_URI || MongodbConstants.MONGODB_URI === ""){
    LogUtil.LogError(`Mongodb URI is wrong. ${MongodbConstants.CONNECTION_ERR_MESSAGE}`);
    process.exit();
}

mongodb.connect(MongodbConstants.MONGODB_URI,{useNewUrlParser: true},(err)=>{
    if(err){
        LogUtil.LogError(MongodbConstants.CONNECTION_ERR_MESSAGE);
        process.exit(-1);
    }

    LogUtil.LogInfo(MongodbConstants.CONNECTION_SUCCESS_MESSAGE);
});

module.exports = mongodb;