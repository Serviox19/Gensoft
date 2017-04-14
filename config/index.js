const express = require('express');
const passport = require('./passport');
const router = express.Router();
const db = require('../models/db');

// process the login form
router.post('/login', passport.authenticate('local-login'), function(req, res) {
  res.json(req.user);
});

// handle logout
router.post('/logout', function(req, res) {
  req.logOut();
  res.send(200);
})

// loggedin
router.get('/loggedin', function(req, res) {
  res.send(req.isAuthenticated() ? req.user : '0');
});

// signup
router.post('/signup', function(req, res) {
  db.User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (user) {
      res.json(null);
      return;
    } else {
      var newUser = new db.User();
      newUser.username = req.body.username.toLowerCase();
      newUser.password = newUser.generateHash(req.body.password);
      newUser.save(function(err, user) {
        req.login(user, function(err) {
          if (err) {
            return next(err);
          }
          res.json(user);
        });
      });
    }
  });
});

module.exports = router;
