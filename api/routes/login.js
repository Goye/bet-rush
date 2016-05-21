var controllers = require('../controllers');
var passport = require('passport');
exports.init = function(app) {
    app.get('/auth/facebook', passport.authenticate('facebook'));
    app.get('/auth/facebook/callback', controllers.Login.facebookCallback);
};