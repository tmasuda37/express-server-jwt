// ### package.json modules
var _ = require('lodash');
var express = require('express');
var expressJwt = require('express-jwt');
var jsonWebToken = require('jsonwebtoken');
var mongoose = require('mongoose');

// ### local modules
var jwtKey = require('./config/key');
var User = require('./models/User');

var jwtCheck = expressJwt({
  secret: jwtKey.secret
});

var createToken = function (user) {
  return jsonWebToken.sign(_.omit(user, 'password'), jwtKey.secret, { expiresIn: 1200 });
}

var AuthCtrl = function (app) {
  app.use('/auth', jwtCheck);

  app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json('Token is invalid. Please login again.');
    }
  });

  app.get('/auth/decoder', function(req, res, next) {
    var auth = req.headers.authorization;
    var credential = auth.split(' ');

    var token = '';
    if (credential.length > 1) {
      token = credential[1];
    }

    var decoded = jsonWebToken.decode(token, {complete: true});
    console.log(decoded);
    res.status(200).json(decoded.payload._id);
  });

  app.get('/login', function (req, res, next) {
    User.findOne({'username': req.query.name}, function(err, user) {
      if (err) throw err;

      if (!user) {
        res.json({ success: false, message: 'Authentication failed. User not found.' });

      } else if (user) {
        if (user.password != req.body.password) {
          res.json({ success: false, message: 'Authentication failed. Wrong password.' });

        } else {
          // if user is found and password is right
          // create a token
          var token = createToken(user);

          // return the information including token as JSON
          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
          });
        }
      }
    });
  });
}

module.exports = AuthCtrl;
