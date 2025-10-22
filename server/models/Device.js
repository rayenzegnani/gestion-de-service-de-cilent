const mongoose = require('mongoose');

const DeviceSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  type: { type: String, required: true },
  brand: { type: String },
  model: { type: String },
  serial: { type: String },
  notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Device', DeviceSchema);
