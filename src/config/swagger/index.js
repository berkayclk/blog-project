const ApplicationConstants = require("../../constants/ApplicationConstants");
var swagger = require("./swagger.json");

const PORT = ApplicationConstants.PORT != ApplicationConstants.DEFAULT_PORT ?
                                                `:${ApplicationConstants.PORT}` : "";

swagger.host = ApplicationConstants.HOST + PORT;
swagger.base = ApplicationConstants.BASE_PATH;

module.exports = Object.freeze(swagger);