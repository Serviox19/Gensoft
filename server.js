const http = require('http');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const logger = require('morgan');
const bodyParser = require('body-parser');

var db = require('./config/db');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static("public"));
app.use("/public", express.static(__dirname + "/public"));

//routes
var routes = require('./config/index');
app.use('/', routes);


server.listen(PORT, function () {
  console.log('Listening on PORT: ' + PORT);
});
