var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var appConf = require('./appConfig').variables.app;

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(obj, done) {
	 done(null, obj);
});

passport.use(new FacebookStrategy({
    clientID: appConf.FACEBOOK_APP_ID,
    clientSecret: appConf.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:8080/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'email']
  },
  function(accessToken, refreshToken, profile, cb) {
    // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
    return cb(null, { facebookId: profile.id });
  }
));