const ApplicationConstants = require("../../constants/ApplicationConstants");
var LogUtil = require("../../utility/LogUtil");
var swagger = require("./swagger.json");

const PORT = ApplicationConstants.PORT != ApplicationConstants.DEFAULT_PORT && !ApplicationConstants.HEROKU_FLAG ?
                                                                            `:${ApplicationConstants.PORT}` : "";

swagger.host = ApplicationConstants.HOST + PORT;
swagger.base = ApplicationConstants.BASE_PATH;

LogUtil.LogInfo("Swagger Host: " + swagger.host + " - Base Path: "+ swagger.base);

module.exports = Object.freeze(swagger);