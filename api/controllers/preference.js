var mongoose = require('mongoose');

var Controller = function() {};

Controller.prototype.getPreference = function(req, res) {
    res.send('Hello World!');
};

module.exports = new Controller();
