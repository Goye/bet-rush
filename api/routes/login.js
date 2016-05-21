var controllers = require('../controllers');
exports.init = function(app, auth) {
    app.get('/', controllers.Login.doLogin);
};