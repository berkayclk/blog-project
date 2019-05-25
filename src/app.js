require("dotenv/config");//load config in .env file 
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');

var ApplicationConstants = require("./constants/ApplicationConstants");

var app = express();

//apply middleware process
app.use(logger(ApplicationConstants.MORGAN_LOG_PATTERN));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set(ApplicationConstants.PORT_KEY, ApplicationConstants.DEFAULT_PORT);

//start listening port
app.listen(app.get(ApplicationConstants.PORT_KEY),() => {
    console.log(`Server start listening on ${app.get(ApplicationConstants.PORT_KEY)}`);
});