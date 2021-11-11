const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const packageSchema = new Schema({
    name: { type: String, required: true, unique: true },
    details: { type: Array, default: [], required: true },
    caption: { type: String, required: true },
    source: { type: String, required: true }
  }, {
    minimize: false,
    timestamps: true,
  });
  
  const Package = mongoose.model('Package', packageSchema);
  
  module.exports = Package;