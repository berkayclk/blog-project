let MongodbConstants = {
    MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/blog",
    CONNECTION_ERR_MESSAGE: "MongoDB could not be connected! Application is stoping...",
    CONNECTION_SUCCESS_MESSAGE: "MongoDB connected"
};

module.exports = Object.freeze(MongodbConstants);