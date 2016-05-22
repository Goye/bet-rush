var controllers = require('../controllers');

exports.init = function(app, auth) {
    app.get('/preferences', controllers.Preference.getPreference);
};