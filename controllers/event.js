var EventModel = require('../models/event');
var BetModel = require('../models/bet');
var EventModel = require('../models/event');
var NotificationModel = require('../models/notification');
var mongoose = require('mongoose');
var Controller = function() {};

Controller.prototype.getEvents = function(req, res) {
  var date = Date.now();
  var data = [];
  var countObj = {
    win: 0,
    lose: 0
  };
  EventModel.find({
    // createdAt: {
    //   $gte: date - 15
    // },
     closed: false,
  }, function(err, data){
    if (err) {
      return res.status(400).json(err);
    } else {
      NotificationModel.find(function(err, not){
        if (not.length) {
          getBetCount('', function(key, length, result){
            if (key == (length-1)) {
              return res.status(200).json({
                data: data,
                count: result
              });
            }
          });
        }else {
          return res.status(200).json({
            data: data,
            count: countObj
          });
        }
      });
    }
  });
};

Controller.prototype.saveBet = function(req, res){
  var data = req.body;
  var bet = new BetModel({
    value: data.value,
    event: new mongoose.mongo.ObjectID(data.eventId),
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

function getBetCount(uid, callback){
  var winCount = 0;
  var loseCount = 0;
  var result = {};
  NotificationModel.find(function(err, not){
    if (!err) {
      not.forEach(function(val, key){
        BetModel.findOne({
          event: val.eventId
        })
        .exec(function(err, data){
          if (data) { 
              EventModel.findOne(data.event, function(err, event){
                if (data.option == event.results[0]) {
                  winCount ++;
                } else {
                  loseCount ++;
                }
                result = {
                  win: winCount,
                  lose: loseCount
                };
                callback(key, not.length, result);
                });
            } else {
                callback(key, not.length, result);
            }
        });
      });
    }
  });
}

module.exports = new Controller();
