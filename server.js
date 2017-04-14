const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const logger = require('morgan');
const db = require('./models/db');

app.use(logger('dev'));

app.use(express.static(__dirname + "/public"));
app.use('/public', express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/public/partials"));

//Passport
var passport = require('passport');
require('./config/passport')(passport); // pass passport for configuration

//Cookie and session
var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(session({
  secret: 'this is the secret'
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

//Body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.json()); //for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/public/index.html');
});

// Auth Routes

//handle login
app.post('/login', passport.authenticate('local-login'), function(req, res) {
  res.json(req.user);
});

// handle logout
app.post('/logout', function(req, res) {
  req.logOut();
  res.send(200);
})

// check loggedin
app.get('/loggedin', function(req, res) {
  res.send(req.isAuthenticated() ? req.user : '0');
});

// signup
app.post('/signup', function(req, res) {
  db.User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (user) {
      console.log("already exists");
      res.json(null);
      return;
    } else {
      var newUser = new db.User();
      newUser.username = req.body.username.toLowerCase();
      newUser.password = newUser.generateHash(req.body.password);
      newUser.save(function(err, user) {
        req.login(user, function(err) {
          if (err) {
            console.log(err);
            return next(err);
          }
          res.json(user);
          res.send(200);
        });
      });
    }
  });
});


app.listen(PORT, function () {
  console.log('Listening on PORT: ' + PORT);
});
