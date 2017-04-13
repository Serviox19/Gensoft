var mongoose = require('mongoose');

if (process.env.PORT) {
  // use hosted db
} else {
  mongoose.connect('mongodb://localhost:27017/inventory-management');
}

var db = mongoose.connection;
db.on('error', function (err) {
  console.log('Mongoose Error: ', err);
});

db.once('open', function() {
  console.log('Mongoose Connection Successful');
});

module.exports = db;
