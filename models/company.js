const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
  name: String,
  shipments: [{
    date: {
      type: Date,
      default: Date.now
    },
    containerId: {
      type: String,
      required: true
    },
    refNum: {
      type: Number,
      required: true
    }
  }]
});

var Company = mongoose.model('Company', companySchema);
module.exports = Company;
