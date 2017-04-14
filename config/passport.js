const LocalStrategy   = require('passport-local').Strategy;
const User = require('../models/user');

module.exports = (function (passport) {
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  passport.use('local-login', new LocalStrategy(
    function(username, password, done) {
      User.findOne({
        username: username.toLowerCase()
      }, function(err, user) {
          // if there are any errors, return the error before anything else
         if (err) {
          return done(err);
          console.log(err);
        } else if (!user) {
          // if no user is found, return the message
          return done(null, false);
        } else if (!user.validPassword(password)) {
          // if the user is found but the password is wrong
          return done(null, false);
        } else {
          // all is well, return successful user
          return done(null, user);
        }
      });
    }
  ));
});
