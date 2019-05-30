require("dotenv/config");//load config in .env file 
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');

var passport = require("passport");
var passportConf = require("./config/passport");
var passportJwt = passport.authenticate('jwt',{session:false});

var LogUtil = require("./utility/LogUtil");
var ApplicationConstants = require("./constants/ApplicationConstants");

//Swagger 
var swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger');

//Controllers
var UserController = require("./api/UserController");
var AuthController = require("./api/AuthController");
var PostController = require("./api/PostController");

var app = express();

//apply middleware process
app.use(logger(ApplicationConstants.MORGAN_LOG_PATTERN));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set(ApplicationConstants.PORT_KEY, ApplicationConstants.PORT);

//Api Documantations
app.use(`${ApplicationConstants.BASE_PATH}/doc`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Api Routes
app.use(`${ApplicationConstants.BASE_PATH}/user`,passportJwt, UserController);
app.use(`${ApplicationConstants.BASE_PATH}/auth`, AuthController);
app.use(`${ApplicationConstants.BASE_PATH}/post`, passportJwt ,passport.authenticate('jwt',{session:false}), PostController);

//start listening port
app.listen(app.get(ApplicationConstants.PORT_KEY),() => {
    LogUtil.LogInfo(`Server start listening on ${app.get(ApplicationConstants.PORT_KEY)}`);
});