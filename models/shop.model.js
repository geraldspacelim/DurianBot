const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const shopSchema = new Schema({
    name: { type: String, required: true, unique: true },
    promos: { type: Array, required: true },
    products: { type: Array, required: true },
    deliveryOptions: { type: Array, required: true }
  }, {
    minimize: false,
    timestamps: true,
  });
  
  const Package = mongoose.model('Shop', shopSchema);
  
  module.exports = Package;