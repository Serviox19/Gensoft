const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const logger = require('morgan');
const bodyParser = require('body-parser');

app.use(logger('dev'));

//Passport
var passport = require('passport');
require('./config/passport')(passport); // pass passport for configuration

//Cookie and session
var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(session({
  secret: 'super secret'
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static("public"));
app.use("/public", express.static(__dirname + "/public"));

require('./config/auth.js')(app, passport);

app.listen(PORT, function () {
  console.log('Listening on PORT: ' + PORT);
});
