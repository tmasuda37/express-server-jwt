// ### package.json modules
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');

// ### local modules
var configLoader = require('./package/env/config-loader');

// create express server
var app = express();

// loading environment configuration (ip address, port, and db url)
var env = configLoader();

// support support json request
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// support method overrides
app.use(methodOverride('X-HTTP-Method-Override'));

// support CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// loading controllers
require('./package/auth/auth_ctrl')(app);

// connect to mongoDB
mongoose.connect(env.mongoDbUrl);
mongoose.connection.once('open', function () {

  app.listen(env.serverPort, env.serverAddress);
  console.log('Successfully running on ' + env.serverAddress + ':' + env.serverPort)

});
