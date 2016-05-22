var EventModel = require('../models/event');
var Controller = function() {};

Controller.prototype.getEvents = function(req, res) {
  EventModel.find(function(err, data){
    if (err) {
      return res.status(400).json(err);
    } else {
      return res.status(200).json(data);
    }
  });
};

module.exports = new Controller();
