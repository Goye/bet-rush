var controllers = require('../controllers');

exports.init = function(app) {
    app.get('/api/get/events', controllers.Event.getEvents);
    app.post('/api/save/bet', controllers.Event.saveBet);
};