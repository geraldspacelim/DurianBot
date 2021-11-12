const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const orderSchema = new Schema({
    name: { type: String, required: true},
    contact: {type: Number, required: true},
    address: {type: String, required: true}, 
    deliveryOption: {type: String, required: true}, 
    orders: {type: Array, required: true}, 
    amountPayable: {type: Number, requird: true},
    promoCode: {type: String, required: true},
    paymentRecieved: {type: Boolean, required: true, default: false}
  }, {
    minimize: false,
    timestamps: true,
  });
  
  const Order = mongoose.model('Order', orderSchema);
  
  module.exports = Order;