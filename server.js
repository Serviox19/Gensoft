const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const logger = require('morgan');

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
  res.sendFile(process.cwd() + '/index.html');
});

require('./config/index')(app, passport);


app.listen(PORT, function () {
  console.log('Listening on PORT: ' + PORT);
});
