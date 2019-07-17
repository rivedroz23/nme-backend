const mongoose = require('mongoose');

const toppingSchema = new mongoose.Schema({
    topping: String
  });
  
  
module.exports = mongoose.model('Topping', toppingSchema);