var controllers = require('../controllers');
var passport = require('passport');
var passportConfig = require('../config/passport');
exports.init = function(app, auth) {
    app.get('/auth/facebook', passport.authenticate('facebook'));
    app.get('/auth/facebook/callback', controllers.Login.facebookCallback);
};