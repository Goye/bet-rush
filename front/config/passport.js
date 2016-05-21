var passport = require('passport');
var jwt = require('jsonwebtoken');
var LocalStrategy = require('passport-local').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var ldapAuth = require('../libs/ldapAuth').auth;
var TokenModel = require('../models/token');
var UserModel = require('../models/user');
var appConf = require('../config/appConf').variables.app;
var crypto  = require('crypto');

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(obj, done) {
	 done(null, obj);
});

/**
 * LocalStrategy
 *
 * This strategy is used to authenticate users based on a username and password.
 * Anytime a request is made to authorize an application, we must ensure that
 * a user is logged in before asking them to approve the request.
 */
 passport.use('login', new LocalStrategy({
	passReqToCallback : true
	},
	function(req, username, password, done) { 
		// check user using LDAP service
		// ldapAuth(username, password, function(err){
			
		// });
		var cipher = crypto.createCipher('aes192', password);
		var pass = cipher.final('hex');

		UserModel.findOne({
			username: username,
			password: pass,
			isAdmin: true
		},function (err, res){
			if (err || !res) {
				return done(null, false, {
					'message':'There was an error with your E-mail/Password combination. Please try again.'
				});
			} else {

				var token = jwt.sign({user: username}, appConf.clientSecret, {
					expiresIn: "3 days"
				});

				var newAccess = new TokenModel({ 
					username: username, 
					accessToken: token
				});

				newAccess.save(function(err) {
					if (err) return done(null, false, err);
					console.log('Token saved successfully');
					return done(null, newAccess);
				});
			}
		});
}));

 // Configure the Bearer strategy for use by Passport.
//
// The Bearer strategy requires a `verify` function which receives the
// credentials (`token`) contained in the request.  The function must invoke
// `cb` with a user object, which will be set at `req.user` in route handlers
// after authentication.
passport.use(new BearerStrategy(
	function(token, cb) {
	TokenModel.findOne({ accessToken: token }, function(err, token) {
		if (err) { return cb(err); }
		if (!token) { return cb(null, false); }
		jwt.verify(token.accessToken, appConf.clientSecret, function(err, decoded) {
			if (err) { return cb(null, false, { 
					success: false, message: 'Failed to authenticate token.' 
				}); 
			}
			return cb(null, token.accessToken);
		});
	});
}));