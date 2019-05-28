require("dotenv/config");//load config in .env file 
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var LogUtil = require("./utility/LogUtil");

var ApplicationConstants = require("./constants/ApplicationConstants");

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

//Api Routes
app.use(`${ApplicationConstants.BASE_PATH}/user`, UserController);
app.use(`${ApplicationConstants.BASE_PATH}/auth`, AuthController);
app.use(`${ApplicationConstants.BASE_PATH}/post`, PostController);

//start listening port
app.listen(app.get(ApplicationConstants.PORT_KEY),() => {
    LogUtil.LogInfo(`Server start listening on ${app.get(ApplicationConstants.PORT_KEY)}`);
});