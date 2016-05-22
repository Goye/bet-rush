var controllers = require('../controllers');

exports.init = function(app) {
    app.get('/api/get/events', controllers.Event.getEvents);
};