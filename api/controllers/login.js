var mongoose = require('mongoose');
var passport = require('passport');
var Controller = function() {};

Controller.prototype.facebookCallback = function(req, res) {
  passport.authenticate('facebook', function(err, user, info){
    if (info && !user) {
      return res.status(400).json(info);
    } else {
      return res.status(200).json(user);
    }
  })(req, res);
};

module.exports = new Controller();
