var EventModel = require('../models/event');
var BetModel = require('../models/bet');
var EventModel = require('../models/event');
var mongoose = require('mongoose');
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

Controller.prototype.saveBet = function(req, res){
  var data = req.body;
  var bet = new BetModel({
    value: data.value,
    events: [new mongoose.mongo.ObjectID(data.eventId)],
    option: data.option,
    updateAt: Date.now()
  });
  bet.save(function(err){
    if (err) {
      return res.status(400).json(err);
    } else {
      return res.status(200).json({message: "success"});
    }
  });
};

Controller.prototype.newEvent = function(req, res){
  var data = req.body;
  var options = ['Yes', 'No'];
  var cant = 10;
  var event = new EventModel({
    category: [data.category],
    name: data.name,
    options: options,
    cant: cant,
    updateAt: Date.now()
  });
  event.save(function(err){
    if (err) {
      return res.status(400).json(err);
    } else {
      return res.status(200).json({message: "success"});
    }
  });
};

module.exports = new Controller();
