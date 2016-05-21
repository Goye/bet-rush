var mongoose = require('mongoose');

var Controller = function() {};

Controller.prototype.doLogin = function(req, res) {
  res.json({ title: 'Express' });
};

module.exports = new Controller();
