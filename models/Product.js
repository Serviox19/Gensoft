var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
  name : {
    type: String,
  },
  sku : {
    type: Number,
  },
  count : {
    name: Number,
  }
});

var Product = mongoose.model('Product', productSchema);
module.exports = Product;
