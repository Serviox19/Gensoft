const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const logger = require('morgan');
const db = require('./config/db');
const Product = require('./models/Product');

app.use(logger('dev'));

app.use(express.static(__dirname + "/public"));
app.use('/public', express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/public/partials"));


app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/public/index.html');
});

// Products
app.get('/products', function(req, res){
  Product.find(function(err, docs){
    if (err){
      console.log(err);
      res.send(err);
    } else {
      res.send(docs);
    }
  });
});

app.post('/newproduct', function(req, res){
  var newProduct = new Product(req.body);
  newProduct.save(function(err, doc){
    if (err){
      console.log(err);
      res.send(err);
    } else {
      console.log(doc);
      res.send(doc);
    }
  });
});


app.listen(PORT, function () {
  console.log('Listening on PORT: ' + PORT);
});
