const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const logger = require('morgan');
const db = require('./config/db');
const mongoose = require('mongoose');
const Company = require('./models/company');

app.use(logger('dev'));

app.use(express.static(__dirname + "/public"));
app.use('/public', express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/public/views"));
app.use('/bower_components', express.static(__dirname + "/bower_components"));


app.get('/', function(req, res, next) {
  res.send('/public/views/index.html');
});

// Products
app.get('/companies', function(req, res, next){
  mongoose.model('Company').find(function(err, docs) {
    if (!err) {
      res.send(docs);
    } else {
      console.log(err);
    }
  });
});

app.post('/newShipment', function(req, res){

});


app.listen(PORT, function () {
  console.log('Listening on PORT: ' + PORT);
});
