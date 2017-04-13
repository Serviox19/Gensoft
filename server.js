const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const logger = require('morgan');
const bodyParser = require('body-parser');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static("public"));
app.use("/public", express.static(__dirname + "/public"));

//Passport
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(session({
  secret: 'super secret',
    saveUninitialized: true,
    resave: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

var routes = require('./config/index');
app.use('/', routes);

app.listen(PORT, function () {
  console.log('Listening on PORT: ' + PORT);
});
